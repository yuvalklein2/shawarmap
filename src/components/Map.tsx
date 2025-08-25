'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { ShawarmaLocation } from '@/types';

interface MapProps {
  locations: ShawarmaLocation[];
  selectedLocation?: ShawarmaLocation | null;
  onLocationSelect?: (location: ShawarmaLocation) => void;
}

export default function Map({ locations, selectedLocation, onLocationSelect }: MapProps) {
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
          // Custom map styling to match the warm design theme
          const mapStyles = [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ color: '#FDF5E6' }] // Warm cream background
            },
            {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [{ color: '#E3F2FD' }] // Light blue water
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [{ color: '#FFFFFF' }] // White roads
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#E8E8E8' }] // Light border
            },
            {
              featureType: 'poi',
              elementType: 'geometry.fill',
              stylers: [{ color: '#FFF3E0' }] // Warm POI background
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry.fill',
              stylers: [{ color: '#E8F5E8' }] // Light green parks
            },
            {
              featureType: 'administrative',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#666666' }] // Dark gray text
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#555555' }]
            }
          ];

          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 32.0853, lng: 34.7818 }, // Tel Aviv center
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            styles: mapStyles,
            gestureHandling: 'cooperative',
            backgroundColor: '#FDF5E6'
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
    
    const newMarkers = locations.map((location, index) => {
      // Create custom marker SVG matching your Figma design
      const isSelected = selectedLocation?.id === location.id;
      const markerSvg = `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer shadow -->
          <ellipse cx="24" cy="42" rx="8" ry="4" fill="rgba(0,0,0,0.2)"/>
          
          <!-- Main marker body -->
          <path d="M24 4C16.8 4 11 9.8 11 17C11 26.5 24 44 24 44S37 26.5 37 17C37 9.8 31.2 4 24 4Z" 
                fill="${isSelected ? '#B71C1C' : '#D32F2F'}" 
                stroke="white" 
                stroke-width="2"/>
          
          <!-- Inner circle -->
          <circle cx="24" cy="17" r="8" fill="white" fill-opacity="0.95"/>
          
          <!-- Shawarma icon -->
          <circle cx="24" cy="17" r="6" fill="${isSelected ? '#B71C1C' : '#D32F2F'}"/>
          <text x="24" y="21" text-anchor="middle" font-size="10" fill="white">🥙</text>
          
          <!-- Rating badge -->
          ${location.rating >= 4.5 ? `
            <circle cx="34" cy="10" r="7" fill="#FFD700" stroke="white" stroke-width="1"/>
            <text x="34" y="13" text-anchor="middle" font-size="8" font-weight="bold" fill="white">★</text>
          ` : ''}
        </svg>
      `;

      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name,
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(markerSvg),
          scaledSize: new google.maps.Size(48, 48),
          anchor: new google.maps.Point(24, 44), // Anchor at bottom center
        },
        zIndex: isSelected ? 1000 : 100 + index,
        animation: isSelected ? google.maps.Animation.BOUNCE : null,
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
  }, [map, locations, selectedLocation, onLocationSelect]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[400px] rounded-lg"
    />
  );
}