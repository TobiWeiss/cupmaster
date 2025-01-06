import { FC, ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  className?: string;
}

export const MainHeading: FC<TextProps> = ({ children, className = '' }) => (
  <h1 className={`
    text-4xl 
    font-bold 
    font-roboto
    text-custom-secondary-light dark:text-custom-secondary-dark 
    ${className}
  `}>
    {children}
  </h1>
);

export const SubHeading: FC<TextProps> = ({ children, className = '' }) => (
  <h2 className={`
    text-xl 
    font-semibold 
    font-roboto
    text-custom-secondary-light dark:text-custom-secondary-dark 
    ${className}
  `}>
    {children}
  </h2>
);

export const LargeText: FC<TextProps> = ({ children, className = '' }) => (
  <p className={`
    text-lg 
    font-roboto
    text-custom-secondary-light dark:text-custom-secondary-dark 
    ${className}
  `}>
    {children}
  </p>
);

export const SmallText: FC<TextProps> = ({ children, className = '' }) => (
  <p className={`
    text-base 
    font-roboto
    text-custom-secondary-light dark:text-custom-secondary-dark 
    ${className}
  `}>
    {children}
  </p>
); 