"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search, ChevronDown, X, MapPinHouseIcon } from 'lucide-react';
import data from '@/app/static-data';
import { slugify } from '@/hook/correct-rul';

interface CheckerSearchBoxProps {
  initialCountry?: string;
  initialCity?: string;
  initialAccommodation?: string;
  onFilterChange?: (filters: any) => void;
}

const CheckerSearchBox = ({
  initialCountry = '',
  initialCity = '',
  initialAccommodation = '',
  onFilterChange
}: CheckerSearchBoxProps) => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [accommodationSearch, setAccommodationSearch] = useState(initialAccommodation);
  const [showAccommodationDropdown, setShowAccommodationDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const accommodationRef = useRef<HTMLDivElement>(null);
  const countries = Object.keys(data);

  const getCitiesForCountry = (country: string) => data[country] || [];

  const accommodationTypes = [
    'Hotels', 'Luxury Hotels', 'Budget Hotels', 'Boutique Hotels', 'Business Hotels',
    'Restaurants', 'Fine Dining', 'Casual Dining', 'Fast Food', 'Cafes',
    'Houses', 'Villas', 'Apartments', 'Condos', 'Vacation Rentals',
    'Hostels', 'Bed & Breakfast', 'Resorts', 'Motels', 'Guesthouses'
  ];

  const filteredAccommodations = accommodationTypes.filter(type =>
    type.toLowerCase().includes(accommodationSearch.toLowerCase())
  );

  // ── Country dropdown state ──────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // ── City dropdown state ─────────────────────────────────────────────────
  const [isOpencity, setIsOpencity] = useState(false);
  const [searchTermcity, setSearchTermcity] = useState('');
  const [filteredcitys, setFilteredcitys] = useState(getCitiesForCountry(selectedCountry));
  const [highlightedIndexcity, setHighlightedIndexcity] = useState(-1);
  const dropdownRefcity = useRef<HTMLDivElement>(null);
  const inputRefcity = useRef<HTMLInputElement>(null);
  const listRefcity = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCountry.length > 0) setFilteredcitys(getCitiesForCountry(selectedCountry));
  }, [selectedCountry]);

  useEffect(() => {
    const filtered = countries.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const filtredcity = searchTermcity.length > 0
      ? filteredcitys.filter(c => c.toLowerCase().includes(searchTermcity.toLowerCase()))
      : getCitiesForCountry(selectedCountry);
    setFilteredCountries(filtered);
    setFilteredcitys(filtredcity);
    setHighlightedIndex(-1);
  }, [searchTerm, searchTermcity]);

  // Close on outside click — also closes accommodation dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); setSearchTerm('');
      }
      if (dropdownRefcity.current && !dropdownRefcity.current.contains(event.target as Node)) {
        setIsOpencity(false); setSearchTermcity('');
      }
      if (accommodationRef.current && !accommodationRef.current.contains(event.target as Node)) {
        setShowAccommodationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightedIndex(p => Math.min(p + 1, filteredCountries.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightedIndex(p => Math.max(p - 1, 0)); }
    else if (e.key === 'Enter' && highlightedIndex >= 0) { e.preventDefault(); handleCountrySelect(filteredCountries[highlightedIndex]); }
    else if (e.key === 'Escape') { setIsOpen(false); setSearchTerm(''); inputRef.current?.blur(); }
  };

  const handleKeyDowncity = (e: React.KeyboardEvent) => {
    if (!isOpencity) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightedIndexcity(p => Math.min(p + 1, filteredcitys.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightedIndexcity(p => Math.max(p - 1, 0)); }
    else if (e.key === 'Enter' && highlightedIndexcity >= 0) { e.preventDefault(); handleCitySelect(filteredcitys[highlightedIndexcity]); }
    else if (e.key === 'Escape') { setIsOpencity(false); setSearchTermcity(''); inputRefcity.current?.blur(); }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      listRef.current.children[highlightedIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    if (highlightedIndexcity >= 0 && listRefcity.current) {
      listRefcity.current.children[highlightedIndexcity]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [highlightedIndex, highlightedIndexcity]);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country); setFilteredcitys(getCitiesForCountry(country));
    setSelectedCity(''); setAccommodationSearch(''); setIsOpen(false); setSearchTerm('');
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city); setIsOpencity(false); setSearchTermcity('');
  };

  const clearSelection = () => {
    setSelectedCountry(''); setSelectedCity(''); setAccommodationSearch('');
    setSearchTerm(''); setSearchTermcity('');
    if (onFilterChange) onFilterChange({ country: '', city: '', accommodation: '', minRating: 0, priceMin: 0, priceMax: 10000 });
    router.push('/check');
    inputRef.current?.focus();
  };

  const handleSearch = async () => {
    if (!selectedCountry) { alert('Please select a country'); return; }
    setIsLoading(true);
    if (onFilterChange) onFilterChange({ country: selectedCountry, city: selectedCity, accommodation: accommodationSearch, minRating: 0, priceMin: 0, priceMax: 10000 });
    let url = `/check/${slugify(selectedCountry)}`;
    if (selectedCity) url += `/${slugify(selectedCity)}`;
    if (accommodationSearch) url += `/${accommodationSearch.toLowerCase().replace(/\s+/g, '-')}`;
    await new Promise(r => setTimeout(r, 1000));
    router.push(url);
    setIsLoading(false);
  };

  // ── Shared dropdown item classes ──────────────────────────────────────────
  const itemCls = (active: boolean) =>
    `w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-150 ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`;

  return (
    /*
     * FIX: The outer wrapper must NOT have overflow:hidden.
     * We give it position:relative + a high z-index so every dropdown
     * it spawns floats above the <main> content that follows in the DOM.
     *
     * Do NOT add overflow-hidden to this element or any ancestor of it
     * (including the <section> in checker-client-main.tsx) — that is what
     * was clipping the dropdowns before.
     */
    <div className="relative z-50 bg-white rounded-xl shadow-lg p-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* ── Country ───────────────────────────────────────────────────── */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 tracking-wide">Destination Country</label>
          {/* position:relative here creates the stacking context for THIS dropdown only */}
          <div className="relative" ref={dropdownRef}>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                {selectedCountry ? <MapPin className="h-5 w-5 text-slate-400" /> : <Search className="h-5 w-5 text-slate-400" />}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={searchTerm || selectedCountry}
                onChange={e => { setSearchTerm(e.target.value); if (e.target.value) setIsOpen(true); }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search or select a country"
                className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm text-gray-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {selectedCountry && (
                  <button onClick={clearSelection} className="p-1 hover:bg-gray-100 rounded-full">
                    <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  </button>
                )}
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {isOpen && (
              // z-[100] ensures this floats above everything below the search box
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-[100] max-h-64 overflow-hidden">
                <div ref={listRef} className="overflow-y-auto max-h-64 py-2">
                  {filteredCountries.length > 0 ? filteredCountries.map((country, i) => (
                    <button key={country} onClick={() => handleCountrySelect(country)} onMouseEnter={() => setHighlightedIndex(i)} className={itemCls(highlightedIndex === i)}>
                      <MapPin className={`h-4 w-4 ${highlightedIndex === i ? 'text-blue-500' : 'text-slate-400'}`} />
                      <span className="font-medium">{country}</span>
                    </button>
                  )) : (
                    <div className="px-4 py-8 text-center">
                      <MapPin className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">No countries found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── City ──────────────────────────────────────────────────────── */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 tracking-wide">City / Region</label>
          <div className="relative" ref={dropdownRefcity}>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                {selectedCity ? <MapPinHouseIcon className="h-5 w-5 text-slate-400" /> : <Search className="h-5 w-5 text-slate-400" />}
              </div>
              <input
                ref={inputRefcity}
                type="text"
                value={searchTermcity || selectedCity}
                onChange={e => { setSearchTermcity(e.target.value); if (e.target.value) setIsOpencity(true); }}
                onFocus={() => setIsOpencity(true)}
                onKeyDown={handleKeyDowncity}
                placeholder="Search or select a city"
                className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm text-gray-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {selectedCity && (
                  <button onClick={() => { setSelectedCity(''); setSearchTermcity(''); }} className="p-1 hover:bg-gray-100 rounded-full">
                    <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  </button>
                )}
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpencity ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {isOpencity && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-[100] max-h-64 overflow-hidden">
                <div ref={listRefcity} className="overflow-y-auto max-h-64 py-2">
                  {filteredcitys.length > 0 ? filteredcitys.map((city, i) => (
                    <button key={city} onClick={() => handleCitySelect(city)} onMouseEnter={() => setHighlightedIndexcity(i)} className={itemCls(highlightedIndexcity === i)}>
                      <MapPin className={`h-4 w-4 ${highlightedIndexcity === i ? 'text-blue-500' : 'text-slate-400'}`} />
                      <span className="font-medium">{city}</span>
                    </button>
                  )) : (
                    <div className="px-4 py-8 text-center">
                      <MapPin className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">No cities found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Accommodation ─────────────────────────────────────────────── */}
        <div className="space-y-2" ref={accommodationRef}>
          <label className="text-sm font-medium text-gray-700 tracking-wide">Accommodation Type</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Type to search..."
              value={accommodationSearch}
              onChange={e => { setAccommodationSearch(e.target.value); setShowAccommodationDropdown(true); }}
              onFocus={() => setShowAccommodationDropdown(true)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-gray-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
            {showAccommodationDropdown && filteredAccommodations.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-[100] max-h-60 overflow-y-auto">
                {filteredAccommodations.map(type => (
                  <button
                    key={type}
                    onClick={() => { setAccommodationSearch(type); setShowAccommodationDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Search button ─────────────────────────────────────────────── */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={!selectedCountry || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isLoading
              ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              : <><Search className="h-5 w-5" /><span>Search</span></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckerSearchBox;