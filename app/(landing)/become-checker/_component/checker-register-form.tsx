"use client"
import { useState, useLayoutEffect, useRef } from "react"
import { CheckCircle, User, Briefcase, Settings } from "lucide-react"
import { FormData, ValidationErrors } from "../type-data"
import PersonalInfoStep from "./personal-info-step"
import ProfileInfoStep from "./profile-info-step"
import SuccessStep from "./succes-step"
import ServiceDetailsStep from "./services-details-step"
const CheckerRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Profile Info
    bio: "",
    professionalDescription: "",
    yearsOfExperience: 0,
    businessAddress: "",
    city: "",
    // Service Details
    responseTime: "",
    expertiseAreas: [],
    availability: "",
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")

  const totalSteps = 3
  const progressPercentage = (currentStep / totalSteps) * 100

  const stepIcons = [
    { icon: User, label: "Personal Info" },
    { icon: Briefcase, label: "Professional Profile" },
    { icon: Settings, label: "Service Details" },
  ]

  const contentRef = useRef<HTMLDivElement>(null)
  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  // Smooth step transition effect
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      // Reset slide direction after animation
      setSlideDirection("right")
    }, 300)

    return () => clearTimeout(timer)
  }, [currentStep])

  // Adjust container height based on current step
  useLayoutEffect(() => {
    if (contentRef.current && stepRefs[currentStep - 1].current) {
      const height = stepRefs[currentStep - 1].current!.clientHeight
      contentRef.current.style.height = `${height}px`
    }
  }, [currentStep])

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number"
      }
    }

    if (step === 2) {
      if (!formData.bio.trim()) newErrors.bio = "Bio is required"
      if (!formData.professionalDescription.trim()) {
        newErrors.professionalDescription = "Professional description is required"
      }
      if (formData.yearsOfExperience < 0 || formData.yearsOfExperience > 50) {
        newErrors.yearsOfExperience = "Years of experience must be between 0 and 50"
      }
      if (!formData.businessAddress.trim()) newErrors.businessAddress = "Business address is required"
      if (!formData.city.trim()) newErrors.city = "City is required"
    }

    if (step === 3) {
      if (!formData.responseTime) newErrors.responseTime = "Response time is required"
      if (formData.expertiseAreas.length === 0) {
        newErrors.expertiseAreas = "Please select at least one expertise area"
      }
      if (!formData.availability) newErrors.availability = "Availability is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (!validateStep(currentStep)) return

    setIsLoading(true)
    setSlideDirection("right")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final submission
      await submitForm()
    }

    setIsLoading(false)
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setSlideDirection("left")
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const submitForm = async () => {
    // Simulate final API submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsComplete(true)
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev:any) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev:any) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isComplete) {
    return <SuccessStep />
  }

  return (
   <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-full">
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {stepIcons.map((step, index) => {
            const stepNumber = index + 1
            const isActive = stepNumber === currentStep
            const isCompleted = stepNumber < currentStep
            const IconComponent = step.icon

            return (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`
                  flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300
                  ${
                    isActive
                      ? "border-blue-500 bg-blue-500 text-white shadow-lg scale-110"
                      : isCompleted
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                  }
                `}
                >
                  {isCompleted ? <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" /> : <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />}
                </div>
                <div className="ml-2 sm:ml-3 hidden sm:block">
                  <p
                    className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    Step {stepNumber}
                  </p>
                  <p
                    className={`text-xs transition-colors duration-300 ${
                      isActive ? "text-blue-500" : isCompleted ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {index < stepIcons.length - 1 && (
                  <div
                    className={`hidden sm:block w-8 sm:w-12 h-0.5 ml-4 sm:ml-6 transition-colors duration-300 ${
                      stepNumber < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Content - Fixed Height Container */}
      <div className="relative h-auto min-h-0">
        <div ref={contentRef} className="overflow-hidden transition-[height] duration-500 ease-in-out">
          <div
            className={`flex items-start transition-transform duration-500 ease-in-out w-full `}
            style={{
              transform: `translateX(-${(currentStep - 1) * 100}%)`,
            }}
          >
            {/* Step 1: Personal Information */}
            <div ref={stepRefs[0]} className="w-full flex-shrink-0 min-h-0">
              <PersonalInfoStep
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
                isLoading={isLoading}
                onNext={handleNext}
              />
            </div>

            {/* Step 2: Professional Profile */}
            <div ref={stepRefs[1]} className="w-full flex-shrink-0 min-h-0">
              <ProfileInfoStep
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
                isLoading={isLoading}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            </div>

            {/* Step 3: Service Details */}
            <div ref={stepRefs[2]} className="w-full flex-shrink-0 min-h-0">
              <ServiceDetailsStep
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
                isLoading={isLoading}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckerRegistrationForm