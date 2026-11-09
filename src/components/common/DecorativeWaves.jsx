import React from 'react';

export function TopLeftWave({ className = '' }) {
  return (
    <div className={`absolute top-0 left-0 pointer-events-none select-none z-0 overflow-hidden w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform -translate-x-12 -translate-y-12"
      >
        <defs>
          <linearGradient id="tlGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#079E9A" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#25B5B1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#EAF6F8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="tlGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2D50" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#079E9A" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 L260 0 C220 80 180 160 110 210 C50 250 10 270 0 280 Z"
          fill="url(#tlGrad1)"
        />
        <path
          d="M0 0 L180 0 C150 70 120 140 70 180 C30 210 0 230 0 240 Z"
          fill="url(#tlGrad2)"
        />
      </svg>
    </div>
  );
}

export function BottomRightWave({ className = '' }) {
  return (
    <div className={`pointer-events-none select-none z-0 overflow-hidden w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform translate-x-8 translate-y-8"
      >
        <defs>
          <linearGradient id="brGrad1" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#079E9A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#1EB4B0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EAF6F8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="brGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0B2D50" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#079E9A" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d="M400 400 L140 400 C180 320 220 240 290 190 C350 150 390 130 400 120 Z"
          fill="url(#brGrad1)"
        />
        <path
          d="M400 400 L220 400 C250 330 280 260 330 220 C370 190 400 170 400 160 Z"
          fill="url(#brGrad2)"
        />
      </svg>
    </div>
  );
}
