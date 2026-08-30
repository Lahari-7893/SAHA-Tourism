import React from 'react';

export default function LoadingSpinner({ message = "Loading...", variant = "spinner", size = "default" }) {
  const sizeMap = {
    small: "w-6 h-6",
    default: "w-10 h-10",
    large: "w-16 h-16"
  };

  const spinner = (
    <div className={`relative ${sizeMap[size]}`}>
      <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-[#0077B6] rounded-full border-t-transparent animate-spin"></div>
    </div>
  );

  if (variant === "fullpage") {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0077B6] to-[#00838F] blur-xl opacity-20 animate-pulse rounded-full"></div>
          <h1 className="text-4xl font-bold text-[#1B2A4A] relative z-10">SAHA</h1>
        </div>
        {spinner}
        {message && <p className="mt-4 text-[#0077B6] font-medium animate-pulse">{message}</p>}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3">
        <div className={`relative ${sizeMap.small}`}>
          <div className="absolute inset-0 border-2 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-[#00838F] rounded-full border-t-transparent animate-spin"></div>
        </div>
        {message && <span className="text-sm text-gray-500 font-medium">{message}</span>}
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {spinner}
      {message && <p className="mt-4 text-gray-500 font-medium">{message}</p>}
    </div>
  );
}
