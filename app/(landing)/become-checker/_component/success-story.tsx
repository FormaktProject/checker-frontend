"use client"

import { ArrowRight, CheckCircle, Clock, DollarSign, Globe, Star, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
const checker=  {
      id: 4,
      name: "David Thompson",
      specialization: "Budget Accommodations",
      image: "/img/checker/3.png",
      verificationsCount: "1,567 verifications",
      skills: ["Hostels", "Budget Hotels", "Value Assessment"]
    }
const SuccessStorySection = () => {
  const [activeWeek, setActiveWeek] = useState(0)
  const journeyTimeline = [
    { week: "Week 1", earnings: "$150", checks: "3", label: "First Steps", description: "Joined as Early Checker, first local properties" },
    { week: "Week 2", earnings: "$350", checks: "6", label: "Building Momentum", description: "Got first repeat clients and referrals" },
    { week: "Week 3", earnings: "$580", checks: "11", label: "Growing Fast", description: "Expanded to nearby neighborhoods" },
    { week: "Week 4", earnings: "$900", checks: "18", label: "First Month Success", description: "Built solid client base in local area" },
  ]
  const achievements = [
    { icon: DollarSign, value: "$900", label: "Monthly Income", color: "text-emerald-600" },
    { icon: CheckCircle, value: "42+", label: "Properties Checked", color: "text-blue-600" },
    { icon: Users, value: "15+", label: "Happy Clients", color: "text-purple-600" },
    { icon: Globe, value: "3", label: "Neighborhoods", color: "text-orange-600" },
  ]
  const earlyCheckerBenefits = [
    { icon: Star, value: "1 Year Free", label: "Zero Platform Fees", color: "text-yellow-500" },
    { icon: TrendingUp, value: "0% Commission", label: "Keep 100% Earnings", color: "text-green-600" },
    { icon: CheckCircle, value: "Top List", label: "Priority Placement", color: "text-blue-600" },
    { icon: Users, value: "Recommended", label: "Extra Service Badges", color: "text-purple-600" },
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWeek((prev) => (prev + 1) % journeyTimeline.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
            <Star className="h-4 w-4 text-green-600 mr-2 fill-current" />
            <span className="text-green-700 font-semibold text-sm">Featured Success Story</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            From Zero to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">$900 in 4 Weeks</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            How David Thompson became an <strong>Early Checker</strong> and built steady income with exclusive Checkerist benefits
          </p>
        </div>

        {/* Main Story Card */}
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="grid md:grid-cols-2 gap-8 p-4 md:p-12">
            {/* Left: Profile & Story */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    <Image
                     src={`${checker.image}`}
                     alt={`${checker.name}`}
                     sizes="100%"
                     fill
                     priority
                     className=" rounded-full  object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{checker.name}</h3>
                  <p className="text-gray-600">Professional Accommodation Checker</p>
                  <span className="text-green-600 text-base">Verified</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed italic">
                  I joined Checkerist as an Early Checker and couldn&apos;t believe the benefits.I found extra side money in travel services. 
                  I earned $900 by checking properties in my neighborhood. The platform made it so easy to start, and clients keep coming back because I&apos;m featured as a recommended checker.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-gray-900">Why John Became an Early Checker:</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 rounded-full p-2 mr-3 mt-1">
                      <DollarSign className="h-4 w-4 text-yellow-600 fill-current" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">1 Year Free commission</p>
                      <p className="text-sm text-gray-600">Keep 100% of your earnings - no hidden fees or commissions</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-3 mt-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Allowing extra earnings</p>
                      <p className="text-sm text-gray-600">Unlock extra services. Unlock extra income.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-3 mt-1">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Top List Placement</p>
                      <p className="text-sm text-gray-600">Featured at the top of search results - get more jobs faster</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 rounded-full p-2 mr-3 mt-1">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Recommended Badge</p>
                      <p className="text-sm text-gray-600">Exclusive Recommended Checker badge attracts premium clients</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Quick Stats */}
             
            </div>

            {/* Right: Stats & Timeline */}
            <div className="space-y-6">
              
              {/* Interactive Weekly Timeline */}
              <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl p-6 text-white">
                <h4 className="font-semibold text-lg mb-4">First Month Weekly Progress</h4>
                <div className="space-y-3">
                  {journeyTimeline.map((milestone, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveWeek(index)}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                        activeWeek === index
                          ? "bg-white/20 scale-105 shadow-lg"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{milestone.week}</span>
                        <span className="text-green-400 font-bold">{milestone.earnings}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{milestone.label}</span>
                        <span className="text-gray-400">{milestone.checks} checks</span>
                      </div>
                      {activeWeek === index && (
                        <p className="text-xs text-gray-300 mt-2 animate-fade-in">{milestone.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-teal-300 via-teal-500 to-teal-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Star className="h-5 w-5 mr-2 fill-current" />
              <span className="font-bold">Limited Early Checker Spots Available</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold mb-4">
              Become an Early Checker Like David
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                Register as Early Checker
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
export default SuccessStorySection