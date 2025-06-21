import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X, Edit2 } from 'lucide-react';
import { Button } from '../../../../../common/components/ui/Button';
import { SmallText } from '../../../../../common/components/typography/Text';
import { SettingsElementProps } from '../ElementRenderer';
import { motion, AnimatePresence } from 'framer-motion';

export const TextElement: FC<SettingsElementProps> = ({ 
  element, 
  value, 
  onChange, 
  onSave, 
  onCancel, 
  isEditing 
}) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };

  const handleSave = () => {
    onSave(localValue);
  };

  const handleCancel = () => {
    setLocalValue(value || '');
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
          data-testid={`text-element-edit-${element.id}`}
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
      <div className="flex gap-2">
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          data-testid={`text-element-input-${element.id}`}
          className="w-full px-4 py-2 text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          data-testid={`text-element-cancel-${element.id}`}
          icon={X}
        >
          {t('common.cancel')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          data-testid={`text-element-save-${element.id}`}
          icon={Save}
        >
          {t('common.save')}
        </Button>
      </div>
    </motion.div>
  );
}; 