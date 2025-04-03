import { FC, ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
  color?: string;
}

export const MainHeading: FC<TextProps> = ({ children, className = '', dataTestId, color = 'text-custom-secondary-light dark:text-custom-secondary-dark' }) => (
  <h1 className={`
    text-4xl 
    font-bold 
    font-roboto
    ${color}
    ${className}
  `} data-testid={dataTestId}>
    {children}
  </h1>
);

export const SubHeading: FC<TextProps> = ({ children, className = '', dataTestId, color = 'text-custom-secondary-light dark:text-custom-secondary-dark' }) => (
  <h2 className={`
    text-xl 
    font-semibold 
    font-roboto
    ${color}
    ${className}
  `} data-testid={dataTestId}>
    {children}
  </h2>
);

export const LargeText: FC<TextProps> = ({ children, className = '', dataTestId, color = 'text-custom-secondary-light dark:text-custom-secondary-dark' }) => (
  <p className={`
    text-xl 
    font-roboto
    ${color}
    ${className}
  `} data-testid={dataTestId}>
    {children}
  </p>
);

export const SmallText: FC<TextProps> = ({ children, className = '', dataTestId, color = 'text-custom-secondary-light dark:text-custom-secondary-dark' }) => (
  <p className={`
    text-base 
    font-roboto
    ${color}
    ${className}
  `} data-testid={dataTestId}>
    {children}
  </p>
); 

export const SmallestText: FC<TextProps> = ({ children, className = '', dataTestId, color = 'text-custom-secondary-light dark:text-custom-secondary-dark' }) => (
  <p className={`
    text-xs 
    font-roboto
    ${color}
    ${className}
  `} data-testid={dataTestId}>
    {children}
  </p>
); 