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
  // ✅ NEW: first selected city written to businessCity so the card can display it
  businessCity?: string
  basePrice?: number
  professionalTitle?: string
  description?: string
  specialties?: { category: string; subcategory?: string; level: string }[]
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

    if (!file.type.startsWith('image/')) {
      return { success: false, error: "File must be an image" }
    }

    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "File size must be less than 5MB" }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { avatar: true }
    })

    if (user?.avatar) {
      try {
        await del(user.avatar)
      } catch (error) {
        console.error("Failed to delete old avatar:", error)
      }
    }

    const blob = await put(`avatars/${session.user.id}-${Date.now()}.${file.name.split('.').pop()}`, file, {
      access: 'public',
      addRandomSuffix: true,
    })

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
function calculateProfileCompletion(user: any, checkerProfile: any, specialties?: any[]): number {
  let percentage = 10 // Base for registration

  if (user.avatar) percentage += 10
  if (user.languages?.length > 0) percentage += 15
  if (checkerProfile.businessCountry) percentage += 10
  if (checkerProfile.coverageAreas?.length > 0) percentage += 10
  if (checkerProfile.basePrice > 0) percentage += 15
  if (checkerProfile.professionalTitle) percentage += 10
  if (checkerProfile.description) percentage += 10
  // ✅ Specialties now count for 10%
  if (specialties && specialties.length > 0) percentage += 10

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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { checkerProfile: {
        include: { specialties: true }
      } }
    })

    if (!user || user.role !== 'CHECKER') {
      return { success: false, error: "User is not a checker" }
    }

    if (!user.checkerProfile) {
      return { success: false, error: "Checker profile not found" }
    }

    if (data.languages !== undefined) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { languages: data.languages }
      })
    }

    const updateData: any = {}
    
    if (data.coverageCountry !== undefined) {
      updateData.businessCountry = data.coverageCountry
    }
    
    if (data.coverageCities !== undefined) {
      updateData.coverageAreas = data.coverageCities

      // ✅ FIX: always sync businessCity with the first selected city.
      // businessCity is what the API and CheckerCard use for display.
      // coverageAreas is the full list; businessCity is the "primary" one.
      updateData.businessCity = data.coverageCities.length > 0
        ? data.coverageCities[0]
        : null
      }

    // ✅ Allow explicit businessCity override (e.g. if caller passes it separately)
    if (data.businessCity !== undefined) {
      updateData.businessCity = data.businessCity
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
    // ✅ Save specialties properly
    let savedSpecialties = user.checkerProfile.specialties ?? []
    if (data.specialties !== undefined) {
      await prisma.checkerSpecialty.deleteMany({
        where: { checkerId: user.checkerProfile.id }
      })

      if (data.specialties.length > 0) {
        await prisma.checkerSpecialty.createMany({
          data: data.specialties.map(s => ({
            checkerId: user.checkerProfile!.id,
            category: s.category,
            subcategory: s.subcategory ?? null,
            level: s.level || "expert"
          }))
        })
        savedSpecialties = data.specialties as any
      }
    }

    await prisma.checkerProfile.update({
      where: { id: user.checkerProfile.id },
      data: updateData
    })

    const updatedUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { checkerProfile: true }
    })

    // ✅ Pass specialties into completion calc
    const completionPercentage = calculateProfileCompletion(
      updatedUser,
      updatedUser!.checkerProfile,
      savedSpecialties
    )

    if (completionPercentage === 100 && user.checkerProfile.status === 'PENDING') {
      await prisma.checkerProfile.update({
        where: { id: user.checkerProfile.id },
        data: { 
          status: 'APPROVED',
          verifiedAt: new Date()
        }
      })
    }

    revalidatePath('/checker/profile')
    
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
      include: { checkerProfile:{
        include: { specialties: true }
      } }
    })

    if (!user || user.role !== 'CHECKER') {
      return { success: false, error: "User is not a checker" }
    }

    if (!user.checkerProfile) {
      return { success: false, error: "Checker profile not found" }
    }

    const completionPercentage = calculateProfileCompletion(
      user,
      user.checkerProfile,
      user.checkerProfile.specialties   // ✅ pass them in
    )

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
          basePrice: Number(user.checkerProfile.basePrice),
          businessCountry: user.checkerProfile.businessCountry,
          // ✅ Return both so the profile form can show the saved primary city
          specialties: user.checkerProfile.specialties,
          businessCity: user.checkerProfile.businessCity,
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

    revalidatePath('/checker/profile')
    
    return { success: true }
  } catch (error) {
    console.error("Delete avatar error:", error)
    return { success: false, error: "Failed to delete avatar" }
  }
}