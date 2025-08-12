"use client"
import React, { useState, useEffect } from 'react';
import { MapPin, Hotel, Users, CheckCircle, ArrowRight } from 'lucide-react';

const AnimatedHowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      step: "01",
      title: "Choose Destination",
      description: "Select your travel destination from our global network of verified checkers",
      icon: <MapPin className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500",
      bgPattern: "bg-gradient-to-br from-cyan-50 to-blue-50",
    },
    {
      step: "02",
      title: "Fill Accommodation Details",
      description: "Provide hotel name, link, or specific requirements for verification",
      icon: <Hotel className="w-8 h-8" />,
      color: "from-blue-500 to-purple-500",
      bgPattern: "bg-gradient-to-br from-blue-50 to-purple-50",
    },
    {
      step: "03",
      title: "Connect with Checker",
      description: "Get matched with a professional local checker in your destination",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      bgPattern: "bg-gradient-to-br from-purple-50 to-pink-50",
    },
    {
      step: "04",
      title: "Get Verified Stay",
      description: "Receive detailed verification report with photos, videos, and recommendations",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-pink-500 to-red-500",
      bgPattern: "bg-gradient-to-br from-pink-50 to-red-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white ">
      {/* Animated background elements */}
     

      <section className="py-8 lg:py-10 border-t shadow-lg border-slate-200  relative z-10">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              How It{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get verified accommodation insights in 4 simple steps
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative ">
            {steps.map((item, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-700 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } ${
                  activeStep === index ? 'scale-105 z-10' : 'hover:scale-105'
                }`}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  transitionDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Card */}
                <div className={`
                  relative overflow-hidden rounded-3xl p-8 text-center h-full
                  bg-white shadow-lg border border-gray-100
                  transition-all duration-500 hover:shadow-2xl
                  ${activeStep === index ? 'shadow-2xl border-gray-200' : ''}
                  ${item.bgPattern}
                `}>
                  
                  {/* Animated background glow */}
                  <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-r ${item.color} blur-3xl -z-10 scale-150
                  `}></div>

                  {/* Icon */}
                  <div className={`
                    relative w-20 h-20 bg-gradient-to-r ${item.color} 
                    rounded-2xl flex items-center justify-center mx-auto mb-6 text-white
                    transition-all duration-500 group-hover:rotate-6 group-hover:scale-110
                    shadow-lg hover:shadow-xl
                    ${activeStep === index ? '' : ''}
                  `}>
                    <div className="relative z-10">
                      {item.icon}
                    </div>
                    {/* Icon glow effect */}
                    <div className={`
                      absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color}
                      opacity-50 blur-lg scale-110
                    `}></div>
                  </div>

                  {/* Step number */}
                  <div className={`
                    text-8xl font-bold mb-4 transition-all duration-500
                    ${activeStep === index ? 'text-gray-300 scale-110' : 'text-gray-200'}
                  `}>
                    {item.step}
                  </div>

                  {/* Content */}
                  <h3 className={`
                    text-xl font-bold mb-4 transition-colors duration-300
                    ${activeStep === index ? 'text-gray-900' : 'text-gray-800'}
                  `}>
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.description}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60 animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"></div>
                </div>

                {/* Animated Arrow */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className={`
                      w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200
                      flex items-center justify-center transition-all duration-500
                      ${activeStep === index || activeStep === index + 1 ? 'scale-110 bg-gradient-to-r from-cyan-500 to-purple-500 text-white animate-pulse' : 'text-gray-400'}
                    `}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${activeStep === index 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                  }
                `}
              />
            ))}
          </div>

          {/* Floating elements */}
          <div className="absolute top-1/4 left-10 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-3/4 right-20 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-40 animate-bounce" style={{animationDelay: '2.5s'}}></div>
        </div>
      </section>
    </div>
  );
};

export default AnimatedHowItWorks;