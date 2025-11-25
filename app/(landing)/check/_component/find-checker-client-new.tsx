"use client"

import { useEffect, useState, useCallback } from "react"
import CheckerSearchBox from "./checker-search-box"
//import CheckerSidebar from "./checker-sidebar"
import CheckerTopFilter from "./checker-top-filter"
import CheckerResults from "./checker-results"
//import CheckerPagination from "./checker-pagination"
import LoadingComponent from "./loading-compoent"
import CheckerSidebar from "./checker-sidebar-new"
import CheckerPagination from "./checker-pagination-new"

interface Checker {
  id: number
  name: string
  profileImage: string
  rating: number
  reviews: number
  experience: string
  specialties: string[]
  location: {
    country: string
    city: string
    region: string
  }
  coverageArea: string
  languages: string[]
  price: number
  responseTime: string
  description: string
  verified: boolean
  completedChecks: number
}

interface FindCheckerClientProps {
  initialCountry?: string
  initialCity?: string
  initialAccommodation?: string
}

export default function FindCheckerClient({
  initialCountry = "",
  initialCity = "",
  initialAccommodation = "",
}: FindCheckerClientProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<Checker[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    country: initialCountry,
    city: initialCity,
    accommodation: initialAccommodation,
    minRating: 0,
    priceMin: 0,
    priceMax: 10000,
  })

  const fetchCheckers = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        country: filters.country,
        city: filters.city,
        accommodation: filters.accommodation,
        page: currentPage.toString(),
        limit: "20",
        minRating: filters.minRating.toString(),
        priceMin: filters.priceMin.toString(),
        priceMax: filters.priceMax.toString(),
      })

      const response = await fetch(`/api/find-checker?${params}`)
      const data = await response.json()
      console.log("serevr data :", data)
      setSearchResults(data.data || [])
      setTotalResults(data.total || 0)
    } catch (error) {
      console.error("Error fetching checkers:", error)
      setSearchResults([])
      setTotalResults(0)
    } finally {
      setIsLoading(false)
    }
  }, [filters, currentPage])
// Initial load - ALWAYS fetch on component mount
  useEffect(() => {
    fetchCheckers()
  }, [])
  
  // Initial load when component mounts or initial params change
  //Fetch when filters change (but not on initial mount)
  useEffect(() => {
    setCurrentPage(1)
    fetchCheckers()
  }, [filters])

  // Fetch when page changes
  useEffect(() => {
    fetchCheckers()
  }, [currentPage])

  // Fetch when page changes
  useEffect(() => {
    if (filters.country || filters.city) {
      fetchCheckers()
    }
  }, [currentPage])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getLocationString = () => {
    if (filters.city && filters.country) {
      return `${filters.city}, ${filters.country}`
    } else if (filters.country) {
      return filters.country
    }
    return "Worldwide"
  }

  const getPageTitle = () => {
    if (filters.country && filters.city && filters.accommodation) {
      return `${filters.accommodation.charAt(0).toUpperCase() + filters.accommodation.slice(1)} Checkers in ${filters.city.charAt(0).toUpperCase() + filters.city.slice(1)}, ${filters.country.charAt(0).toUpperCase() + filters.country.slice(1)}`
    } else if (filters.country && filters.city) {
      return `Accommodation Checkers in ${filters.city.charAt(0).toUpperCase() + filters.city.slice(1)}, ${filters.country.charAt(0).toUpperCase() + filters.country.slice(1)}`
    } else if (filters.country) {
      return `Accommodation Checkers in ${filters.country.charAt(0).toUpperCase() + filters.country.slice(1)}`
    }
    return "Find Your Perfect Accommodation Checker"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Search Section */}
      <section className="pt-32 pb-16 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900">{getPageTitle()}</h1>
            {filters.country && (
              <p className="text-lg text-gray-600 mt-2">
                Showing results for {filters.city ? `${filters.city}, ` : ""}
                {filters.country}
                {filters.accommodation && ` - ${filters.accommodation}`}
              </p>
            )}
            {!filters.country && (
              <p className="text-lg text-gray-600 mt-2">
                Connect with verified local experts to check accommodations worldwide
              </p>
            )}
          </div>
          <CheckerSearchBox
            initialCountry={initialCountry}
            initialCity={initialCity}
            initialAccommodation={initialAccommodation}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Sidebar */}
            <div className="xl:w-1/4">
              <div className="hidden xl:block">
                <CheckerSidebar onFilterChange={handleFilterChange} />
              </div>

              {/* Mobile Sidebar */}
              <div className="xl:hidden">
                <button
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium mb-4"
                  onClick={() => {
                    const sidebar = document.getElementById("mobile-sidebar")
                    sidebar?.classList.toggle("hidden")
                  }}
                >
                  Show Filters
                </button>
                <div id="mobile-sidebar" className="hidden">
                  <CheckerSidebar onFilterChange={handleFilterChange} />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="xl:w-3/4">
              {!isLoading && <CheckerTopFilter totalResults={totalResults} location={getLocationString()} />}

              <div className="mt-8">
                {isLoading ? <LoadingComponent /> : <CheckerResults checkers={searchResults} />}
              </div>

              {!isLoading && searchResults.length > 0 && (
                <CheckerPagination
                  totalResults={totalResults}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
