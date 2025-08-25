import React from 'react';

interface HebrewHeaderProps {
  onMenuClick?: () => void;
}

const ShawarMapIcon = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-sm">
    <span className="text-white text-lg font-bold">🥙</span>
  </div>
);

export default function HebrewHeader({ onMenuClick }: HebrewHeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Actions - Now on the right in RTL */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <button className="btn-primary text-sm px-4 py-2 hidden sm:flex items-center space-x-2 space-x-reverse">
              <span>הוסף מקום</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <button className="btn-secondary text-sm px-4 py-2 hidden sm:flex items-center space-x-2 space-x-reverse">
              <span>חיפוש</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <button 
              onClick={onMenuClick}
              className="btn-secondary p-2 sm:hidden"
              aria-label="תפריט"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Logo and Brand - Now on the left in RTL */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex flex-col text-right">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                SHAWARMAP
              </h1>
              <span className="text-xs text-gray-500 font-medium -mt-1">
                מצא את השווארמה הטובה ביותר
              </span>
            </div>
            <ShawarMapIcon />
          </div>
        </div>
      </div>
    </header>
  );
}