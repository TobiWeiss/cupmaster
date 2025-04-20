import React from 'react';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  to?: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = React.forwardRef(({ to, disabled = false, children, className = '' }, ref) => {
  const baseStyles = `
    p-8 
    bg-custom-primary-light dark:bg-custom-primary-dark
    bg-opacity-80 dark:bg-opacity-50
    border border-custom-secondary-light dark:border-custom-secondary-dark 
    rounded-2xl 
    transition-all duration-300
    flex
    flex-col
  
    ${disabled ? 'opacity-30 cursor-not-allowed' : `
      hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
      dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
    `}
    shadow-[0_4px_20px_rgb(0,0,0,0.08)]
    dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
    justify-between
    ${className}
  `;

  if (to && !disabled) {
    return (
      <Link to={to} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <div className={baseStyles} ref={ref as React.RefObject<HTMLDivElement>}>
      {children}
    </div>
  );
});