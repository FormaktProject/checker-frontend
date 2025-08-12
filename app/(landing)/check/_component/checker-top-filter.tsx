"use client"
import { ChevronDown, Filter, ArrowUpDown } from 'lucide-react';

interface CheckerTopFilterProps {
  totalResults?: number;
  location?: string;
}

const CheckerTopFilter = ({ totalResults = 0, location = '' }: CheckerTopFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-lg p-4 shadow-sm">
      <div>
        <span className="text-lg">
          <span className="font-medium">{totalResults.toLocaleString()} checkers</span> 
          {location && ` in ${location}`}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Top rated checkers
          <ChevronDown className="h-4 w-4 ml-2" />
        </button>

        <button className="xl:hidden flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>
    </div>
  );
};

export default CheckerTopFilter;
