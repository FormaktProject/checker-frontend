"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';

const PopularCheckers = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const checkers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialization: "Hotels & Resorts",
      image: "/img/checker/5.png",
      verificationsCount: "1,234 verifications",
      skills: ["Luxury Hotels", "Resort Amenities", "Service Quality"]
    },
    {
      id: 2,
      name: "Marcus Chen",
      specialization: "Vacation Rentals",
      image: "/img/checker/6.png",
      verificationsCount: "987 verifications",
      skills: ["Airbnb", "Property Safety", "Cleanliness Standards"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      specialization: "Business Travel",
      image: "/img/checker/4.png",
      verificationsCount: "2,156 verifications",
      skills: ["Corporate Hotels", "Meeting Facilities", "WiFi & Tech"]
    },
    {
      id: 4,
      name: "David Thompson",
      specialization: "Budget Accommodations",
      image: "/img/checker/3.png",
      verificationsCount: "1,567 verifications",
      skills: ["Hostels", "Budget Hotels", "Value Assessment"]
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      {checkers.map((checker, index) => (
        <div 
          key={checker.id}
          className={`group cursor-pointer transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="relative overflow-hidden  w-full h-64 rounded-xl">
            <Image
              src={checker.image || "/placeholder.svg"}
              alt={checker.name}
              quality={90}
              sizes='864px'
              fill
              priority
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">{checker.name}</h3>
              <p className="text-sm opacity-90">{checker.specialization}</p>
              <p className="text-xs opacity-75 mt-1">{checker.verificationsCount}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {checker.skills.slice(0, 2).map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {checker.skills.length > 2 && (
                  <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                    +{checker.skills.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularCheckers;