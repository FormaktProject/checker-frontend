"use client"
import Image from 'next/image';
import { Star, MapPin, Clock, MessageCircle, Shield, Globe, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Checker {
  id: number;
  name: string;
  profileImage: string;
  rating: number;
  reviews: number;
  experience: string;
  specialties: string[];
  location: {
    country: string;
    city: string;
    region: string;
  };
  coverageArea: string;
  languages: string[];
  price: number;
  responseTime: string;
  description: string;
  verified: boolean;
  completedChecks: number;
}

interface CheckerResultsProps {
  checkers: Checker[];
}

const CheckerResults = ({ checkers }: CheckerResultsProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  if (checkers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No checkers found for your search criteria</div>
        <p className="text-gray-400">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {checkers.map((checker) => (
        <div key={checker.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Profile Section */}
              <div className="lg:w-40 flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 mx-auto lg:mx-0">
                    <Image
                      src={checker.profileImage || "/placeholder.svg"}
                      alt={checker.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  {checker.verified && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 lg:left-24 lg:transform-none">
                      <div className="bg-green-500 text-white rounded-full p-1">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {checker.name}
                          {checker.verified && (
                            <span className="ml-2 text-green-600 text-sm font-medium">Verified</span>
                          )}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {checker.location.city}, {checker.location.country}
                          </div>
                          
                        </div>
                      </div>
                    </div>

                    {/* Rating and Reviews 
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(checker.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {checker.rating}
                        </span>
                        <span className="ml-1 text-sm text-gray-600">
                          ({checker.reviews} reviews)
                        </span>
                      </div>
                      <div className="ml-4 text-sm text-gray-600">
                        {checker.completedChecks} completed checks
                      </div>
                    </div>*/}

                    {/* Description */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {checker.description}
                    </p>

                    {/* Specialties 
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {checker.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>*/}

                    {/* Coverage Area and Languages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Coverage Area:</h4>
                        <p className="text-sm text-gray-600">{checker.coverageArea}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Languages:</h4>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {checker.languages.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" flex items-center gap-2.5">
                      <div className="flex items-center justify-center lg:justify-end text-sm text-gray-600">
                        <Shield className="h-4 w-4 mr-1 text-green-500" />
                        <span>Background verified</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-end text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-1 text-blue-500" />
                        <span>Identity confirmed</span>
                      </div>
                    </div>
                    {/* Response Time 
                    <div className="flex items-center text-sm text-green-600 mb-4">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span className="font-medium">Response time: {checker.responseTime}</span>
                    </div>*/}
                  </div>

                  {/* Price and Action Section */}
                  <div className="lg:w-48 lg:text-right mt-4 lg:mt-0">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-center lg:text-right">
                        <div className="text-sm text-gray-600 mb-1">Starting from</div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          ${checker.price}
                        </div>
                        <div className="text-sm text-gray-600 mb-4">per check</div>
                        
                        <div className="space-y-3">
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact Checker
                          </button>
                          
                          <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckerResults;
