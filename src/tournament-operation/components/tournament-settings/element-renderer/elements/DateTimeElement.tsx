import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X, Edit2 } from 'lucide-react';
import { Button } from '../../../../../common/components/ui/Button';
import { SmallText } from '../../../../../common/components/typography/Text';
import { SettingsElementProps } from '../ElementRenderer';
import { motion } from 'framer-motion';

export const DateTimeElement: FC<SettingsElementProps> = ({ 
  element, 
  value, 
  onChange, 
  onSave, 
  onCancel, 
  isEditing 
}) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState(value || new Date());

  useEffect(() => {
    setLocalValue(value || new Date());
  }, [value]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const timeValue = (localValue as Date).toTimeString().slice(0, 5);
    const newDateTime = new Date(`${dateValue}T${timeValue}`);
    setLocalValue(newDateTime);
    onChange(newDateTime);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    const dateValue = (localValue as Date).toISOString().split('T')[0];
    const newDateTime = new Date(`${dateValue}T${timeValue}`);
    setLocalValue(newDateTime);
    onChange(newDateTime);
  };

  const handleSave = () => {
    onSave(localValue);
  };

  const handleCancel = () => {
    setLocalValue(value || new Date());
    onCancel();
  };

  const formatDateTime = (date: Date) => {
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return `${localDate.toLocaleDateString()} ${localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  if (!isEditing) {
    return (
      <div className="flex justify-between items-center">
        <SmallText dataTestId={`setting-content-${element.id}`}>
          {element.getDisplayValue ? element.getDisplayValue(value) : formatDateTime(value as Date)}
        </SmallText>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(localValue)}
          icon={Edit2}
          data-testid={`datetime-element-edit-${element.id}`}
        />
      </div>
    );
  }

  const dateValue = (localValue as Date).toISOString().split('T')[0];
  const timeValue = (localValue as Date).toTimeString().slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-2"
    >
      <div className="flex gap-2">
        <input
          type="date"
          value={dateValue}
          onChange={handleDateChange}
          data-testid={`datetime-element-date-${element.id}`}
          className="flex-1 px-4 py-2 text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
        />
        <input
          type="time"
          value={timeValue}
          onChange={handleTimeChange}
          data-testid={`datetime-element-time-${element.id}`}
          className="flex-1 px-4 py-2 text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          data-testid={`datetime-element-cancel-${element.id}`}
          icon={X}
        >
          {t('common.cancel')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          data-testid={`datetime-element-save-${element.id}`}
          icon={Save}
        >
          {t('common.save')}
        </Button>
      </div>
    </motion.div>
  );
}; 