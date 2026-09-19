import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'auto',
  showTagline = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1.5 py-0.5',
    md: 'text-[10px] px-2 py-0.5',
    lg: 'text-xs px-2.5 py-0.5',
    xl: 'text-xs px-3 py-1',
  };

  return (
    <div className="flex items-center gap-3 select-none" id="edutrack-logo-container">
      {/* Modern Custom Geometric Emblem Logo */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-sky-500 shadow-md shadow-indigo-500/20 text-white font-bold transition-transform hover:scale-105 duration-200`}>
        {/* Crest graduation cap / geometric track lines */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5 text-white"
        >
          {/* Graduation Cap Top */}
          <path
            d="M16 4L3 11L16 18L29 11L16 4Z"
            fill="currentColor"
            fillOpacity="0.95"
          />
          {/* Cap Base Arch */}
          <path
            d="M8 15V22C8 24.5 11.58 26.5 16 26.5C20.42 26.5 24 24.5 24 22V15L16 19.5L8 15Z"
            fill="currentColor"
            fillOpacity="0.75"
          />
          {/* Tassel */}
          <path
            d="M26 13V21C26 21.5 25.5 22 25 22C24.5 22 24 21.5 24 21V13.5"
            stroke="#38BDF8"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Inner Accent Ring */}
          <circle cx="25" cy="22" r="1.5" fill="#38BDF8" />
        </svg>
        {/* Glow Pip */}
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sky-400 ring-2 ring-white dark:ring-slate-900" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight font-display ${titleSizes[size]} ${
            variant === 'dark'
              ? 'text-white'
              : variant === 'light'
              ? 'text-slate-900'
              : 'text-slate-900 dark:text-white'
          }`}>
            Edu<span className="text-indigo-600 dark:text-indigo-400">Track</span>
          </span>
          <span className={`font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 dark:border dark:border-indigo-800/60 ${badgeSizes[size]}`}>
            PORTAL
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide">
            University Student Information System
          </span>
        )}
      </div>
    </div>
  );
};
