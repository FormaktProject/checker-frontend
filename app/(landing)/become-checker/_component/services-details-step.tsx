"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, CheckCircle, Users } from "lucide-react"
import type { FormData, ValidationErrors } from "../type-data"

interface ServiceDetailsStepProps {
  formData: FormData
  errors: ValidationErrors
  updateFormData: (field: keyof FormData, value: any) => void
  isLoading: boolean
  onNext: () => void
  onPrevious: () => void
}

const ServiceDetailsStep = ({
  formData,
  errors,
  updateFormData,
  isLoading,
  onNext,
  onPrevious,
}: ServiceDetailsStepProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const responseTimeOptions = [
    { value: "same-day", label: "Same Day" },
    { value: "1-2-days", label: "1-2 Days" },
    { value: "3-5-days", label: "3-5 Days" },
    { value: "1-week", label: "1 Week" },
  ]

  const expertiseOptions = [
    { value: "quality-assurance", label: "Quality Assurance" },
    { value: "code-review", label: "Code Review" },
    { value: "security-audit", label: "Security Audit" },
    { value: "performance-testing", label: "Performance Testing" },
    { value: "ui-ux-review", label: "UI/UX Review" },
  ]

  const availabilityOptions = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "weekends-only", label: "Weekends Only" },
    { value: "by-appointment", label: "By Appointment" },
  ]

  const handleExpertiseChange = (value: string) => {
    const currentAreas = formData.expertiseAreas
    const updatedAreas = currentAreas.includes(value)
      ? currentAreas.filter((area) => area !== value)
      : [...currentAreas, value]
    updateFormData("expertiseAreas", updatedAreas)
  }

  return (
    <div className="p-8">
      <div
        className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Details</h2>
          <p className="text-gray-600">Configure your service preferences</p>
        </div>

        <div className="space-y-8">
          {/* Response Time */}
          <div
            className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Response Time <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {responseTimeOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateFormData("responseTime", option.value)}
                  className={`
                    p-4 border-2 rounded-lg text-left transition-all duration-200 transform hover:scale-105
                    ${
                      formData.responseTime === option.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3" />
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
            {errors.responseTime && <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.responseTime}</p>}
          </div>

          {/* Expertise Areas */}
          <div
            className={`transition-all duration-500 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Expertise Areas <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {expertiseOptions.map((option, index) => (
                <label
                  key={option.value}
                  className={`
                    flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                    hover:bg-gray-50 transform hover:scale-105
                    ${
                      formData.expertiseAreas.includes(option.value)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <input
                    type="checkbox"
                    checked={formData.expertiseAreas.includes(option.value)}
                    onChange={() => handleExpertiseChange(option.value)}
                    className="sr-only"
                  />
                  <div
                    className={`
                    flex items-center justify-center w-5 h-5 border-2 rounded mr-3 transition-all duration-200
                    ${
                      formData.expertiseAreas.includes(option.value) ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    }
                  `}
                  >
                    {formData.expertiseAreas.includes(option.value) && <CheckCircle className="h-3 w-3 text-white" />}
                  </div>
                  <span
                    className={`font-medium ${
                      formData.expertiseAreas.includes(option.value) ? "text-blue-700" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.expertiseAreas && (
              <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.expertiseAreas}</p>
            )}
          </div>

          {/* Availability */}
          <div
            className={`transition-all duration-500 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Availability <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {availabilityOptions.map((option, index) => (
                <label
                  key={option.value}
                  className={`
                    flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                    hover:bg-gray-50 transform hover:scale-105
                    ${
                      formData.availability === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <input
                    type="radio"
                    name="availability"
                    value={option.value}
                    checked={formData.availability === option.value}
                    onChange={(e) => updateFormData("availability", e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`
                    flex items-center justify-center w-5 h-5 border-2 rounded-full mr-3 transition-all duration-200
                    ${formData.availability === option.value ? "border-blue-500" : "border-gray-300"}
                  `}
                  >
                    {formData.availability === option.value && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                  <Users className="h-5 w-5 mr-3 text-gray-400" />
                  <span
                    className={`font-medium ${
                      formData.availability === option.value ? "text-blue-700" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.availability && <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.availability}</p>}
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
              text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 
              hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              ${isLoading ? "from-blue-400 to-blue-500" : ""}
            `}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Completing Registration...
              </div>
            ) : (
              "Complete Registration"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailsStep
