"use client"

import { useState, useEffect } from "react"
import { ArrowRight, User, Mail, Phone } from "lucide-react"
import type { FormData, ValidationErrors } from "../type-data"

interface PersonalInfoStepProps {
  formData: FormData
  errors: ValidationErrors
  updateFormData: (field: keyof FormData, value: any) => void
  isLoading: boolean
  onNext: () => void
}

const PersonalInfoStep = ({ formData, errors, updateFormData, isLoading, onNext }: PersonalInfoStepProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const inputFields = [
    {
      key: "firstName" as keyof FormData,
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      icon: User,
      delay: 0,
    },
    {
      key: "lastName" as keyof FormData,
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      icon: User,
      delay: 100,
    },
    {
      key: "email" as keyof FormData,
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email address",
      icon: Mail,
      delay: 200,
    },
    {
      key: "phone" as keyof FormData,
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
      icon: Phone,
      delay: 300,
    },
  ]

  return (
    <div className="p-8">
      <div
        className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
          <p className="text-gray-600">Let&apos;s start with your basic information</p>
        </div>

        <div className="space-y-6">
          {inputFields.map((field, index) => {
            const IconComponent = field.icon
            return (
              <div
                key={field.key}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: `${field.delay}ms` }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconComponent className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={field.type}
                    value={formData[field.key] as string}
                    onChange={(e) => updateFormData(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={`
                      block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm 
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                      focus:border-transparent transition-all duration-200
                      ${
                        errors[field.key]
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                      }
                    `}
                  />
                </div>
                {errors[field.key] && <p className="mt-1 text-sm text-red-600 animate-pulse">{errors[field.key]}</p>}
              </div>
            )
          })}
        </div>

        <div className="mt-8">
          <button
            onClick={onNext}
            disabled={isLoading}
            className={`
              w-full flex items-center justify-center px-6 py-3 border border-transparent 
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
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoStep
