import React from 'react';
import type { ShawarmaLocation } from '@/types';

interface HebrewRestaurantCardProps {
  location: ShawarmaLocation & {
    image?: string;
    priceRange?: string;
    cuisine?: string[];
    openNow?: boolean;
    distance?: string;
    deliveryTime?: string;
    hebrewName?: string;
    hebrewAddress?: string;
    hebrewCuisine?: string[];
  };
  isSelected?: boolean;
  onClick?: () => void;
}

const HebrewStarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 space-x-reverse">
      <span className="text-sm font-medium text-gray-900">{rating}</span>
      <div className="flex rating-stars">
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
        {hasHalfStar && <span>☆</span>}
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
      </div>
    </div>
  );
};

export default function HebrewRestaurantCard({ 
  location, 
  isSelected = false, 
  onClick 
}: HebrewRestaurantCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        card cursor-pointer transition-all duration-200 hover:scale-[1.02] p-0 overflow-hidden
        ${isSelected ? 'ring-2 ring-red-500 shadow-lg' : ''}
      `}
      dir="rtl"
    >
      {/* Image */}
      <div className="relative h-32 bg-gradient-to-r from-orange-100 to-red-100">
        {location.image ? (
          <img 
            src={location.image} 
            alt={location.hebrewName || location.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🥙</span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={`
            inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
            ${location.openNow !== false 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
            }
          `}>
            <div className={`w-2 h-2 rounded-full ml-1 ${
              location.openNow !== false ? 'bg-green-500' : 'bg-red-500'
            }`} />
            {location.openNow !== false ? 'פתוח' : 'סגור'}
          </span>
        </div>

        {/* Distance */}
        {location.distance && (
          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
            {location.distance}
          </div>
        )}

        {/* Heart Icon */}
        <button className="absolute bottom-2 left-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
          <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          {location.priceRange && (
            <span className="mr-2 text-sm font-medium text-green-600">
              {location.priceRange}
            </span>
          )}
          <div className="flex-1 min-w-0 text-right">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">
              {location.hebrewName || location.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {location.hebrewAddress || location.address}
            </p>
          </div>
        </div>

        {/* Cuisine Tags */}
        {location.hebrewCuisine && location.hebrewCuisine.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3 justify-end">
            {location.hebrewCuisine.slice(0, 3).map((cuisine, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
              >
                {cuisine}
              </span>
            ))}
          </div>
        )}

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">
            ({location.reviews} ביקורות)
          </span>
          <HebrewStarRating rating={location.rating} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center space-x-1 space-x-reverse">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>פרטים נוספים</span>
          </button>
          
          {location.deliveryTime && (
            <div className="flex items-center text-sm text-gray-600 space-x-1 space-x-reverse">
              <span>{location.deliveryTime}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}