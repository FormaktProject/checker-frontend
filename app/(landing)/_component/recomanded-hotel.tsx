import React from 'react';
import { Shield, Zap, Globe, Camera, Award, Heart } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: "Verified Experts",
      description: "All checkers are thoroughly vetted professionals with years of hospitality experience and local knowledge."
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500" />,
      title: "Lightning Fast",
      description: "Get comprehensive verification reports within 24-48 hours of your request with real-time updates."
    },
    {
      icon: <Globe className="w-12 h-12 text-cyan-500" />,
      title: "Global Coverage",
      description: "Our checker network spans 75+ countries, covering destinations worldwide with local expertise."
    },
    {
      icon: <Camera className="w-12 h-12 text-emerald-500" />,
      title: "Visual Proof",
      description: "Receive detailed photo and video documentation of rooms, amenities, and surrounding areas."
    },
    {
      icon: <Award className="w-12 h-12 text-amber-500" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee with money-back policy if verification doesn't meet standards."
    },
    {
      icon: <Heart className="w-12 h-12 text-rose-500" />,
      title: "Personal Touch",
      description: "Human-verified insights with personal recommendations and insider tips from local experts."
    }
  ];

  return (
    <div className="min-h-screen  py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-slate-600 mb-8 leading-tight">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Checkerist
            </span>
            ?
          </h2>
          <p className="text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed">
            Our network of professional checkers ensures you never face accommodation disappointments again
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white  backdrop-blur-sm border border-blue-500 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon with animated background */}
                <div className="relative mx-auto mb-8 w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-100/5 rounded-2xl group-hover:scale-110 transition-transform duration-300" />
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold 
                text-slate-500 mb-6 group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 leading-relaxed text-lg group-hover:text-slate-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Subtle glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-20 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;