'use client';

import { useState } from 'react';

interface OrderFiltersProps {
  onSearchChange: (query: string) => void;
  onDateRangeChange: (range: string) => void;
}

export default function OrderFilters({
  onSearchChange,
  onDateRangeChange,
}: OrderFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('This month');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleDateRangeSelect = (range: string) => {
    setSelectedDateRange(range);
    onDateRangeChange(range);
    setShowDateDropdown(false);
  };

  return (
    <div className="flex gap-4 mb-6">
      {/* Search Input */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search by product name or order number"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <svg
          className="absolute right-3 top-3 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Date Range Dropdown */}
      <div className="relative w-48">
        <button
          onClick={() => setShowDateDropdown(!showDateDropdown)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center justify-between"
        >
          {selectedDateRange}
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${
              showDateDropdown ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {showDateDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {['Today', 'This Week', 'This Month', 'Last 6 Months', 'This Year'].map((range) => (
              <button
                key={range}
                onClick={() => handleDateRangeSelect(range)}
                className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm border-b border-gray-200 last:border-b-0 ${
                  selectedDateRange === range ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
