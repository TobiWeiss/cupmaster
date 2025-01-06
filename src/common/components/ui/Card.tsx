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
    p-4 
    bg-custom-primary-light dark:bg-custom-primary-dark 
    border border-custom-secondary-light dark:border-custom-secondary-dark 
    rounded-lg 
    transition-shadow
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
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