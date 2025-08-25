'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface ShawarmaLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  rating: number;
  reviews: number;
}

interface MapProps {
  locations: ShawarmaLocation[];
  onLocationSelect?: (location: ShawarmaLocation) => void;
}

export default function Map({ locations, onLocationSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        console.error('Google Maps API key not found');
        return;
      }

      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 32.0853, lng: 34.7818 }, // Tel Aviv center
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          });
          
          setMap(mapInstance);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, []);

  // Add markers when locations change
  useEffect(() => {
    if (!map || !locations.length) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers = locations.map(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name,
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#FF6B6B" stroke="#fff" stroke-width="2"/>
              <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">🥙</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32),
        }
      });

      // Add click listener to marker
      marker.addListener('click', () => {
        onLocationSelect?.(location);
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Adjust map bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach(location => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });
      map.fitBounds(bounds);
    }
  }, [map, locations, onLocationSelect]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[400px] rounded-lg"
    />
  );
}