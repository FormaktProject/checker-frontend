import React, { useState } from "react";
import { Users, ChevronDown, Plus, Minus } from 'lucide-react';

const counters = [
  { name: "Adults", defaultValue: 2 },
  { name: "Children", defaultValue: 1 },
  { name: "Rooms", defaultValue: 1 },
];

const Counter = ({ name, defaultValue, onCounterChange }: {
  name: string;
  defaultValue: number;
  onCounterChange: (name: string, value: number) => void;
}) => {
  const [count, setCount] = useState(defaultValue);

  const incrementCount = () => {
    setCount(count + 1);
    onCounterChange(name, count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
      onCounterChange(name, count - 1);
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="text-sm font-medium text-gray-900">{name}</div>
        {name === "Children" && (
          <div className="text-xs text-gray-500 mt-1">Ages 0 - 17</div>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <button
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={decrementCount}
          disabled={count === 0}
        >
          <Minus className="h-3 w-3 text-gray-600" />
        </button>
        <span className="w-8 text-center text-sm font-medium text-gray-900">
          {count}
        </span>
        <button
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors duration-150"
          onClick={incrementCount}
        >
          <Plus className="h-3 w-3 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

const GuestSearch = () => {
  const [guestCounts, setGuestCounts] = useState({
    Adults: 2,
    Children: 1,
    Rooms: 1,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleCounterChange = (name: string, value: number) => {
    setGuestCounts((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="relative">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-gray-900 tracking-wide">Guest</h4>
        <button
          className="w-full text-left flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="text-sm text-gray-600">
            {guestCounts.Adults} adults - {guestCounts.Children} children - {guestCounts.Rooms} room
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-20 min-w-80">
            <div className="p-4">
              {counters.map((counter, index) => (
                <div key={counter.name}>
                  <Counter
                    name={counter.name}
                    defaultValue={counter.defaultValue}
                    onCounterChange={handleCounterChange}
                  />
                  {index < counters.length - 1 && (
                    <div className="border-t border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GuestSearch;
