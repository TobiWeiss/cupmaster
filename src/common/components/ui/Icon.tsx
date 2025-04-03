import { FC } from 'react';
import { LucideIcon } from 'lucide-react';

type IconSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

interface IconProps {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
  color?: string;
}

const sizeMap: Record<IconSize, string> = {
  'xs': 'w-[1.5vh] h-[1.5vh]',
  'sm': 'w-[2vh] h-[2vh]',
  'base': 'w-[2.5vh] h-[2.5vh]',
  'lg': 'w-[3vh] h-[3vh]',
  'xl': 'w-[3.5vh] h-[3.5vh]',
  '2xl': 'w-[4vh] h-[4vh]',
  '3xl': 'w-[4.5vh] h-[4.5vh]',
  '4xl': 'w-[5vh] h-[5vh]',
};

export const Icon: FC<IconProps> = ({ 
  icon: IconComponent, 
  size = 'base',
  color = 'text-custom-secondary-light dark:text-custom-secondary-dark',
  className = '',
}) => {
  return (
    <IconComponent 
      className={`${sizeMap[size]} ${className} ${color}`}
    />
  );
}; 