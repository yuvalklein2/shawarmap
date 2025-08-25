'use client';

import React, { useState, useEffect } from 'react';

interface LocationOnboardingProps {
  onLocationGranted: (position: GeolocationPosition) => void;
  onLocationDenied: () => void;
  onSkip: () => void;
}

interface LocationState {
  status: 'loading' | 'requesting' | 'granted' | 'denied' | 'error';
  position?: GeolocationPosition;
  error?: string;
}

export default function LocationOnboarding({ 
  onLocationGranted, 
  onLocationDenied, 
  onSkip 
}: LocationOnboardingProps) {
  const [locationState, setLocationState] = useState<LocationState>({ 
    status: 'requesting' 
  });

  const requestLocation = () => {
    setLocationState({ status: 'loading' });

    if (!navigator.geolocation) {
      setLocationState({ 
        status: 'error', 
        error: 'הדפדפן שלך אינו תומך במיקום גיאוגרפי' 
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationState({ status: 'granted', position });
        setTimeout(() => onLocationGranted(position), 1000);
      },
      (error) => {
        let errorMessage = 'שגיאה בקבלת המיקום';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'גישה למיקום נדחתה';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'מיקום לא זמין';
            break;
          case error.TIMEOUT:
            errorMessage = 'תם הזמן לקבלת המיקום';
            break;
        }
        setLocationState({ status: 'denied', error: errorMessage });
        setTimeout(onLocationDenied, 2000);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const LocationIcon = () => (
    <div className="relative">
      {/* Outer rings for animation */}
      <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
      <div className="absolute inset-2 rounded-full bg-red-500 opacity-30 animate-ping animation-delay-200"></div>
      
      {/* Main location pin */}
      <div className="relative w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C7.802 0 4.403 3.403 4.403 7.602C4.403 11.8 7.469 16.812 12 24C16.531 16.812 19.597 11.8 19.597 7.602C19.597 3.403 16.198 0 12 0ZM12 11.25C10.17 11.25 8.683 9.762 8.683 7.933C8.683 6.103 10.17 4.617 12 4.617C13.83 4.617 15.317 6.103 15.317 7.933C15.317 9.762 13.83 11.25 12 11.25Z"/>
          </svg>
        </div>
      </div>

      {/* Floating elements around the pin */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce">
        🥙
      </div>
      <div className="absolute -bottom-1 -left-3 w-6 h-6 bg-orange-400 rounded-full animate-bounce animation-delay-300">
        🍖
      </div>
      <div className="absolute top-8 -left-4 w-5 h-5 bg-green-400 rounded-full animate-bounce animation-delay-500">
        🥬
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 rounded-full border-4 border-red-100"></div>
      <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
      <div className="absolute inset-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    </div>
  );

  const SuccessIcon = () => (
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"></div>
    </div>
  );

  const getContent = () => {
    switch (locationState.status) {
      case 'requesting':
        return {
          icon: <LocationIcon />,
          title: 'אנו צריכים לדעת איפה אתה בשווארמה?',
          subtitle: 'מידע לנו מה אתם אוהבים!',
          primaryButton: { text: 'מיקום', onClick: requestLocation },
          secondaryButton: { text: 'לאמר', onClick: onSkip },
          tertiaryButton: { text: 'דילוג', onClick: onSkip }
        };
      
      case 'loading':
        return {
          icon: <LoadingSpinner />,
          title: 'מאתר את המיקום שלך...',
          subtitle: 'רק רגע אחד',
          primaryButton: null,
          secondaryButton: null,
          tertiaryButton: null
        };
      
      case 'granted':
        return {
          icon: <SuccessIcon />,
          title: 'מעולה!',
          subtitle: 'מחפש שווארמות בקרבתך...',
          primaryButton: null,
          secondaryButton: null,
          tertiaryButton: null
        };
      
      case 'denied':
      case 'error':
        return {
          icon: <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>,
          title: 'בעיה במיקום',
          subtitle: locationState.error || 'לא הצלחנו לקבל את המיקום שלך',
          primaryButton: { text: 'נסה שוב', onClick: requestLocation },
          secondaryButton: { text: 'המשך בלי מיקום', onClick: onSkip },
          tertiaryButton: null
        };
      
      default:
        return {
          icon: <LocationIcon />,
          title: 'משהו השתבש',
          subtitle: '',
          primaryButton: { text: 'נסה שוב', onClick: requestLocation },
          secondaryButton: null,
          tertiaryButton: null
        };
    }
  };

  const content = getContent();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'var(--gradient-warm)' }}
      dir="rtl"
    >
      <div className="w-full max-w-md mx-auto">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl"></div>
        
        {/* Content */}
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-center">
          
          {/* Icon */}
          <div className="flex justify-center mb-6">
            {content.icon}
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
            {content.title}
          </h1>
          
          {/* Subtitle */}
          {content.subtitle && (
            <p className="text-gray-600 mb-8 leading-relaxed">
              {content.subtitle}
            </p>
          )}
          
          {/* Buttons */}
          <div className="space-y-3">
            {content.primaryButton && (
              <button
                onClick={content.primaryButton.onClick}
                className="w-full btn-primary py-4 text-base font-semibold rounded-2xl"
                disabled={locationState.status === 'loading'}
              >
                {content.primaryButton.text}
              </button>
            )}
            
            {content.secondaryButton && (
              <button
                onClick={content.secondaryButton.onClick}
                className="w-full btn-secondary py-3 text-base font-medium rounded-2xl"
              >
                {content.secondaryButton.text}
              </button>
            )}
            
            {content.tertiaryButton && (
              <button
                onClick={content.tertiaryButton.onClick}
                className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm font-medium"
              >
                {content.tertiaryButton.text}
              </button>
            )}
          </div>
          
          {/* Google attribution for location */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.987 11.987s11.987-5.367 11.987-11.987C24.003 5.367 18.637.001 12.017.001zM8.449 7.988c.385-.699.64-.898 1.084-.898.445 0 .699.199 1.084.898l.342.684c.342.684.855 1.368 1.368 1.368s1.027-.684 1.368-1.368l.342-.684c.385-.699.64-.898 1.084-.898.445 0 .699.199 1.084.898.385.699.385 1.596 0 2.295-.385.699-.64.898-1.084.898-.445 0-.699-.199-1.084-.898l-.342-.684c-.342-.684-.855-1.368-1.368-1.368s-1.027.684-1.368 1.368l-.342.684c-.385.699-.64.898-1.084.898-.445 0-.699-.199-1.084-.898-.385-.699-.385-1.596 0-2.295z"/>
              </svg>
              <span>Google שירותי מיקום</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-400 rounded-full"></div>
        <div className="absolute top-1/3 right-8 w-16 h-16 bg-orange-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-green-400 rounded-full"></div>
      </div>
    </div>
  );
}