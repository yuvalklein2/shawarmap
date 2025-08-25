'use client';

import { useState, useEffect } from 'react';
import Map from './Map';
import Header from './Header';
import FilterBar from './FilterBar';
import RestaurantCard from './RestaurantCard';
import type { ShawarmaLocation } from '@/types';

// Enhanced sample shawarma locations
const sampleLocations = [
  {
    id: '1',
    name: 'Abu Hassan',
    lat: 32.0641,
    lng: 34.7696,
    address: 'HaDolphin St, Jaffa, Tel Aviv',
    rating: 4.7,
    reviews: 245,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=200&fit=crop',
    priceRange: '₪₪',
    cuisine: ['Middle Eastern', 'Hummus', 'Traditional'],
    openNow: true,
    distance: '0.8 km',
    deliveryTime: '25-35 min'
  },
  {
    id: '2', 
    name: 'Shawarma HaKosem',
    lat: 32.0753,
    lng: 34.7778,
    address: 'Shuk HaCarmel, Tel Aviv',
    rating: 4.5,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop',
    priceRange: '₪',
    cuisine: ['Shawarma', 'Street Food', 'Quick Bites'],
    openNow: true,
    distance: '1.2 km',
    deliveryTime: '15-25 min'
  },
  {
    id: '3',
    name: 'HaShamen',
    lat: 32.0849,
    lng: 34.7806,
    address: 'Ibn Gvirol St, Tel Aviv',
    rating: 4.3,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=200&fit=crop',
    priceRange: '₪₪₪',
    cuisine: ['Premium', 'Modern', 'Gourmet'],
    openNow: false,
    distance: '2.1 km',
    deliveryTime: '30-40 min'
  },
  {
    id: '4',
    name: 'Sabich Frishman',
    lat: 32.0789,
    lng: 34.7732,
    address: 'Frishman St, Tel Aviv',
    rating: 4.6,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
    priceRange: '₪₪',
    cuisine: ['Sabich', 'Iraqi', 'Breakfast'],
    openNow: true,
    distance: '1.5 km',
    deliveryTime: '20-30 min'
  },
  {
    id: '5',
    name: 'Miznon',
    lat: 32.0668,
    lng: 34.7753,
    address: 'Ibn Gabirol St, Tel Aviv',
    rating: 4.4,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=200&fit=crop',
    priceRange: '₪₪₪',
    cuisine: ['Modern', 'Pita', 'Creative'],
    openNow: true,
    distance: '1.8 km',
    deliveryTime: '25-35 min'
  }
];

export default function ShawarMapClient() {
  const [selectedLocation, setSelectedLocation] = useState<ShawarmaLocation | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--secondary)' }}>
        <div className="text-center">
          <div className="loading-shimmer w-16 h-16 rounded-full mx-auto mb-4"></div>
          <div className="text-gray-600 font-medium">Loading ShawarMap...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--secondary)' }}>
      <Header onMenuClick={() => setShowMobileMenu(!showMobileMenu)} />
      <FilterBar 
        selectedFilters={selectedFilters}
        onFilterChange={setSelectedFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Main Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-200px)]">
            
            {/* Sidebar with locations list */}
            <div className={`
              lg:col-span-2 space-y-4 overflow-y-auto
              ${showMobileMenu ? 'block' : 'hidden lg:block'}
            `}>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Best Shawarma Places 
                </h2>
                <p className="text-sm text-gray-600">
                  Discover authentic flavors near you
                </p>
              </div>

              {/* Restaurant Cards */}
              <div className="space-y-4">
                {sampleLocations.map(location => (
                  <RestaurantCard
                    key={location.id}
                    location={location}
                    isSelected={selectedLocation?.id === location.id}
                    onClick={() => setSelectedLocation(location)}
                  />
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-3 relative">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden map-container h-full">
                <Map 
                  locations={sampleLocations} 
                  onLocationSelect={setSelectedLocation}
                />
              </div>

              {/* Floating Action Button - Mobile */}
              <button className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-red-600 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}