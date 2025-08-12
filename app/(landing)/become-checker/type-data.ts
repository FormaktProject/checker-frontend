export interface FormData {
  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string

  // Profile Info
  bio: string
  professionalDescription: string
  yearsOfExperience: number
  businessAddress: string
  city: string

  // Service Details
  responseTime: string
  expertiseAreas: string[]
  availability: string
}

export interface ValidationErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  bio?: string
  professionalDescription?: string
  yearsOfExperience?: string
  businessAddress?: string
  city?: string
  responseTime?: string
  expertiseAreas?: string
  availability?: string
}

export interface StepProps {
  formData: FormData
  errors: ValidationErrors
  updateFormData: (field: keyof FormData, value: any) => void
  isLoading: boolean
  onNext: () => void
  onPrevious?: () => void
}