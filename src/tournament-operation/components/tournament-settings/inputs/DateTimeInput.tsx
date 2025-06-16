import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../../common/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Save, X } from 'lucide-react';

export interface DateTimeInputProps {
  id: string;
  value: Date;
  onChange: (value: Date) => void;
  onSave: () => void;
}

export const DateTimeInput: FC<DateTimeInputProps> = ({ value, onChange, onSave }) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(new Date(e.target.value));
  };

  const handleSave = () => {
    onChange(localValue);
    onSave();
  };

  const handleCancel = () => {
    setLocalValue(value);
    onSave();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-2"
    >
      <input
        type="datetime-local"
        value={localValue.toISOString().slice(0, 16)}
        onChange={handleChange}
        className="w-full px-4 py-2 text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
      />
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCancel}
          icon={X}
        >
          {t('common.cancel')}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSave}
          icon={Save}
        >
          {t('common.save')}
        </Button>
      </div>
    </motion.div>
  );
}; 