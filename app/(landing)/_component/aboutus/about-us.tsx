import Image from "next/image"

export default function AboutUsSection() {
  return (
    <section id='about' className="py-8 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="lg:pr-8">
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6">
              About Our Platform
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Your trusted partner for safe accommodation verification
            </p>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                We connect travelers with verified accommodation checkers who ensure your 
                booking is safe, legitimate, and exactly as advertised before you commit 
                to your stay.
              </p>
              <p>
                Our platform provides peace of mind by having local experts verify 
                properties, check safety standards, and guarantee that your accommodation 
                meets all expectations. From hotels to vacation rentals, we ensure every 
                detail is confirmed before your arrival.
              </p>
              <p>
                Take advantage of our comprehensive verification service that includes 
                property inspection, safety assessment, and authenticity confirmation, 
                giving you confidence in every booking decision.
              </p>
            </div>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">4,958</div>
                <div className="text-sm text-gray-500">Verified Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">2,869</div>
                <div className="text-sm text-gray-500">Active Checkers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">2M</div>
                <div className="text-sm text-gray-500">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">574,974</div>
                <div className="text-sm text-gray-500">Verifications</div>
              </div>
            </div>
          </div>
          
          {/* Image Column */}
          <div className="lg:order-last">
            <div className="relative">
              <Image
                width={600}
                height={400}
                src="/img/aboutus/2.png"
                alt="Happy travelers celebrating safe accommodation"
                className="rounded-2xl w-full h-auto object-cover shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
