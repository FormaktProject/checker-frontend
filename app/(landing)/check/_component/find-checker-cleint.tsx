"use client";

import { useEffect, useState } from 'react';
import CheckerSearchBox from './checker-search-box';
import CheckerSidebar from './checker-sidebar';
import CheckerTopFilter from './checker-top-filter';
import CheckerResults from './checker-results';
import CheckerPagination from './checker-pagination';
import { initialCheckers } from '@/app/static-data';
import LoadingComponent from './loading-compoent';


interface FindCheckerClientProps {
  initialCountry?: string;
  initialCity?: string;
  initialAccommodation?: string;
}


export default function FindCheckerClient({ 
  initialCountry = '', 
  initialCity = '', 
  initialAccommodation = '' 
}: FindCheckerClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(initialCheckers);
  const [totalResults, setTotalResults] = useState(initialCheckers.length);

  useEffect(() => {
    if (initialCountry) {
      performSearch();
    }
  }, [initialCountry, initialCity, initialAccommodation]);

  const performSearch = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter results based on URL parameters
    const filteredResults = getFilteredResults(initialCountry, initialCity, initialAccommodation);
    setSearchResults(filteredResults);
    setTotalResults(filteredResults.length);
    setIsLoading(false);
  };

  const getFilteredResults = (country: string, city: string, accommodation: string) => {
    return initialCheckers.filter(checker => {
      const matchesCountry = !country || checker.location.country.toLowerCase().includes(country.toLowerCase());
      const matchesCity = !city || checker.location.city.toLowerCase().includes(city.toLowerCase());
      const matchesAccommodation = !accommodation || checker.specialties.some(s => 
        s.toLowerCase().includes(accommodation.toLowerCase())
      );
      
      return matchesCountry && matchesCity && matchesAccommodation;
    });
  };

  const getLocationString = () => {
    if (initialCity && initialCountry) {
      return `${initialCity}, ${initialCountry}`;
    } else if (initialCountry) {
      return initialCountry;
    }
    return 'Worldwide';
  };
  const getPageTitle = () => {
    if (initialCountry && initialCity && initialAccommodation) {
      return `${initialAccommodation.charAt(0).toUpperCase() + initialAccommodation.slice(1)} Checkers in ${initialCity.charAt(0).toUpperCase() + initialCity.slice(1)}, ${initialCountry.charAt(0).toUpperCase() + initialCountry.slice(1)}`;
    } else if (initialCountry && initialCity) {
      return `Accommodation Checkers in ${initialCity.charAt(0).toUpperCase() + initialCity.slice(1)}, ${initialCountry.charAt(0).toUpperCase() + initialCountry.slice(1)}`;
    } else if (initialCountry) {
      return `Accommodation Checkers in ${initialCountry.charAt(0).toUpperCase() + initialCountry.slice(1)}`;
    }
    return 'Find Your Perfect Accommodation Checker';
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Search Section */}
      <section className="pt-32 pb-16 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
            {initialCountry && (
              <p className="text-lg text-gray-600 mt-2">
                Showing results for {initialCity ? `${initialCity}, ` : ''}{initialCountry}
                {initialAccommodation && ` - ${initialAccommodation}`}
              </p>
            )}
            {!initialCountry && (
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
                <CheckerSidebar />
              </div>
              
              {/* Mobile Sidebar */}
              <div className="xl:hidden">
                <button
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium mb-4"
                  onClick={() => {
                    const sidebar = document.getElementById('mobile-sidebar');
                    sidebar?.classList.toggle('hidden');
                  }}
                >
                  Show Filters
                </button>
                <div id="mobile-sidebar" className="hidden">
                  <CheckerSidebar />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="xl:w-3/4">
              {!isLoading && (
                <CheckerTopFilter 
                  totalResults={totalResults}
                  location={getLocationString()}
                />
              )}
              
              <div className="mt-8">
                {isLoading ? (
                  <LoadingComponent />
                ) : (
                  <CheckerResults checkers={searchResults} />
                )}
              </div>
              
              {!isLoading && searchResults.length > 0 && (
                <CheckerPagination totalResults={totalResults} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
