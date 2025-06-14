import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../../common/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Save } from 'lucide-react';

export interface DateTimeInputProps {
  id: string;
  value: Date;
  onChange: (value: Date) => void;
  onSave: () => void;
}

export const DateTimeInput: FC<DateTimeInputProps> = ({ value, onChange, onSave }) => {
  const { t } = useTranslation();
  
  // Convert UTC to local for display
  const localDate = new Date(value.getTime() + value.getTimezoneOffset() * 60000);
  const [date, setDate] = useState(localDate.toISOString().split('T')[0]);
  const [time, setTime] = useState(
    `${localDate.getHours().toString().padStart(2, '0')}:${localDate.getMinutes().toString().padStart(2, '0')}`
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleSave = () => {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    
    // Create date in local timezone
    const localDateTime = new Date(year, month - 1, day, hours, minutes);
    
    // Convert to UTC
    const utcDateTime = new Date(
      Date.UTC(
        localDateTime.getFullYear(),
        localDateTime.getMonth(),
        localDateTime.getDate(),
        localDateTime.getHours(),
        localDateTime.getMinutes()
      )
    );

    onChange(utcDateTime);
    onSave();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-2"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="flex-1 px-4 py-2 text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
        />
        <input
          type="time"
          value={time}
          onChange={handleTimeChange}
          className="flex-1 px-4 py-2 text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
        />
      </div>
      <div className="flex justify-end">
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