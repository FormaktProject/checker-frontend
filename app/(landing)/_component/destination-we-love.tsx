"use client"
import { useState, useEffect } from 'react';

const DestinationsWeLove = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('europe');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('destinations-we-love');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: 'europe', name: 'Europe', count: 156 },
    { id: 'asia', name: 'Asia', count: 234 },
    { id: 'america', name: 'America', count: 189 },
    { id: 'africa', name: 'Africa', count: 67 }
  ];

  const destinations = {
    europe: ['Paris', 'London', 'Rome', 'Barcelona', 'Amsterdam', 'Prague'],
    asia: ['Tokyo', 'Bangkok', 'Singapore', 'Seoul', 'Mumbai', 'Beijing'],
    america: ['New York', 'Los Angeles', 'Toronto', 'Mexico City', 'Buenos Aires', 'Rio'],
    africa: ['Cairo', 'Cape Town', 'Marrakech', 'Nairobi', 'Lagos', 'Tunis']
  };

  return (
    <div 
      id="destinations-we-love"
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.name} ({tab.count})
          </button>
        ))}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {destinations[activeTab as keyof typeof destinations].map((destination, index) => (
          <div
            key={destination}
            className={`bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <span className="text-gray-900 font-medium">{destination}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationsWeLove;
