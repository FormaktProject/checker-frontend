"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowLeft, FileText, MapPin, Calendar } from "lucide-react"
import type { FormData, ValidationErrors } from "../type-data"

interface ProfileInfoStepProps {
  formData: FormData
  errors: ValidationErrors
  updateFormData: (field: keyof FormData, value: any) => void
  isLoading: boolean
  onNext: () => void
  onPrevious: () => void
}

const ProfileInfoStep = ({ formData, errors, updateFormData, isLoading, onNext, onPrevious }: ProfileInfoStepProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const bioCharCount = formData.bio.length
  const descriptionCharCount = formData.professionalDescription.length

  return (
    <div className="p-8">
      <div
        className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Profile</h2>
          <p className="text-gray-600">Tell us about your professional background</p>
        </div>

        <div className="space-y-6">
          {/* Bio */}
          <div
            className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio / About Me <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                value={formData.bio}
                onChange={(e) => updateFormData("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                maxLength={200}
                rows={3}
                className={`
                  block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm 
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all duration-200 resize-none
                  ${
                    errors.bio
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                  }
                `}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              {errors.bio && <p className="text-sm text-red-600 animate-pulse">{errors.bio}</p>}
              <p className={`text-xs ml-auto ${bioCharCount > 180 ? "text-red-500" : "text-gray-500"}`}>
                {bioCharCount}/200
              </p>
            </div>
          </div>

          {/* Professional Description */}
          <div
            className={`transition-all duration-500 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Description <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                value={formData.professionalDescription}
                onChange={(e) => updateFormData("professionalDescription", e.target.value)}
                placeholder="Describe your professional expertise and services..."
                maxLength={300}
                rows={4}
                className={`
                  block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm 
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all duration-200 resize-none
                  ${
                    errors.professionalDescription
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                  }
                `}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              {errors.professionalDescription && (
                <p className="text-sm text-red-600 animate-pulse">{errors.professionalDescription}</p>
              )}
              <p className={`text-xs ml-auto ${descriptionCharCount > 270 ? "text-red-500" : "text-gray-500"}`}>
                {descriptionCharCount}/300
              </p>
            </div>
          </div>

          {/* Years of Experience */}
          <div
            className={`transition-all duration-500 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="0"
                max="50"
                value={formData.yearsOfExperience}
                onChange={(e) => updateFormData("yearsOfExperience", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
                className={`
                  block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm 
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all duration-200
                  ${
                    errors.yearsOfExperience
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                  }
                `}
              />
            </div>
            {errors.yearsOfExperience && (
              <p className="mt-1 text-sm text-red-600 animate-pulse">{errors.yearsOfExperience}</p>
            )}
          </div>

          {/* Business Address */}
          <div
            className={`transition-all duration-500 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.businessAddress}
                onChange={(e) => updateFormData("businessAddress", e.target.value)}
                placeholder="Enter your business address"
                className={`
                  block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm 
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all duration-200
                  ${
                    errors.businessAddress
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                  }
                `}
              />
            </div>
            {errors.businessAddress && (
              <p className="mt-1 text-sm text-red-600 animate-pulse">{errors.businessAddress}</p>
            )}
          </div>

          {/* City */}
          <div
            className={`transition-all duration-500 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location / City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
                placeholder="Enter your city"
                className={`
                  block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm 
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all duration-200
                  ${
                    errors.city
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                  }
                `}
              />
            </div>
            {errors.city && <p className="mt-1 text-sm text-red-600 animate-pulse">{errors.city}</p>}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={onPrevious}
            className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 
                     text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     transition-all duration-200 transform hover:scale-105"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous
          </button>

          <button
            onClick={onNext}
            disabled={isLoading}
            className={`
              flex-1 flex items-center justify-center px-6 py-3 border border-transparent 
              text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-all duration-200 transform hover:scale-105 hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              ${isLoading ? "bg-blue-400" : ""}
            `}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                Suivant
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoStep
