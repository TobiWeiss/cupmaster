import { FC } from 'react';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export const Logo: FC<LogoProps> = ({ className = '', onClick }) => {
  return (
    <div className={`flex flex-col items-center cursor-pointer ${className}`} onClick={onClick}>
      <svg
        className="w-8 h-8 mb-0 text-custom-secondary-light dark:text-custom-secondary-dark"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path 
          className="animate-draw"
          d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" 
        />
        <path 
          className="animate-draw [animation-delay:200ms]"
          d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" 
        />
        <path 
          className="animate-draw [animation-delay:400ms]"
          d="M4 22h16" 
        />
        <path 
          className="animate-draw [animation-delay:600ms]"
          d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" 
        />
        <path 
          className="animate-draw [animation-delay:800ms]"
          d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" 
        />
        <path 
          d="M18 2H6v7a6 6 0 0 0 12 0V2Z" 
        />
      </svg>
      <span className="ml-2 text-lg font-bold">
        <span className="text-custom-secondary-light dark:text-custom-secondary-dark">Cup</span>
        <span className="text-custom-secondary-light dark:text-custom-secondary-dark">Master</span>
      </span>
    </div>
  );
}; 