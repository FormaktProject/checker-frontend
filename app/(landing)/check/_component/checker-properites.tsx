"use client"
import Image from 'next/image';
import { Star, MapPin, Heart, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const CheckerProperties = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const checkers = [
    {
      id: 1,
      name: "Grand Hotel Palace Checker",
      location: "Paris, France",
      type: "Hotel",
      images: [
        "/placeholder.svg?height=250&width=250",
        "/placeholder.svg?height=250&width=250",
        "/placeholder.svg?height=250&width=250"
      ],
      rating: 4.8,
      reviews: 3014,
      price: 299,
      originalPrice: 399,
      description: "Luxury Suite with City View",
      details: "1 extra-large double bed",
      amenities: ["Breakfast", "WiFi", "Spa", "Bar"],
      cancellation: "Free cancellation",
      distance: "2 km to city center"
    },
    {
      id: 2,
      name: "Bistro Le Marais Checker",
      location: "Lyon, France",
      type: "Restaurant",
      images: [
        "/placeholder.svg?height=250&width=250",
        "/placeholder.svg?height=250&width=250",
        "/placeholder.svg?height=250&width=250"
      ],
      rating: 4.9,
      reviews: 1567,
      price: 85,
      originalPrice: 120,
      description: "Fine Dining Experience",
      details: "3-course tasting menu",
      amenities: ["Wine Pairing", "Terrace", "Private Dining", "Valet"],
      cancellation: "Free cancellation",
      distance: "1.5 km to city center"
    },
    {
      id: 3,
      name: "Villa Tuscany Checker",
      location: "Florence, Italy",
      type: "House",
      images: [
        "/placeholder.svg?height=250&width=250",
        "/placeholder.svg?height=250&width=250",
        "/placeholder.svg?height=250&width=250"
      ],
      rating: 4.7,
      reviews: 892,
      price: 450,
      originalPrice: 600,
      description: "Traditional Tuscan Villa",
      details: "4 bedrooms, 3 bathrooms",
      amenities: ["Pool", "Garden", "Kitchen", "Parking"],
      cancellation: "Free cancellation",
      distance: "5 km to city center"
    },
    {
      id: 4,
      name: "Modern Apartment Checker",
      location: "Barcelona, Spain",
      type: "Apartment",
      images: [
        "/placeholder.svg?height=250&width=250",
        "/placeholder.svg?height=250&width=250",
        "/placeholder.svg?height=250&width=250"
      ],
      rating: 4.6,
      reviews: 2341,
      price: 180,
      originalPrice: 240,
      description: "City Center Apartment",
      details: "2 bedrooms, 1 bathroom",
      amenities: ["WiFi", "Kitchen", "Balcony", "AC"],
      cancellation: "Free cancellation",
      distance: "0.5 km to city center"
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {checkers.map((checker) => (
        <div key={checker.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image Carousel */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={checker.images[0] || "/placeholder.svg"}
                      alt={checker.name}
                      width={250}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <button
                    onClick={() => toggleFavorite(checker.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        favorites.includes(checker.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {checker.name}
                        </h3>
                        <div className="flex items-center text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {checker.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {checker.location}
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 underline">
                        Show on map
                      </button>
                      <span>•</span>
                      <span>{checker.distance}</span>
                    </div>

                    <div className="mb-4">
                      <div className="font-medium text-gray-900">{checker.description}</div>
                      <div className="text-sm text-gray-600">{checker.details}</div>
                    </div>

                    <div className="mb-4">
                      <div className="font-medium text-green-600 text-sm">{checker.cancellation}</div>
                      <div className="text-sm text-gray-600">
                        You can cancel later, so lock in this great price today.
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {checker.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and Rating */}
                  <div className="lg:w-48 lg:text-right mt-4 lg:mt-0">
                    <div className="flex lg:flex-col lg:items-end items-center justify-between lg:justify-start gap-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Exceptional</div>
                          <div className="text-sm text-gray-600">{checker.reviews.toLocaleString()} reviews</div>
                        </div>
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-semibold">
                          {checker.rating}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">8 nights, 2 adults</div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            US${checker.price}
                          </span>
                          {checker.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              US${checker.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          +US$28 taxes and charges
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                          Check Availability
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </button>
                      </div>
                    </div>
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

export default CheckerProperties;
