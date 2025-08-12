"use client"
import Image from 'next/image'
import React from 'react'
import MainFilter from './main-filtersearchbox'


const MainHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          alt="Checkerist" 
          src="/img/hero/bg.webp" 
          fill 
          sizes="100vw"
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020924e5] via-[#0510367e] to-[#2c396686]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 pt-16 md:pt-20">
        <div className="w-full max-w-6xl">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                  Verify Before You Travel
                </h1>
                <p className="text-sm text-white/90 sm:text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed">
                  Connect with professional local checkers who physically verify hotels and restaurants before you book. No surprises, just perfect stays.
                </p>
              </div>
              
              {/* Search Filter */}
              <div className="mt-8 md:mt-16">
                <MainFilter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainHero
