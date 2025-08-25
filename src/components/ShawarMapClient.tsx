'use client';

import { useState, useEffect } from 'react';
import Map from './Map';
import type { ShawarmaLocation } from '@/types';

// Sample shawarma locations (replace with real data later)
const sampleLocations = [
  {
    id: '1',
    name: 'Abu Hassan',
    lat: 32.0641,
    lng: 34.7696,
    address: 'Jaffa, Tel Aviv',
    rating: 4.7,
    reviews: 245
  },
  {
    id: '2', 
    name: 'Shawarma HaKosem',
    lat: 32.0753,
    lng: 34.7778,
    address: 'Shuk HaCarmel, Tel Aviv',
    rating: 4.5,
    reviews: 189
  },
  {
    id: '3',
    name: 'HaShamen',
    lat: 32.0849,
    lng: 34.7806,
    address: 'Ibn Gvirol St, Tel Aviv',
    rating: 4.3,
    reviews: 156
  }
];

export default function ShawarMapClient() {
  const [selectedLocation, setSelectedLocation] = useState<ShawarmaLocation | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading ShawarMap...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">🥙 ShawarMap</h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Search
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Filter
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Sidebar with locations list */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Shawarma Places Near You
            </h2>
            <div className="space-y-4">
              {sampleLocations.map(location => (
                <div 
                  key={location.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedLocation?.id === location.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <h3 className="font-medium text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-medium text-gray-900 ml-1">
                        {location.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({location.reviews} reviews)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
            <Map 
              locations={sampleLocations} 
              onLocationSelect={setSelectedLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}