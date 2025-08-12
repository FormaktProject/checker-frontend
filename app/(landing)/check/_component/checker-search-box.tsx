"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Search, ChevronDown, X, MapPinHouseIcon } from 'lucide-react';
import data from '@/app/static-data';
import { slugify } from '@/hook/correct-rul';

interface CheckerSearchBoxProps {
  initialCountry?: string;
  initialCity?: string;
  initialAccommodation?: string;
}

const CheckerSearchBox = ({ 
  initialCountry = '', 
  initialCity = '', 
  initialAccommodation = '' 
}: CheckerSearchBoxProps) => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [accommodationSearch, setAccommodationSearch] = useState(initialAccommodation);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showAccommodationDropdown, setShowAccommodationDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const countryRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const accommodationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
      if (accommodationRef.current && !accommodationRef.current.contains(event.target as Node)) {
        setShowAccommodationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const countries = Object.keys(data)

  const getCitiesForCountry = (country: string) => {
 
    return data[country] || [];
  };

  const accommodationTypes = [
    'Hotels', 'Luxury Hotels', 'Budget Hotels', 'Boutique Hotels', 'Business Hotels',
    'Restaurants', 'Fine Dining', 'Casual Dining', 'Fast Food', 'Cafes',
    'Houses', 'Villas', 'Apartments', 'Condos', 'Vacation Rentals',
    'Hostels', 'Bed & Breakfast', 'Resorts', 'Motels', 'Guesthouses'
  ];

  const filteredAccommodations = accommodationTypes.filter(type =>
    type.toLowerCase().includes(accommodationSearch.toLowerCase())
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  // same logic for city and accommodation dropdowns
  const [isOpencity, setIsOpencity] = useState(false);
  const [searchTermcity, setSearchTermcity] = useState('');
  const [filteredcitys, setFilteredcitys] = useState(getCitiesForCountry(selectedCountry));
  const [highlightedIndexcity, setHighlightedIndexcity] = useState(-1);
  
  const dropdownRef :any = useRef(null);
  const inputRef :any = useRef(null);
  const listRef :any = useRef(null);
  // same logic for city and accommodation dropdowns
  const dropdownRefcity :any = useRef(null);
  const inputRefcity :any = useRef(null);
  const listRefcity :any = useRef(null);
  useEffect (()=>{
    if(selectedCountry.length>0){
      setFilteredcitys(getCitiesForCountry(selectedCountry))
    }
  },[selectedCountry])
  // Filter countries based on search term
  useEffect(() => {
    const filtered = countries.filter(country =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filtredcity = searchTermcity.length>0 ?  filteredcitys.filter(city => 
      city.toLowerCase().includes(searchTermcity.toLowerCase())
    ): getCitiesForCountry(selectedCountry);
    setFilteredCountries(filtered);
    setFilteredcitys(filtredcity);
    setHighlightedIndex(-1);
  }, [searchTerm, searchTermcity]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
      if (dropdownRefcity.current && !dropdownRefcity.current.contains(event.target)) {
        setIsOpencity(false);
        setSearchTermcity('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e:any) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
     
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
       
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleCountrySelect(filteredCountries[highlightedIndex]);
        }
   
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        inputRef.current?.blur();
        
        break;
    }
  };
const handleKeyDowncity = (e:any) => {
    if (!isOpencity) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
       
         setHighlightedIndexcity(prev => 
          prev < filteredcitys.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
       
         setHighlightedIndexcity(prev => prev > 0 ? prev - 1 : prev
        );
        break;
      case 'Enter':
        e.preventDefault();
      
        if (highlightedIndexcity >= 0) {
          handleCitySelect(filteredcitys[highlightedIndexcity]);
        }
        break;
      case 'Escape':
     
        setIsOpencity(false);
        setSearchTermcity('');
        inputRefcity.current?.blur()
        break;
    }
  };
  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
    if (highlightedIndexcity >= 0 && listRefcity.current) {
      const highlightedElementcity = listRefcity.current.children[highlightedIndexcity];
      if (highlightedElementcity) {
        highlightedElementcity.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex, highlightedIndexcity]);

  const handleCountrySelect = (country :string) => {
    setSelectedCountry(country);
    setFilteredcitys(getCitiesForCountry(selectedCountry))
    setSelectedCity('');
    setAccommodationSearch('');
    setIsOpen(false);
    setSearchTerm('');
  };
   const handleCitySelect = (city :string) => {
    setSelectedCity(city);
    setIsOpencity(false);
    setSearchTermcity('');
  };
  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      setIsOpen(true);
    }
  };
    const handleInputcityChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTermcity(value);
    if (value.length > 0) {
      setIsOpencity(true);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    
  };
  const handelInputFocusCity = ()=>{
    setIsOpencity(true)
  }

  const clearSelection = () => {
    setSelectedCountry('');
    setSelectedCity('');
    setAccommodationSearch('');
    setSearchTerm('');
    setSearchTermcity('')
    inputRef.current?.focus();
    inputRefcity.current?.focus();
  };


  const handleSearch = async () => {
    if (!selectedCountry) {
      alert('Please select a country');
      return;
    }

    setIsLoading(true);
    
    // Build URL based on selections
    let url = `/check/${slugify(selectedCountry)}`;
    if (selectedCity) {
      url += `/${slugify(selectedCity)}`;
    }
    if (accommodationSearch) {
      url += `/${accommodationSearch.toLowerCase().replace(/\s+/g, '-')}`;
    }

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    router.push(url);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Country Selection */}
        <div className="space-y-2" >
          <label className="text-sm font-medium text-gray-700 tracking-wide">
            Destination Country
          </label>
          
           <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  {selectedCountry ? (
                    <MapPin className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Search className="h-5 w-5 text-slate-400" />
                  )}
                </div>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm || selectedCountry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyDown={handleKeyDown}
                  placeholder={selectedCountry || "Search or select a country"}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm text-gray-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                />
                
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {selectedCountry && (
                    <button
                      onClick={clearSelection}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                    </button>
                  )}
                  <ChevronDown 
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </div>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-64 overflow-hidden">
                  <div 
                    ref={listRef}
                    className="overflow-y-auto max-h-64 py-2"
                  >
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country, index) => (
                        <button
                          key={country}
                          onClick={() => handleCountrySelect(country)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-150 ${
                            highlightedIndex === index
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                          onMouseEnter={() => setHighlightedIndex(index)}
                        >
                          <MapPin className={`h-4 w-4 transition-colors ${
                            highlightedIndex === index 
                              ? 'text-blue-500' 
                              : 'text-slate-400'
                          }`} />
                          <span className="font-medium">{country}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <MapPin className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">No countries found</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Try adjusting your search
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          

          {/* Display Selected Values */}
        </div>
         <div className="space-y-2" >
          <label className="text-sm font-medium text-gray-700 tracking-wide">
            City/Region
          </label>
          
           <div className="relative" ref={dropdownRefcity}>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  {selectedCity ? (
                    <MapPinHouseIcon className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Search className="h-5 w-5 text-slate-400" />
                  )}
                </div>
                
                <input
                  ref={inputRefcity}
                  type="text"
                  value={searchTermcity || selectedCity}
                  onChange={handleInputcityChange}
                  onFocus={handelInputFocusCity}
                  onKeyDown={handleKeyDowncity}
                  placeholder={selectedCity || "Search or select a city"}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm text-gray-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                />
                
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {selectedCity && (
                    <button
                      onClick={clearSelection}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                    </button>
                  )}
                  <ChevronDown 
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isOpencity ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </div>

              {/* Dropdown */}
              {isOpencity && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-64 overflow-hidden">
                  <div 
                    ref={listRefcity}
                    className="overflow-y-auto max-h-64 py-2"
                  >
                    {filteredcitys.length > 0 ? (
                      filteredcitys.map((country, index) => (
                        <button
                          key={country}
                          onClick={() => handleCitySelect(country)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-150 ${
                            highlightedIndexcity === index
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                          onMouseEnter={() => setHighlightedIndexcity(index)}
                        >
                          <MapPin className={`h-4 w-4 transition-colors ${
                            highlightedIndexcity === index 
                              ? 'text-blue-500' 
                              : 'text-slate-400'
                          }`} />
                          <span className="font-medium">{country}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <MapPin className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">No cityes found</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Try adjusting your search
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          

          {/* Display Selected Values */}
        </div>
     

        {/* Accommodation Type */}
        <div className="space-y-2" ref={accommodationRef}>
          <label className="text-sm font-medium text-gray-700 tracking-wide">
            Accommodation Type
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Type to search..."
              value={accommodationSearch}
              onChange={(e) => {
                setAccommodationSearch(e.target.value);
                setShowAccommodationDropdown(true);
              }}
              onFocus={() => setShowAccommodationDropdown(true)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {showAccommodationDropdown && filteredAccommodations.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {filteredAccommodations.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setAccommodationSearch(type);
                      setShowAccommodationDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button 
            onClick={handleSearch}
            disabled={!selectedCountry || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckerSearchBox;
