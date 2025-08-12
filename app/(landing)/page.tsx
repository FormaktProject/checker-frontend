import React from 'react'
import MainHero from './_component/hero'
import PopularDestinations from './_component/populardestnation'
import AddBanner from './_component/add-banner'
import TestimonialSection from './_component/testemonial-section'
import Footer from './_component/footer'
import FeaturesSection from './_component/recomanded-hotel'
import AboutUsSection from './_component/aboutus/about-us'
import ContactSection from './_component/contact/contact-section'

const HomePage = () => {
  return (
    <div className=' h-full'>
      {/** hero compoent */}
      <MainHero/>
      {/* Popular Destinations Section */}
      <section className="py-16 lg:py-24" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-16">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Popular Checkers
              </h2>
              <p className="text-lg text-gray-600">
                These popular checkers have a lot to offer
              </p>
            </div>
            <div className="hidden md:block">
              <button className="bg-blue-50 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center">
                Find checker
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-10 sm:mt-8">
            <PopularDestinations />
          </div>
        </div>
      </section>

      {/* Add Banner Section */}
      
          <AddBanner />
      

      {/* Recommended Hotels Section */}
      <FeaturesSection/>

      <AboutUsSection/>

      {/* Testimonial Section */}
      <section className="py-10 mt-10 lg:py-15 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialSection />
        </div>
      </section>

      {/* Blog Section 
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get inspiration for your next trip
            </h2>
            <p className="text-lg text-gray-600">
              Interdum et malesuada fames
            </p>
          </div>
          <BlogSection />
        </div>
      </section>*/}

      {/* Destinations We Love Section 
      <section className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Destinations we love
            </h2>
            <p className="text-lg text-gray-600">
              Interdum et malesuada fames ac ante ipsum
            </p>
          </div>
          <DestinationsWeLove />
        </div>
      </section>

      <CallToActions />*/}
      <ContactSection/>
      <Footer />
    </div>
  )
}

export default HomePage
