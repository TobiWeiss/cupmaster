import { FC, ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
}

export const MainHeading: FC<TextProps> = ({ children, className = '', dataTestId }) => (
  <h1 className={`
    text-4xl 
    font-bold 
    font-roboto
    text-custom-secondary-light dark:text-custom-secondary-dark 
    ${className}
  `} data-testid={dataTestId}>
    {children}
  </h1>
);

export const SubHeading: FC<TextProps> = ({ children, className = '', dataTestId }) => (
  <h2 className={`
    text-xl 
    font-semibold 
    font-roboto
    text-custom-secondary-light dark:text-custom-secondary-dark 
    ${className}
  `} data-testid={dataTestId}>
    {children}
  </h2>
);

export const LargeText: FC<TextProps> = ({ children, className = '', dataTestId }) => (
  <p className={`
    text-lg 
    font-roboto
    text-custom-secondary-light dark:text-custom-secondary-dark 
    ${className}
  `} data-testid={dataTestId}>
    {children}
  </p>
);

export const SmallText: FC<TextProps> = ({ children, className = '', dataTestId }) => (
  <p className={`
    text-base 
    font-roboto
    text-custom-secondary-light dark:text-custom-secondary-dark 
    ${className}
  `} data-testid={dataTestId}>
    {children}
  </p>
); 