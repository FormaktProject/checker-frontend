"use client"

import { useState, useEffect } from "react"
import { UserPlus, Settings, Calendar, ArrowRight } from "lucide-react"

const HowItWorksSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("how-it-works")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      id: 1,
      icon: UserPlus,
      no: "01",
      title: "Sign up",
      description: "Create your expert profile in just 3 minutes",
      color: "bg-blue-500",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      icon: Settings,
      no: "02",
      title: "Add your services",
      description: "Set your expertise areas and availability",
      color: "bg-green-500",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      icon: Calendar,
      no: "03",
      title: "Get connected",
      description: "Start earning from day one with instant checking",
      color: "bg-purple-500",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start earning as a travel expert in three simple steps
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={step.id} className="flex flex-col lg:flex-row items-center">
                {/* Step Card */}
                <div
                  className={`
                    relative group transition-all duration-700 transform
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  `}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col items-center text-center max-w-xs">
                    {/* Icon Container */}
                    <div
                      className={`relative w-32 h-32 ${step.iconBg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-12 w-12 ${step.iconColor}`} />

                      {/* Step Number Badge */}
                      <div
                        className={`absolute -top-2 -right-2 w-10 h-10 ${step.color} rounded-full flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-white font-bold text-sm">{step.no}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                    hidden lg:block mx-8 transition-all duration-700
                    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
                  `}
                    style={{ transitionDelay: `${index * 200 + 100}ms` }}
                  >
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden my-6">
                    <div className="w-px h-12 bg-gray-200 mx-auto"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
       
      </div>
    </section>
  )
}

export default HowItWorksSection
