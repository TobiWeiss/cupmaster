import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X, Edit2, ChevronDown } from 'lucide-react';
import { Button } from '../../../../../common/components/ui/Button';
import { SmallText } from '../../../../../common/components/typography/Text';
import { SettingsElementProps } from '../ElementRenderer';
import { motion } from 'framer-motion';

export const SelectElement: FC<SettingsElementProps> = ({ 
  element, 
  value, 
  onChange, 
  onSave, 
  onCancel, 
  isEditing 
}) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue);
    setIsOpen(false);
  };

  const handleSave = () => {
    onSave(localValue);
  };

  const handleCancel = () => {
    setLocalValue(value || '');
    onCancel();
  };

  const selectedOption = element.options?.find((opt: { value: string; label: string }) => opt.value === localValue);

  if (!isEditing) {
    return (
      <div className="flex justify-between items-center">
        <SmallText dataTestId={`setting-content-${element.id}`}>
          {element.getDisplayValue ? element.getDisplayValue(value) : selectedOption?.label || value}
        </SmallText>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(localValue)}
          icon={Edit2}
          data-testid={`select-element-edit-${element.id}`}
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
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark flex justify-between items-center"
          data-testid={`select-element-button-${element.id}`}
        >
          <span>{selectedOption?.label || t('common.select')}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-custom-primary-light dark:bg-custom-primary-dark border border-custom-secondary-light dark:border-custom-secondary-dark rounded-md shadow-lg"
          >
            {element.options?.map((option: { value: string; label: string }) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange(option.value)}
                className={`w-full px-4 py-2 text-left hover:bg-custom-secondary-light dark:hover:bg-custom-secondary-dark ${
                  option.value === localValue ? 'bg-custom-third text-white' : ''
                }`}
                data-testid={`select-element-option-${element.id}-${option.value}`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
      
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          data-testid={`select-element-cancel-${element.id}`}
          icon={X}
        >
          {t('common.cancel')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          data-testid={`select-element-save-${element.id}`}
          icon={Save}
        >
          {t('common.save')}
        </Button>
      </div>
    </motion.div>
  );
}; 