import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import { Icon } from './Icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'base' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'base',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md transition-colors';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    base: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const variantStyles = {
    primary: `
      bg-custom-fourth text-white
      hover:bg-custom-fourth/90
      disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
    `,
    secondary: `
      bg-custom-third text-white
      hover:bg-custom-third/90
      disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
    `,
    outline: `
      border border-custom-secondary-light dark:border-custom-secondary-dark
      text-custom-secondary-light dark:text-custom-secondary-dark
      hover:bg-custom-secondary-light/10 dark:hover:bg-custom-secondary-dark/10
      disabled:opacity-50 disabled:cursor-not-allowed
    `
  };

  const iconSize = {
    sm: 'xs',
    base: 'sm',
    lg: 'base'
  } as const;

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <Icon 
          icon={icon} 
          size={iconSize[size]} 
          className={children ? 'mr-2' : ''} 
        />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Icon 
          icon={icon} 
          size={iconSize[size]} 
          className={children ? 'ml-2' : ''} 
        />
      )}
    </button>
  );
}; 