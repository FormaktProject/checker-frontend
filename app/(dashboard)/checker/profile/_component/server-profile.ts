"use server"

import { put, del } from '@vercel/blob'
import prisma from "@/lib/db"
import { revalidatePath } from 'next/cache'
import { getSession } from '@/auth'


// Type definitions
interface ProfileUpdateData {
  languages?: string[]
  coverageCountry?: string
  coverageCities?: string[]
  basePrice?: number
  professionalTitle?: string
  description?: string
}

interface UploadAvatarResult {
  success: boolean
  url?: string
  error?: string
}

interface ProfileUpdateResult {
  success: boolean
  completionPercentage?: number
  error?: string
}

/**
 * Upload avatar to Vercel Blob storage
 */
export async function uploadCheckerAvatar(
  formData: FormData
): Promise<UploadAvatarResult> {
  try {
    const session = await getSession()
    
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    const file = formData.get('avatar') as File
    
    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { success: false, error: "File must be an image" }
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "File size must be less than 5MB" }
    }

    // Get current user to check for existing avatar
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { avatar: true }
    })

    // Delete old avatar if exists
    if (user?.avatar) {
      try {
        await del(user.avatar)
      } catch (error) {
        console.error("Failed to delete old avatar:", error)
        // Continue anyway
      }
    }

    // Upload to Vercel Blob
    const blob = await put(`avatars/${session.user.id}-${Date.now()}.${file.name.split('.').pop()}`, file, {
      access: 'public',
      addRandomSuffix: true,
    })

    // Update user avatar in database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { avatar: blob.url }
    })

    revalidatePath('/dashboard/checker/profile')
    
    return { success: true, url: blob.url }
  } catch (error) {
    console.error("Avatar upload error:", error)
    return { success: false, error: "Failed to upload avatar" }
  }
}

/**
 * Calculate profile completion percentage
 */
function calculateProfileCompletion(user: any, checkerProfile: any): number {
  let percentage = 15 // Base for registration
  
  if (user.avatar) percentage += 15
  if (user.languages && user.languages.length > 0) percentage += 15
  if (checkerProfile.businessCountry) percentage += 15
  if (checkerProfile.coverageAreas && checkerProfile.coverageAreas.length > 0) percentage += 15
  if (checkerProfile.basePrice > 0) percentage += 15
  if (checkerProfile.professionalTitle) percentage += 5
  if (checkerProfile.description) percentage += 5
  
  return Math.min(percentage, 100)
}

/**
 * Update checker profile data
 */
export async function updateCheckerProfile(
  data: ProfileUpdateData
): Promise<ProfileUpdateResult> {
  try {
    const session = await getSession()
    
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Verify user is a checker
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { checkerProfile: true }
    })

    if (!user || user.role !== 'CHECKER') {
      return { success: false, error: "User is not a checker" }
    }

    if (!user.checkerProfile) {
      return { success: false, error: "Checker profile not found" }
    }

    // Update user languages if provided
    if (data.languages !== undefined) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { languages: data.languages }
      })
    }

    // Update checker profile
    const updateData: any = {}
    
    if (data.coverageCountry !== undefined) {
      updateData.businessCountry = data.coverageCountry
    }
    
    if (data.coverageCities !== undefined) {
      updateData.coverageAreas = data.coverageCities
    }
    
    if (data.basePrice !== undefined) {
      updateData.basePrice = data.basePrice
    }
    
    if (data.professionalTitle !== undefined) {
      updateData.professionalTitle = data.professionalTitle
    }
    
    if (data.description !== undefined) {
      updateData.description = data.description
    }

    await prisma.checkerProfile.update({
      where: { id: user.checkerProfile.id },
      data: updateData
    })

    // Recalculate completion percentage
    const updatedUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { checkerProfile: true }
    })

    const completionPercentage = calculateProfileCompletion(
      updatedUser,
      updatedUser!.checkerProfile
    )

    // Update checker profile status if 100% complete
    if (completionPercentage === 100 && user.checkerProfile.status === 'PENDING') {
      await prisma.checkerProfile.update({
        where: { id: user.checkerProfile.id },
        data: { 
          status: 'APPROVED', // Auto-approve when profile is complete
          verifiedAt: new Date()
        }
      })
    }

    revalidatePath('/dashboard/checker/profile')
    
    return { 
      success: true, 
      completionPercentage 
    }
  } catch (error) {
    console.error("Profile update error:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

/**
 * Get checker profile completion status
 */
export async function getCheckerProfileCompletion(): Promise<{
  success: boolean
  data?: {
    user: any
    checkerProfile: any
    completionPercentage: number
    isComplete: boolean
  }
  error?: string
}> {
  try {
    const session = await getSession()
    
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { checkerProfile: true }
    })

    if (!user || user.role !== 'CHECKER') {
      return { success: false, error: "User is not a checker" }
    }

    if (!user.checkerProfile) {
      return { success: false, error: "Checker profile not found" }
    }

    const completionPercentage = calculateProfileCompletion(user, user.checkerProfile)

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          languages: user.languages
        },
        checkerProfile: {
          id: user.checkerProfile.id,
          professionalTitle: user.checkerProfile.professionalTitle,
          description: user.checkerProfile.description,
          basePrice: Number(user.checkerProfile.basePrice), // Convert Decimal to number
          businessCountry: user.checkerProfile.businessCountry,
          coverageAreas: user.checkerProfile.coverageAreas,
          status: user.checkerProfile.status
        },
        completionPercentage,
        isComplete: completionPercentage === 100
      }
    }
  } catch (error) {
    console.error("Get profile error:", error)
    return { success: false, error: "Failed to fetch profile" }
  }
}

/**
 * Delete checker avatar
 */
export async function deleteCheckerAvatar(): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getSession()
    
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { avatar: true }
    })

    if (user?.avatar) {
      try {
        await del(user.avatar)
      } catch (error) {
        console.error("Failed to delete avatar from blob:", error)
      }

      await prisma.user.update({
        where: { id: session.user.id },
        data: { avatar: null }
      })
    }

    revalidatePath('/dashboard/checker/profile')
    
    return { success: true }
  } catch (error) {
    console.error("Delete avatar error:", error)
    return { success: false, error: "Failed to delete avatar" }
  }
}