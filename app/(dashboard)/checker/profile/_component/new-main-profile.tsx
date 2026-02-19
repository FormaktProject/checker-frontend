"use client"

import React, { useState, useRef, useEffect } from 'react'
import {
  Camera, Check, MapPin, DollarSign, Globe, User,
  ArrowRight, AlertCircle, Loader2, Save, Lock, Lightbulb,
  FileText, Languages, TrendingUp, Shield, CreditCard
} from 'lucide-react'
import { uploadCheckerAvatar, updateCheckerProfile, getCheckerProfileCompletion } from '@/app/(dashboard)/checker/profile/_component/server-profile'
import { useRouter } from 'next/navigation'
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
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [hasChanges, setHasChanges] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => { loadProfileData() }, [])

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
      if (result.success && result.data) setProfileData(result.data)
      else console.error(result.error)
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { alert('Please upload an image file'); return }
    if (file.size > 5 * 1024 * 1024) { alert('File size must be less than 5MB'); return }

    const reader = new FileReader()
    reader.onload = (e) => setPreviewImage(e.target?.result as string)
    reader.readAsDataURL(file)

    setIsUploading(true)
    setUploadProgress(0)
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => { if (prev >= 90) { clearInterval(progressInterval); return 90 } return prev + 10 })
    }, 200)

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('avatar', file)
      const result = await uploadCheckerAvatar(formDataUpload)
      clearInterval(progressInterval)
      setUploadProgress(100)
      if (result.success && result.url) {
        await loadProfileData()
        setTimeout(() => setPreviewImage(null), 500)
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

  const handleLanguageToggle = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }))
    setHasChanges(true)
  }

  const handleSaveProfile = async () => {
    if (!hasChanges) return
    setSaveStatus('saving')
    try {
      const result = await updateCheckerProfile({
        languages: formData.languages,
        coverageCountry: formData.businessCountry,
        coverageCities: formData.coverageAreas,
        // ✅ Explicitly pass the first city as businessCity so the CheckerCard
        // can display it. The server also derives this automatically from
        // coverageCities[0], but being explicit is cleaner.
        businessCity: formData.coverageAreas[0] ?? '',
        basePrice: formData.basePrice,
        professionalTitle: formData.professionalTitle,
        description: formData.description
      })
      if (result.success) {
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'radial-gradient(circle at 10% 20%, rgb(239,246,255) 0%, rgb(243,232,255) 40%, rgb(236,253,245) 90%)' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-[#2b4bee]" />
          </div>
          <p className="text-gray-500 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'radial-gradient(circle at 10% 20%, rgb(239,246,255) 0%, rgb(243,232,255) 40%, rgb(236,253,245) 90%)' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-gray-500 font-medium">Failed to load profile</p>
        </div>
      </div>
    )
  }

  const completion = profileData.completionPercentage
  const isProfileComplete = profileData.isComplete

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'radial-gradient(circle at 10% 20%, rgb(239,246,255) 0%, rgb(243,232,255) 40%, rgb(236,253,245) 90%)', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Toast notifications */}
      {saveStatus !== 'idle' && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-white text-sm font-semibold ${
            saveStatus === 'saving' ? 'bg-[#2b4bee]' :
            saveStatus === 'saved' ? 'bg-emerald-500' : 'bg-red-500'
          }`}>
            {saveStatus === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
            {saveStatus === 'saved' && <Check className="w-4 h-4" />}
            {saveStatus === 'error' && <AlertCircle className="w-4 h-4" />}
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save failed'}
          </div>
        </div>
      )}

      {hasChanges && saveStatus === 'idle' && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="px-5 py-3 bg-amber-500 text-white rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold">
            <AlertCircle className="w-4 h-4" />
            Unsaved changes
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
        
        {/* ── SIDEBAR ── */}
        <aside className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-5 lg:sticky lg:top-8 h-fit">
          
          {/* Profile Card */}
          <div className="relative rounded-2xl p-7 flex flex-col items-center overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)' }}>
            {/* Rainbow top bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2b4bee] via-[#a855f7] to-[#10b981]" />
            
            {/* Avatar */}
            <div className="relative mb-4 mt-2">
              <div className="w-28 h-28 rounded-full overflow-hidden" style={{ background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #2b4bee, #a855f7, #10b981) border-box', border: '4px solid transparent' }}>
                {profileData.user.avatar || previewImage ? (
                  <img src={previewImage || profileData.user.avatar || ''} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#2b4bee]/20 to-[#a855f7]/20 flex items-center justify-center">
                    <User className="w-12 h-12 text-[#2b4bee]" />
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                    <span className="text-white text-xs font-bold">{uploadProgress}%</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0.5 right-0.5 w-9 h-9 bg-white text-[#2b4bee] rounded-full flex items-center justify-center shadow-lg border border-gray-100 hover:scale-110 transition-transform disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 text-center">{profileData.user.firstName} {profileData.user.lastName}</h2>
            <p className="text-gray-400 text-sm text-center mb-3">{profileData.user.email}</p>
            <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2b4bee]" style={{ background: 'rgba(43,75,238,0.1)' }}>
              Level 3 Checker
            </div>

            {/* Badge */}
            <div className="mt-5 w-full rounded-xl p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f1f4, #ffffff)', border: '1px solid rgba(255,255,255,0.8)' }}>
              <div className="absolute -right-3 -top-3 opacity-10">
                <Shield className="w-20 h-20 text-[#a855f7]" />
              </div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Current Badge</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#a855f7]" />
                <span className="text-base font-bold" style={{ background: 'linear-gradient(135deg, #2b4bee, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Advanced Scout
                </span>
              </div>
            </div>
          </div>

          {/* Mission Control / Checklist */}
          <div className="rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)' }}>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Check className="w-4 h-4 text-[#2b4bee]" />
              Mission Control
            </h3>
            <div className="flex flex-col gap-1">
              <MissionItem icon={<User className="w-4 h-4" />} label="Profile Photo" status={!!profileData.user.avatar ? 'done' : 'pending'} />
              <MissionItem icon={<FileText className="w-4 h-4" />} label="Professional Bio" status={formData.professionalTitle && formData.description ? 'active' : 'pending'} />
              <MissionItem icon={<Languages className="w-4 h-4" />} label="Languages" status={formData.languages.length > 0 ? 'done' : 'pending'} />
              <MissionItem icon={<MapPin className="w-4 h-4" />} label="Service Area" status={formData.businessCountry ? 'done' : 'locked'} />
              <MissionItem icon={<DollarSign className="w-4 h-4" />} label="Pricing" status={formData.basePrice > 0 ? 'done' : 'locked'} />
              <MissionItem icon={<Shield className="w-4 h-4" />} label="Verification" status="locked" />
              <MissionItem icon={<CreditCard className="w-4 h-4" />} label="Payout Settings" status="locked" />
            </div>
          </div>

          {/* Profile visibility */}
          <div className={`rounded-2xl p-4 text-sm font-medium flex items-start gap-3 ${isProfileComplete ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}>
            {isProfileComplete
              ? <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              : <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />}
            <div>
              <p className="font-bold">{isProfileComplete ? '🎉 Profile Live!' : 'Profile Incomplete'}</p>
              <p className="text-xs mt-0.5 opacity-80">
                {isProfileComplete
                  ? 'Visible to all users — ready to receive bookings!'
                  : 'Complete all fields to appear in search results.'}
              </p>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 flex flex-col gap-7 pb-20">
          
          {/* Header */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1.5 tracking-tight">
                  Ready to Level Up? 🚀
                </h1>
                <p className="text-gray-500 text-lg">Complete your profile to unlock high-paying gigs.</p>
              </div>
              <div className="text-xs font-semibold text-[#2b4bee] px-4 py-2 rounded-lg whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)' }}>
                {saveStatus === 'saved' ? '✓ Just saved' : hasChanges ? '● Unsaved' : 'All saved'}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-14 w-full rounded-2xl p-2 flex items-center shadow-[0_20px_40px_-10px_rgba(43,75,238,0.15)]" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}>
              <div className="absolute top-0 left-0 h-full rounded-l-2xl opacity-10 transition-all duration-700" style={{ width: `${completion}%`, background: 'linear-gradient(90deg, #2b4bee, #a855f7, #10b981)' }} />
              <div className="relative w-full mx-2 h-3 bg-gray-100 rounded-full overflow-visible">
                <div
                  className="h-full rounded-full relative transition-all duration-700"
                  style={{ width: `${completion}%`, background: 'linear-gradient(90deg, #2b4bee, #a855f7, #10b981)', boxShadow: '0 0 15px rgba(168,85,247,0.5)' }}
                >
                  <div className="absolute -right-5 -top-5 w-11 h-11 bg-white rounded-full shadow-lg border-2 border-[#10b981] flex items-center justify-center text-lg">
                    😎
                  </div>
                  <div className="absolute -right-7 top-8 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                    {completion}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bio / Professional Details ── */}
          <GlassCard accentColor="#2b4bee" accentBg="from-blue-100 to-blue-50" icon={<FileText className="w-7 h-7 text-[#2b4bee]" />} title="About You">
            <div className="space-y-5 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Tagline</label>
                <input
                  type="text"
                  value={formData.professionalTitle}
                  onChange={e => { setFormData(prev => ({ ...prev, professionalTitle: e.target.value })); setHasChanges(true) }}
                  disabled={saveStatus === 'saving'}
                  placeholder="e.g. Hotel Inspector with an eye for detail"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#2b4bee] focus:outline-none transition-shadow hover:shadow-md disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio (Important)</label>
                <textarea
                  value={formData.description}
                  onChange={e => { setFormData(prev => ({ ...prev, description: e.target.value })); setHasChanges(true) }}
                  disabled={saveStatus === 'saving'}
                  placeholder="Tell clients why they should pick you..."
                  rows={4}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#2b4bee] focus:outline-none transition-shadow hover:shadow-md resize-none disabled:opacity-50"
                />
                <div className="flex justify-end mt-1 text-xs text-gray-400 font-medium">
                  {formData.description.length} / 500 characters
                </div>
              </div>
            </div>
          </GlassCard>

          {/* ── Languages + Geography 2-col ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Languages */}
            <GlassCard accentColor="#a855f7" accentBg="from-purple-100 to-purple-50" icon={<Globe className="w-7 h-7 text-[#a855f7]" />} title="Languages">
              <p className="text-sm text-gray-400 mb-4">Languages you can fluently communicate in.</p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_LANGUAGES.map(lang => {
                  const selected = formData.languages.includes(lang)
                  return (
                    <button
                      key={lang}
                      onClick={() => handleLanguageToggle(lang)}
                      disabled={saveStatus === 'saving'}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 ${
                        selected
                          ? 'text-white shadow-lg'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-[#a855f7] hover:text-[#a855f7]'
                      }`}
                      style={selected ? { background: 'linear-gradient(135deg, #2b4bee, #a855f7)', boxShadow: '0 4px 12px rgba(168,85,247,0.3)' } : {}}
                    >
                      {lang}
                      {selected && <Check className="w-3 h-3" />}
                    </button>
                  )
                })}
              </div>
            </GlassCard>

            {/* Service Area */}
            <GlassCard accentColor="#10b981" accentBg="from-emerald-100 to-emerald-50" icon={<MapPin className="w-7 h-7 text-[#10b981]" />} title="Service Area">
              <div className="flex flex-col gap-4">
                {/* Country selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <select
                    value={formData.businessCountry}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, businessCountry: e.target.value }))
                      setHasChanges(true)
                    }}
                    disabled={saveStatus === 'saving'}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white/50 px-4 py-3 text-gray-700 focus:border-[#10b981] focus:outline-none transition-shadow hover:shadow-md disabled:opacity-50"
                  >
                    <option value="">Select a country</option>
                    {Object.keys(data).map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* City tag input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Cities</label>
                    {formData.coverageAreas.length > 0 && (
                      <button
                        type="button"
                        onClick={() => { setFormData(prev => ({ ...prev, coverageAreas: [] })); setHasChanges(true) }}
                        disabled={saveStatus === 'saving'}
                        className="text-xs text-gray-400 font-semibold hover:text-red-500 transition-colors disabled:opacity-40"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Tag input box */}
                  <CityTagInput
                    cities={formData.coverageAreas}
                    disabled={saveStatus === 'saving'}
                    onChange={cities => {
                      setFormData(prev => ({ ...prev, coverageAreas: cities }))
                      setHasChanges(true)
                    }}
                  />

                  {formData.coverageAreas.length > 0 && (
                    <p className="mt-2 text-xs text-[#10b981] font-semibold">
                      ✓ {formData.coverageAreas.length} {formData.coverageAreas.length === 1 ? 'city' : 'cities'} added
                    </p>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* ── Pricing ── */}
          <GlassCard accentColor="#eab308" accentBg="from-yellow-100 to-yellow-50" icon={<DollarSign className="w-7 h-7 text-yellow-600" />} title="Pricing">
            <div className="flex flex-col md:flex-row gap-7 items-start">
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-5">Set your base rate. Pro Checkers typically charge between $40–$60 per check.</p>
                <div className="relative max-w-xs">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-300">$</span>
                  <input
                    type="number"
                    value={formData.basePrice || ''}
                    onChange={e => { setFormData(prev => ({ ...prev, basePrice: parseFloat(e.target.value) || 0 })); setHasChanges(true) }}
                    disabled={saveStatus === 'saving'}
                    placeholder="0"
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-16 py-4 text-4xl font-extrabold text-gray-900 bg-white border-2 border-dashed border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-right disabled:opacity-50"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">/ check</span>
                </div>
              </div>
              {/* Pro tip card */}
              <div className="w-full md:w-56 rounded-2xl p-5 text-white md:rotate-1 md:translate-y-3 shadow-xl" style={{ background: 'linear-gradient(135deg, #101322, #2b4bee)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold">Pro Tip</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Checkers with a complete bio and verified skills earn on average{' '}
                  <span className="text-white font-bold underline decoration-yellow-400">20% more</span> per gig.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* ── Action Buttons ── */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#2b4bee]/10">
            <button
              onClick={handleSaveProfile}
              disabled={!hasChanges || saveStatus === 'saving'}
              className="flex-1 sm:flex-none py-4 px-8 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}
            >
              {saveStatus === 'saving' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
            </button>

            <button
              onClick={() => { if (isProfileComplete) router.push('/checker') }}
              disabled={!isProfileComplete || hasChanges}
              className="flex-1 sm:flex-none py-4 px-8 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              style={{ background: 'linear-gradient(135deg, #2b4bee, #6366f1)', boxShadow: '0 8px 20px rgba(43,75,238,0.3)' }}
            >
              {hasChanges
                ? <><AlertCircle className="w-5 h-5" /> Save first</>
                : isProfileComplete
                  ? <><Check className="w-5 h-5" /> Go to Dashboard <ArrowRight className="w-5 h-5" /></>
                  : <><Lock className="w-5 h-5" /> Complete profile first</>}
            </button>

            <button
              onClick={() => router.back()}
              className="sm:ml-auto py-4 px-6 rounded-xl bg-white text-gray-400 font-bold text-sm hover:text-gray-700 hover:bg-gray-50 transition-colors border border-gray-100"
            >
              Cancel
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

// ── Helper Components ──

function GlassCard({
  children, icon, title, accentColor, accentBg
}: {
  children: React.ReactNode
  icon: React.ReactNode
  title: string
  accentColor: string
  accentBg: string
}) {
  return (
    <section
      className="relative rounded-2xl p-6 lg:p-8 group transition-colors"
      style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.07)'
      }}
    >
      <div className={`absolute top-6 right-6 p-3 bg-gradient-to-br ${accentBg} rounded-xl shadow-inner transform rotate-3 group-hover:rotate-6 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-6 text-gray-800">{title}</h3>
      {children}
    </section>
  )
}

// ── CityTagInput ──
function CityTagInput({
  cities,
  disabled,
  onChange,
}: {
  cities: string[]
  disabled: boolean
  onChange: (cities: string[]) => void
}) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const addCity = (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return
    // Support pasting comma-separated cities: "Paris, Lyon, Nice"
    const incoming = trimmed
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0 && !cities.includes(c))
    if (incoming.length === 0) return
    onChange([...cities, ...incoming])
    setInputValue('')
  }

  const removeCity = (city: string) => {
    onChange(cities.filter(c => c !== city))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addCity(inputValue)
    }
    if (e.key === 'Backspace' && inputValue === '' && cities.length > 0) {
      removeCity(cities[cities.length - 1])
    }
  }

  return (
    <div
      className={`min-h-[52px] w-full rounded-xl border-2 bg-white/50 px-3 py-2 flex flex-wrap gap-1.5 items-center cursor-text transition-all ${
        disabled ? 'opacity-50 pointer-events-none' : 'border-gray-200 hover:shadow-md focus-within:border-[#10b981]'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Existing tags */}
      {cities.map(city => (
        <span
          key={city}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 2px 8px rgba(16,185,129,0.25)' }}
        >
          <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
          {city}
          <button
            type="button"
            onClick={e => { e.stopPropagation(); removeCity(city) }}
            className="ml-0.5 hover:opacity-70 transition-opacity leading-none"
            aria-label={`Remove ${city}`}
          >
            ×
          </button>
        </span>
      ))}

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addCity(inputValue)}
        placeholder={cities.length === 0 ? 'Type a city and press Enter…' : 'Add another city…'}
        className="flex-1 min-w-[140px] bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none py-0.5"
        disabled={disabled}
      />
    </div>
  )
}

function MissionItem({ icon, label, status }: { icon: React.ReactNode; label: string; status: 'done' | 'active' | 'pending' | 'locked' }) {
  const configs = {
    done: { bg: 'bg-emerald-100', text: 'text-emerald-600', badge: 'text-emerald-600 font-medium', badgeText: 'Completed', border: '' },
    active: { bg: 'bg-[#2b4bee]', text: 'text-white', badge: 'text-[#2b4bee] font-medium', badgeText: 'In Progress', border: 'border border-[#2b4bee]/20 bg-gradient-to-r from-[#2b4bee]/5 to-transparent' },
    pending: { bg: 'bg-gray-100', text: 'text-gray-500', badge: 'text-gray-400', badgeText: 'Pending', border: 'opacity-75' },
    locked: { bg: 'bg-gray-100', text: 'text-gray-400', badge: 'text-gray-400', badgeText: 'Locked', border: 'opacity-50' },
  }
  const c = configs[status]

  return (
    <div className={`flex items-center gap-3 p-2.5 rounded-xl transition-all hover:translate-x-1 ${c.border}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${c.bg} ${c.text}`}>
        {status === 'locked' ? <Lock className="w-4 h-4" /> : status === 'done' ? <Check className="w-4 h-4" /> : icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-bold text-gray-800 truncate">{label}</span>
        <span className={`text-xs ${c.badge}`}>{c.badgeText}</span>
      </div>
    </div>
  )
}