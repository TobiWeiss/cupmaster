import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../../common/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Save, Plus, Minus, X } from 'lucide-react';
import { Icon } from '../../../../common/components/ui/Icon';
import { SmallText } from '../../../../common/components/typography/Text';
import { InvalidNumberException } from '../exceptions';

interface NumberInputProps {
  id: string;
  value: number;
  onSave: (value: number) => void;
  onCancel: () => void;
  min?: number;
  max?: number;
  unit?: string;
}

export const NumberInput: FC<NumberInputProps> = ({ id, value, onSave, onCancel, min = 0, max = 100, unit }) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState(value);

  const validateValue = (newValue: number) => {
    if (min !== undefined && newValue < min) {
      throw new InvalidNumberException(`Value must be at least ${min}`);
    }
    if (max !== undefined && newValue > max) {
      throw new InvalidNumberException(`Value must be at most ${max}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) {
      throw new InvalidNumberException('Please enter a valid number');
    }
    validateValue(newValue);
    setLocalValue(newValue);
  };

  const handleIncrement = () => {
    const newValue = localValue + 1;
    validateValue(newValue);
    setLocalValue(newValue);
  };

  const handleDecrement = () => {
    const newValue = localValue - 1;
    validateValue(newValue);
    setLocalValue(newValue);
  };

  const handleSave = () => {
    onSave(localValue);
  };

  const handleCancel = () => {
    setLocalValue(value);
    onCancel();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-2"
    >
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDecrement}
          disabled={localValue <= min}
          data-testid={`number-input-decrement-${id}`}
        >
          <Icon icon={Minus} size="sm" />
        </Button>
        
        <div className="relative flex-1">
          <input
            type="number"
            value={localValue}
            onChange={handleChange}
            min={min}
            max={max}
            data-testid={`number-input-value-${id}`}
            className="w-full px-4 py-2 text-base text-center rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
          />
          {unit && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <SmallText className="text-custom-secondary-light dark:text-custom-secondary-dark">
                {unit}
              </SmallText>
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleIncrement}
          disabled={localValue >= max}
          data-testid={`number-input-increment-${id}`}
        >
          <Icon icon={Plus} size="sm" />
        </Button>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCancel}
          data-testid={`number-input-cancel-${id}`}
          icon={X}
        >
          {t('common.cancel')}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSave}
          data-testid={`number-input-save-${id}`}
          icon={Save}
        >
          {t('common.save')}
        </Button>
      </div>
    </motion.div>
  );
}; 