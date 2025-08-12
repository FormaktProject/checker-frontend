import { useState } from "react";
import { MapPin, ChevronDown } from 'lucide-react';

type Item = {
  id: number,
  name: string,
  address: string
}

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const locationSearchContent = [
    {
      id: 1,
      name: "London",
      address: "Greater London, United Kingdom",
    },
    {
      id: 2,
      name: "New York",
      address: "New York State, United States",
    },
    {
      id: 3,
      name: "Paris",
      address: "France",
    },
    {
      id: 4,
      name: "Madrid",
      address: "Spain",
    },
    {
      id: 5,
      name: "Santorini",
      address: "Greece",
    },
  ];

  const handleOptionClick = (item: Item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    setIsOpen(false);
  };

  const filteredLocations = locationSearchContent.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.address.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-gray-900 tracking-wide">
          Location
        </h4>
        <div className="relative">
          <input
            autoComplete="off"
            type="search"
            placeholder="Where are you going?"
            className="w-full text-sm text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-20 max-h-60 overflow-y-auto">
            {filteredLocations.map((item) => (
              <button
                key={item.id}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-start space-x-3 ${
                  selectedItem && selectedItem.id === item.id ? "bg-blue-50" : ""
                }`}
                onClick={() => handleOptionClick(item)}
              >
                <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.address}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
