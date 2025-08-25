import React from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

const ShawarMapIcon = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-sm">
    <span className="text-white text-lg font-bold">🥙</span>
  </div>
);

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <ShawarMapIcon />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                SHAWARMAP
              </h1>
              <span className="text-xs text-gray-500 font-medium -mt-1">
                Find the best shawarma
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button className="btn-secondary text-sm px-4 py-2 hidden sm:flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </button>
            
            <button 
              onClick={onMenuClick}
              className="btn-secondary p-2 sm:hidden"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <button className="btn-primary text-sm px-4 py-2 hidden sm:flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Place</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}