"use client"
import { Plane, Shield, Clock, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

const BlockGuide = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('block-guide');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Plane,
      title: "Best Travel Guide",
      description: "Expert travel guides to help you plan your perfect trip"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your safety is our priority with secure booking and payments"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your travel needs"
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      description: "We guarantee the best prices for your travel bookings"
    }
  ];

  return (
    <div 
      id="block-guide"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <div 
            key={index}
            className={`text-center group transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors duration-300">
              <IconComponent className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BlockGuide;
