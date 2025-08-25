import React, { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  icon?: string;
  color?: string;
}

const hebrewFilterOptions: FilterOption[] = [
  { id: 'all', label: 'הכל', icon: '🌟' },
  { id: 'kosher', label: 'כשר', icon: '✡️', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'halal', label: 'חלאל', icon: '☪️', color: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'vegan', label: 'טבעוני', icon: '🌱', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'spicy', label: 'חריף', icon: '🌶️', color: 'bg-red-50 text-red-700 border-red-200' },
  { id: 'cheap', label: 'זול', icon: '💰', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { id: 'premium', label: 'פרימיום', icon: '⭐', color: 'bg-purple-50 text-purple-700 border-purple-200' },
];

const hebrewSortOptions = [
  { id: 'rating', label: 'דירוג גבוה', icon: '⭐' },
  { id: 'distance', label: 'הכי קרוב', icon: '📍' },
  { id: 'price', label: 'מחיר', icon: '💰' },
  { id: 'newest', label: 'חדש', icon: '🆕' },
];

interface HebrewFilterBarProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export default function HebrewFilterBar({ 
  selectedFilters, 
  onFilterChange, 
  sortBy, 
  onSortChange 
}: HebrewFilterBarProps) {
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
    <div className="bg-white border-b border-gray-100 sticky top-16 z-40" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-3 justify-start">
            {hebrewFilterOptions.map((option) => {
              const isActive = option.id === 'all' 
                ? selectedFilters.length === 0
                : selectedFilters.includes(option.id);

              return (
                <button
                  key={option.id}
                  onClick={() => handleFilterToggle(option.id)}
                  className={`
                    inline-flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-full text-sm font-medium
                    border transition-all duration-200 hover:scale-105
                    ${isActive 
                      ? 'bg-red-500 text-white border-red-500 shadow-md' 
                      : option.color || 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span>{option.label}</span>
                  <span className="text-xs">{option.icon}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="btn-secondary text-sm px-3 py-2 flex items-center space-x-2 space-x-reverse"
              >
                <svg 
                  className={`w-4 h-4 transition-transform ${showSort ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span>
                  {hebrewSortOptions.find(opt => opt.id === sortBy)?.label}
                  {' '}
                  {hebrewSortOptions.find(opt => opt.id === sortBy)?.icon}
                </span>
              </button>

              {showSort && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {hebrewSortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        onSortChange(option.id);
                        setShowSort(false);
                      }}
                      className={`
                        w-full text-right px-4 py-2 text-sm flex items-center justify-start space-x-2 space-x-reverse hover:bg-gray-50
                        ${sortBy === option.id ? 'text-red-600 bg-red-50' : 'text-gray-700'}
                      `}
                    >
                      <span>{option.label}</span>
                      <span>{option.icon}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
              <span className="font-medium">נמצאו 12 מקומות באזור</span>
            </div>
          </div>

          {/* Active Filters Summary */}
          {selectedFilters.length > 0 && (
            <div className="mt-3 flex items-center space-x-2 space-x-reverse justify-start">
              <button
                onClick={() => onFilterChange([])}
                className="text-xs text-gray-500 hover:text-red-600 underline"
              >
                נקה הכל
              </button>
              <div className="flex flex-wrap gap-1">
                {selectedFilters.map((filterId) => {
                  const option = hebrewFilterOptions.find(opt => opt.id === filterId);
                  return (
                    <span 
                      key={filterId}
                      className="inline-flex items-center space-x-1 space-x-reverse px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md"
                    >
                      <button
                        onClick={() => handleFilterToggle(filterId)}
                        className="ml-1 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                      <span>{option?.label}</span>
                      <span>{option?.icon}</span>
                    </span>
                  );
                })}
              </div>
              <span className="text-sm text-gray-500">:מסננים פעילים</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}