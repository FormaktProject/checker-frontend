"use client"
import { useState } from "react"
import type React from "react"

import { MapPin, Search, Star } from "lucide-react"

interface CheckerSidebarProps {
  onFilterChange?: (filters: any) => void
}

const CheckerSidebar = ({ onFilterChange }: CheckerSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDeals, setSelectedDeals] = useState<string[]>([])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)

  const deals = ["Free cancellation", "Reserve now, pay at stay", "Properties with special offers"]

  const popularFilters = ["Breakfast included", "Free WiFi", "Swimming pool", "Spa", "Fitness center", "Pet friendly"]

  const amenities = ["Air conditioning", "Restaurant", "Room service", "Parking", "Business center", "Concierge"]

  const handleDealChange = (deal: string) => {
    setSelectedDeals((prev) => (prev.includes(deal) ? prev.filter((d) => d !== deal) : [...prev, deal]))
  }

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const notifyFilterChange = () => {
    if (onFilterChange) {
      onFilterChange({
        priceMin: priceRange[0],
        priceMax: priceRange[1],
        minRating,
      })
    }
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number.parseInt(e.target.value)
    setPriceRange([priceRange[0], newPrice])
    setTimeout(notifyFilterChange, 100)
  }

  const handleRatingChange = (rating: number) => {
    setMinRating(rating)
    setTimeout(notifyFilterChange, 100)
  }

  return (
    <div className="space-y-8">
      {/* Map */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="bg-blue-100 rounded-lg h-48 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Interactive Map</p>
            <button className="text-blue-600 text-sm font-medium mt-1">Show on map</button>
          </div>
        </div>
      </div>

      {/* Search by property name */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h5 className="text-lg font-medium text-gray-900 mb-4">Search by property name</h5>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="e.g. Best Western"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Deals */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h5 className="text-lg font-medium text-gray-900 mb-4">Deals</h5>
        <div className="space-y-3">
          {deals.map((deal) => (
            <label key={deal} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedDeals.includes(deal)}
                onChange={() => handleDealChange(deal)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm text-gray-700">{deal}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Popular Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h5 className="text-lg font-medium text-gray-900 mb-4">Popular Filters</h5>
        <div className="space-y-3">
          {popularFilters.map((filter) => (
            <label key={filter} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFilters.includes(filter)}
                onChange={() => handleFilterChange(filter)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm text-gray-700">{filter}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h5 className="text-lg font-medium text-gray-900 mb-4">Nightly Price</h5>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>$1000+</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h5 className="text-lg font-medium text-gray-900 mb-4">Star Rating</h5>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3, 4].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`flex items-center justify-center py-2 px-3 border rounded-lg transition-colors duration-200 ${
                minRating === rating
                  ? "bg-blue-50 border-blue-500"
                  : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center">
                {[...Array(rating + 1)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h5 className="text-lg font-medium text-gray-900 mb-4">Amenities</h5>
        <div className="space-y-3">
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="ml-3 text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CheckerSidebar
