import React, { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  icon?: string;
  color?: string;
}

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All', icon: '🌟' },
  { id: 'kosher', label: 'Kosher', icon: '✡️', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'halal', label: 'Halal', icon: '☪️', color: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'vegan', label: 'Vegan', icon: '🌱', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'spicy', label: 'Spicy', icon: '🌶️', color: 'bg-red-50 text-red-700 border-red-200' },
  { id: 'cheap', label: 'Budget', icon: '💰', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { id: 'premium', label: 'Premium', icon: '⭐', color: 'bg-purple-50 text-purple-700 border-purple-200' },
];

const sortOptions = [
  { id: 'rating', label: 'Best Rated', icon: '⭐' },
  { id: 'distance', label: 'Nearest', icon: '📍' },
  { id: 'price', label: 'Price', icon: '💰' },
  { id: 'newest', label: 'Newest', icon: '🆕' },
];

interface FilterBarProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export default function FilterBar({ 
  selectedFilters, 
  onFilterChange, 
  sortBy, 
  onSortChange 
}: FilterBarProps) {
  const [showSort, setShowSort] = useState(false);

  const handleFilterToggle = (filterId: string) => {
    if (filterId === 'all') {
      onFilterChange([]);
      return;
    }

    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {filterOptions.map((option) => {
              const isActive = option.id === 'all' 
                ? selectedFilters.length === 0
                : selectedFilters.includes(option.id);

              return (
                <button
                  key={option.id}
                  onClick={() => handleFilterToggle(option.id)}
                  className={`
                    inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium
                    border transition-all duration-200 hover:scale-105
                    ${isActive 
                      ? 'bg-red-500 text-white border-red-500 shadow-md' 
                      : option.color || 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="text-xs">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-medium">Found 12 places nearby</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="btn-secondary text-sm px-3 py-2 flex items-center space-x-2"
              >
                <span>
                  {sortOptions.find(opt => opt.id === sortBy)?.icon} 
                  {sortOptions.find(opt => opt.id === sortBy)?.label}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showSort ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showSort && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        onSortChange(option.id);
                        setShowSort(false);
                      }}
                      className={`
                        w-full text-left px-4 py-2 text-sm flex items-center space-x-2 hover:bg-gray-50
                        ${sortBy === option.id ? 'text-red-600 bg-red-50' : 'text-gray-700'}
                      `}
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active Filters Summary */}
          {selectedFilters.length > 0 && (
            <div className="mt-3 flex items-center space-x-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              <div className="flex flex-wrap gap-1">
                {selectedFilters.map((filterId) => {
                  const option = filterOptions.find(opt => opt.id === filterId);
                  return (
                    <span 
                      key={filterId}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md"
                    >
                      <span>{option?.icon}</span>
                      <span>{option?.label}</span>
                      <button
                        onClick={() => handleFilterToggle(filterId)}
                        className="ml-1 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
              <button
                onClick={() => onFilterChange([])}
                className="text-xs text-gray-500 hover:text-red-600 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}