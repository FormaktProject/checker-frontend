"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Mail, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

const SuccessStep = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setShowConfetti(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-8 text-center relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="h-12 w-12 text-green-600 animate-pulse" />
        </div>

        {/* Success Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Complete!</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Welcome to our network of professional checkers. Your application has been submitted successfully.
        </p>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email Confirmation</p>
                <p className="text-xs text-gray-600">Check your inbox for a confirmation email</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Review Process</p>
                <p className="text-xs text-gray-600">We&apos;ll review your application within 2-3 business days</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Account Activation</p>
                <p className="text-xs text-gray-600">Once approved, you&apos;ll receive login credentials</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/find-checker"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium 
                     rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
          >
            Browse Other Checkers
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

          <div>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium 
                       rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Return to Home
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Questions? Contact us at{" "}
            <a href="mailto:support@gotrip.com" className="text-blue-600 hover:text-blue-700">
              support@gotrip.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SuccessStep
