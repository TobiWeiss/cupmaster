import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X } from 'lucide-react';
import { Button } from '../../../../common/components/ui/Button';
import { easeInOut, motion, time } from 'framer-motion';
import { parseDateFromIsoString, parseTimeFromIsoString } from '../../../../tournament-init/utils/DateUtils';

interface DateTimeInputProps {
    id: string;
    value: Date;
    onSave: (value: Date) => void;
    onCancel: () => void;
}

export const DateTimeInput: FC<DateTimeInputProps> = ({ id, value, onSave, onCancel }) => {
    const { t } = useTranslation();
    const [localValue, setLocalValue] = useState(value);

    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
  
    const initialDate = parseDateFromIsoString(value.toISOString());
    const initialTime = parseTimeFromIsoString(value.toISOString());
  
  
    useEffect(() => {
      if (date && time) {
        const dateTime = new Date(`${date}T${time}`);
        const utcDate = new Date(Date.UTC(dateTime.getUTCFullYear(), dateTime.getUTCMonth(), dateTime.getUTCDate(), dateTime.getUTCHours(), dateTime.getUTCMinutes()));
        setLocalValue(utcDate);
  
      }
    }, [date, time]);

    const handleSave = () => {
        onSave(localValue);
    };

    const handleCancel = () => {
        setLocalValue(value);
        onCancel();
    };

   

    return (
        <div className="space-y-2">
            <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: easeInOut } }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: easeInOut } }} className="relative w-full">
      <div className="flex flex-row gap-2">
        <input
          type="date"
          value={date || initialDate || ''}
          onChange={(e) => setDate(e.target?.value)}
          className="w-full text-base px-4 py-2 pr-10 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light text-custom-secondary-light dark:text-custom-secondary-dark dark:bg-custom-primary-dark cursor-pointer placeholder-custom-secondary-dark dark:placeholder-custom-secondary-light"
          data-testid={`datetime-input-${id}-date`}
        />

        <input
          type="time"
          value={time || initialTime || ''}
          onChange={(e) => setTime(e.target?.value)}
          className="w-full text-base px-4 py-2 pr-10 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark placeholder-custom-secondary-dark dark:placeholder-custom-secondary-light text-custom-secondary-light dark:text-custom-secondary-dark"
          data-testid={`datetime-input-${id}-hour`}
        />

      </div>
    </motion.div>
   
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    data-testid={`datetime-input-cancel-${id}`}
                    icon={X}
                >
                    {t('common.cancel')}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    data-testid={`datetime-input-save-${id}`}
                    icon={Save}
                >
                    {t('common.save')}
                </Button>
            </div>
        </div>
    );
}; 