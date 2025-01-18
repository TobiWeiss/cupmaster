import { Check } from 'lucide-react';
import { Icon } from '../../../../common/components/ui/Icon';

interface ValidationIconProps {
  value: any;
  isValid: boolean;
}

export const ValidationIcon = ({ value, isValid }: ValidationIconProps) => {
  const hasValue = value !== undefined && value !== '' && value !== null;
  const showValidationIcon = hasValue && isValid;

  if (!showValidationIcon) return null;

  return (
    <Icon 
      icon={Check} 
      size="sm" 
      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 z-10"
    />
  );
};