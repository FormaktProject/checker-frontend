"use client"

import React, { useState, useRef, useEffect, useTransition } from 'react'
import { Upload, Camera, Check, Clock, MapPin, DollarSign, Globe, User, Sparkles, ArrowRight, AlertCircle, Loader2, Save } from 'lucide-react'
import { uploadCheckerAvatar, updateCheckerProfile, getCheckerProfileCompletion } from '@/app/(dashboard)/checker/profile/_component/server-profile'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import data from '@/app/static-data'

const AVAILABLE_LANGUAGES = [
  'English', 'French', 'Spanish', 'German', 'Italian', 
  'Portuguese', 'Arabic', 'Chinese', 'Japanese', 'Russian',
  'Korean', 'Hindi', 'Turkish', 'Dutch', 'Swedish'
]



interface ProfileData {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    avatar: string | null
    languages: string[]
  }
  checkerProfile: {
    id: string
    professionalTitle: string
    description: string
    basePrice: number
    businessCountry: string | null
    coverageAreas: string[]
    status: string
  }
  completionPercentage: number
  isComplete: boolean
}

export default function CheckerProfileCompletionPage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [formData, setFormData] = useState({
    languages: [] as string[],
    businessCountry: '',
    coverageAreas: [] as string[],
    basePrice: 0,
    professionalTitle: '',
    description: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [cityInput, setCityInput] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [hasChanges, setHasChanges] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Load profile data on mount
  useEffect(() => {
    loadProfileData()
  }, [])

  // Initialize form data when profile loads
  useEffect(() => {
    if (profileData) {
      setFormData({
        languages: profileData.user.languages,
        businessCountry: profileData.checkerProfile.businessCountry || '',
        coverageAreas: profileData.checkerProfile.coverageAreas,
        basePrice: profileData.checkerProfile.basePrice,
        professionalTitle: profileData.checkerProfile.professionalTitle || '',
        description: profileData.checkerProfile.description || ''
      })
    }
  }, [profileData])

  const loadProfileData = async () => {
    setIsLoading(true)
    try {
      const result = await getCheckerProfileCompletion()
      if (result.success && result.data) {
        setProfileData(result.data)
      } else {
        console.error(result.error)
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle avatar upload (still immediate since it's a file upload)
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    setIsUploading(true)
    setUploadProgress(0)

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('avatar', file)

      const result = await uploadCheckerAvatar(formDataUpload)
      
      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result.success && result.url) {
        await loadProfileData()
        setTimeout(() => {
          setPreviewImage(null)
        }, 500)
      } else {
        alert(result.error || 'Failed to upload avatar')
        setPreviewImage(null)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload avatar')
      setPreviewImage(null)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Handle form field changes
  const handleLanguageToggle = (lang: string) => {
    setFormData(prev => {
      const newLanguages = prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
      return { ...prev, languages: newLanguages }
    })
    setHasChanges(true)
  }

  const handleCityAdd = () => {
    if (!cityInput.trim()) return
    if (formData.coverageAreas.includes(cityInput.trim())) {
      setCityInput('')
      return
    }
    setFormData(prev => ({
      ...prev,
      coverageAreas: [...prev.coverageAreas, cityInput.trim()]
    }))
    setCityInput('')
    setHasChanges(true)
  }

  const handleCityRemove = (city: string) => {
    setFormData(prev => ({
      ...prev,
      coverageAreas: prev.coverageAreas.filter(c => c !== city)
    }))
    setHasChanges(true)
  }

  // Save all profile changes
  const handleSaveProfile = async () => {
    if (!hasChanges) return

    setSaveStatus('saving')

    try {
      const updateData = {
        languages: formData.languages,
        coverageCountry: formData.businessCountry,
        coverageCities: formData.coverageAreas,
        basePrice: formData.basePrice,
        professionalTitle: formData.professionalTitle,
        description: formData.description
      }

      const result = await updateCheckerProfile(updateData)

      if (result.success) {
        // Reload profile to get updated completion percentage
        await loadProfileData()
        setSaveStatus('saved')
        setHasChanges(false)
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Save error:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load profile</p>
        </div>
      </div>
    )
  }

  const completion = profileData.completionPercentage
  const isProfileComplete = profileData.isComplete

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Save Status Indicator */}
      {saveStatus !== 'idle' && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 ${
            saveStatus === 'saving' ? 'bg-blue-500 text-white' :
            saveStatus === 'saved' ? 'bg-green-500 text-white' :
            'bg-red-500 text-white'
          }`}>
            {saveStatus === 'saving' && <Loader2 className="w-5 h-5 animate-spin" />}
            {saveStatus === 'saved' && <Check className="w-5 h-5" />}
            {saveStatus === 'error' && <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">
              {saveStatus === 'saving' ? 'Saving...' :
               saveStatus === 'saved' ? 'Saved!' :
               'Save failed'}
            </span>
          </div>
        </div>
      )}

      {/* Unsaved Changes Warning */}
      {hasChanges && saveStatus === 'idle' && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">You have unsaved changes</span>
          </div>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 animate-pulse" />
            <h1 className="text-4xl font-bold">Welcome to Checkerist, {profileData.user.firstName}!</h1>
          </div>
          <p className="text-xl text-blue-100 mb-6">
            You&apos;re joining an elite community of professional checkers. Let&apos;s complete your profile to start receiving booking requests!
          </p>
          
          {/* Progress Bar */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full h-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 flex items-center justify-end px-4"
              style={{ width: `${completion}%` }}
            >
              <span className="text-white font-bold text-sm">
                {completion}% Complete
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
            <Clock className="w-4 h-4" />
            <span>Complete your profile to appear in search results • The more complete, the more bookings!</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                    {profileData.user.avatar || previewImage ? (
                      <img 
                        src={previewImage || profileData.user.avatar || ''} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <div className="text-white text-sm font-bold">{uploadProgress}%</div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all disabled:opacity-50"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
                
                <h2 className="text-2xl font-bold mt-4 text-gray-800">
                  {profileData.user.firstName} {profileData.user.lastName}
                </h2>
                <p className="text-gray-500">{profileData.user.email}</p>
              </div>

              {/* Completion Checklist */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 mb-4">Profile Checklist</h3>
                
                <ChecklistItem 
                  completed={!!profileData.user.avatar}
                  text="Upload profile photo"
                />
                <ChecklistItem 
                  completed={formData.languages.length > 0}
                  text="Add languages"
                />
                <ChecklistItem 
                  completed={!!formData.businessCountry}
                  text="Set coverage country"
                />
                <ChecklistItem 
                  completed={formData.coverageAreas.length > 0}
                  text="Add cities"
                />
                <ChecklistItem 
                  completed={formData.basePrice > 0}
                  text="Set starting price"
                />
                <ChecklistItem 
                  completed={!!formData.professionalTitle}
                  text="Add professional title"
                />
                <ChecklistItem 
                  completed={!!formData.description}
                  text="Write description"
                />
              </div>

              {/* Visibility Indicator */}
              <div className={`mt-6 p-4 rounded-xl ${isProfileComplete ? 'bg-green-50 border-2 border-green-500' : 'bg-yellow-50 border-2 border-yellow-500'}`}>
                <div className="flex items-start gap-3">
                  {isProfileComplete ? (
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-semibold text-sm ${isProfileComplete ? 'text-green-800' : 'text-yellow-800'}`}>
                      {isProfileComplete ? 'Profile Live!' : 'Profile Incomplete'}
                    </p>
                    <p className={`text-xs mt-1 ${isProfileComplete ? 'text-green-700' : 'text-yellow-700'}`}>
                      {isProfileComplete 
                        ? 'Your profile is visible to all users and ready to receive bookings!'
                        : 'Complete your profile to start appearing in search results and receive booking requests.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Languages Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Languages You Speak</h3>
                  <p className="text-gray-500 text-sm">Select all languages you can communicate in</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AVAILABLE_LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageToggle(lang)}
                    disabled={saveStatus === 'saving'}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.languages.includes(lang)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 text-gray-700'
                    } disabled:opacity-50`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{lang}</span>
                      {formData.languages.includes(lang) && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Coverage Area Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Coverage Area</h3>
                  <p className="text-gray-500 text-sm">Where can you provide checking services?</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={formData.businessCountry}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, businessCountry: e.target.value }))
                      setHasChanges(true)
                    }}
                    disabled={saveStatus === 'saving'}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:opacity-50"
                  >
                    <option value="">Select a country</option>
                    {Object.keys(data).map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cities
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleCityAdd()
                        }
                      }}
                      placeholder="Add a city..."
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                    />
                    <button
                      onClick={handleCityAdd}
                      disabled={!cityInput.trim() || saveStatus === 'saving'}
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-medium disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                  
                  {formData.coverageAreas.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.coverageAreas.map(city => (
                        <span
                          key={city}
                          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2"
                        >
                          {city}
                          <button
                            onClick={() => handleCityRemove(city)}
                            disabled={saveStatus === 'saving'}
                            className="hover:text-purple-900 transition-colors disabled:opacity-50"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Starting Price</h3>
                  <p className="text-gray-500 text-sm">Set your base price for checking services</p>
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={formData.basePrice || ''}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, basePrice: parseFloat(e.target.value) || 0 }))
                    setHasChanges(true)
                  }}
                  disabled={saveStatus === 'saving'}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-12 pr-24 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all text-2xl font-bold disabled:opacity-50"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  per check
                </span>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                💡 Tip: Competitive pricing helps you get more bookings initially!
              </p>
            </div>

            {/* Professional Info Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Professional Details</h3>
                  <p className="text-gray-500 text-sm">Tell clients about your expertise</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={formData.professionalTitle}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, professionalTitle: e.target.value }))
                      setHasChanges(true)
                    }}
                    disabled={saveStatus === 'saving'}
                    placeholder="e.g., Hotel Inspector, Restaurant Checker"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, description: e.target.value }))
                      setHasChanges(true)
                    }}
                    disabled={saveStatus === 'saving'}
                    placeholder="Describe your experience, specialties, and what makes you great at checking..."
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all resize-none disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.description?.length || 0} characters
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveProfile}
              disabled={!hasChanges || saveStatus === 'saving'}
              className={`w-full py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                hasChanges && saveStatus !== 'saving'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {saveStatus === 'saving' ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Saving Profile...
                </>
              ) : hasChanges ? (
                <>
                  <Save className="w-6 h-6" />
                  Save Profile Changes
                </>
              ) : (
                <>
                  <Check className="w-6 h-6" />
                  All Changes Saved
                </>
              )}
            </button>

            {/* Dashboard Button */}
            <button
              onClick={() => {
                if (isProfileComplete) {
                  router.push('/checker')
                }
              }}
              disabled={!isProfileComplete || hasChanges}
              className={`w-full py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                isProfileComplete && !hasChanges
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {hasChanges ? (
                <>
                  <AlertCircle className="w-6 h-6" />
                  Save changes before continuing
                </>
              ) : isProfileComplete ? (
                <>
                  <Check className="w-6 h-6" />
                  Go to Dashboard
                  <ArrowRight className="w-6 h-6" />
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6" />
                  Complete all fields to continue
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ChecklistItem = ({ completed, text }: { completed: boolean; text: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
      completed ? 'bg-green-500' : 'bg-gray-200'
    }`}>
      {completed && <Check className="w-4 h-4 text-white" />}
    </div>
    <span className={`text-sm ${completed ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
      {text}
    </span>
  </div>
)