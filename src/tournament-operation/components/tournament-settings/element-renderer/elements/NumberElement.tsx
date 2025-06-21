import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X, Edit2, Minus, Plus } from 'lucide-react';
import { Button } from '../../../../../common/components/ui/Button';
import { SmallText } from '../../../../../common/components/typography/Text';
import { SettingsElementProps } from '../ElementRenderer';
import { motion } from 'framer-motion';

export const NumberElement: FC<SettingsElementProps> = ({ 
  element, 
  value, 
  onChange, 
  onSave, 
  onCancel, 
  isEditing 
}) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState(value || 0);

  useEffect(() => {
    setLocalValue(value || 0);
  }, [value]);

  const handleIncrement = (inc: number) => {
    const newValue = Number(localValue) + inc;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleDecrement = (dec: number) => {
    const newValue = Math.max(0, Number(localValue) - dec);
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleChange = (value: string) => {
    if (isNaN(Number(value))) return;
    const numValue = Number(value);
    setLocalValue(numValue);
    onChange(numValue);
  };

  const handleSave = () => {
    onSave(localValue);
  };

  const handleCancel = () => {
    setLocalValue(value || 0);
    onCancel();
  };

  if (!isEditing) {
    return (
      <div className="flex justify-between items-center">
        <SmallText dataTestId={`setting-content-${element.id}`}>
          {element.getDisplayValue ? element.getDisplayValue(value) : value}
        </SmallText>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(localValue)}
          icon={Edit2}
          data-testid={`number-element-edit-${element.id}`}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDecrement(1)}
          icon={Minus}
          data-testid={`number-element-decrement-${element.id}`}
        />
        <input
          type="number"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          min={element.min || 0}
          max={element.max || 999}
          data-testid={`number-element-input-${element.id}`}
          className="w-full px-4 py-2 text-center text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleIncrement(1)}
          icon={Plus}
          data-testid={`number-element-increment-${element.id}`}
        />
        {element.unit && (
          <SmallText className="text-custom-secondary-light dark:text-custom-secondary-dark">
            {element.unit}
          </SmallText>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          data-testid={`number-element-cancel-${element.id}`}
          icon={X}
        >
          {t('common.cancel')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          data-testid={`number-element-save-${element.id}`}
          icon={Save}
        >
          {t('common.save')}
        </Button>
      </div>
    </motion.div>
  );
}; 