"use client"
import { ArrowRight, CheckCircle, Clock, DollarSign, Globe, Play, Shield, Star, TrendingUp, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import HowItWorksSection from './how-it-work'
import CheckerFaq from './faq'
import CheckerRegistrationForm from './checker-register'
import SuccessStorySection from './success-story'

const MainRegister = () => {
     const [isVisible, setIsVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { icon: DollarSign, value: "$50-200", label: "Daily Earnings", color: "text-green-600" },
    { icon: Users, value: "15,000+", label: "Active Experts", color: "text-blue-600" },
    { icon: Globe, value: "180+", label: "Countries", color: "text-purple-600" },
    { icon: Star, value: "4.9/5", label: "Expert Rating", color: "text-yellow-600" },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "High Earning Potential",
      description: "Earn $50-200 per day checking accommodations and guiding tourists",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work when you want, where you want. Perfect for digital nomads",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Get paid safely and on time through our secure payment system",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Growing Demand",
      description: "Join the fastest-growing segment in the travel industry",
      color: "bg-orange-50 text-orange-600",
    },
  ]
  return (
    <div className='h-full bg-white'>
              {/** Register form */}
        <section className="flex items-center justify-center py-10 bg-gray-900/95">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column - Content */}
              <div
                className={`text-white transition-all p-6 duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"} flex flex-col justify-center`}
              >
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full text-green-300 text-sm font-medium">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    #1 Platform for Travel Checkers
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Earn Money as a
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                    Checker
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                  Join thousands of professionals earning <strong className="text-green-400">$50-200/day</strong> by
                  guiding tourists and checking accommodations worldwide
                </p>
                {/* Key Benefits */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>1 Year Free Access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>Recommended Badge</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>0% Commission Forever</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>Top List Placement</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                  >
                     Become Early Checker
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  
                </div>              
              </div>

              {/* Right Column - Form */}
              <div
                className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"} flex items-start justify-center lg:justify-end`}
              >
                <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8">
                  <CheckerRegistrationForm />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/** How it work */}
        <HowItWorksSection/>
        
        <SuccessStorySection/>
        <section className='bg-white mt-10 py-10 md:py-15  px-4'>
             <div className=' text-lg flex items-center justify-center p-8 md:p-10 '>
                <h2 className=' text-gray-950/95 text-lg md:text-3xl font-bold text-center'>Frequently Asked Questions</h2>
             </div>
            <CheckerFaq/>
        </section>
      </div>
  )
}

export default MainRegister
