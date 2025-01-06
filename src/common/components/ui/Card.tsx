import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  to?: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ to, disabled = false, children, className = '' }) => {
  const baseStyles = `
    p-8 
    bg-custom-primary-light dark:bg-custom-primary-dark 
    border border-custom-secondary-light dark:border-custom-secondary-dark 
    rounded-2xl 
    transition-all duration-300
    ${disabled ? 'opacity-50 cursor-not-allowed' : `
      hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
      dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
    `}
    shadow-[0_4px_20px_rgb(0,0,0,0.08)]
    dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
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
    <div className={baseStyles}>
      {children}
    </div>
  );
}; 