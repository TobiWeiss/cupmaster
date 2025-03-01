import { easeInOut } from 'framer-motion';
import { motion } from 'framer-motion';
import { WizardElementProps } from '../ElementRenderer';
import { ValidationIcon } from './ValidationIcon';
import { useEffect, useState } from 'react';
import { parseDateFromIsoString, parseTimeFromIsoString } from '../../../../utils/DateUtils';



// value  is an ISO string in UTC
export const DateTimeElement = ({ element: field, value, onChange, isValid }: WizardElementProps) => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const initialDate = parseDateFromIsoString(value);
  const initialTime = parseTimeFromIsoString(value);


  useEffect(() => {
    if (date && time) {
      const dateTime = new Date(`${date}T${time}`);
      // make this UTC
      const utcDate = new Date(Date.UTC(dateTime.getUTCFullYear(), dateTime.getUTCMonth(), dateTime.getUTCDate(), dateTime.getUTCHours(), dateTime.getUTCMinutes()));
      onChange(utcDate.toISOString());

    }
  }, [date, time]);



  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: easeInOut } }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: easeInOut } }} className="relative flex items-center justify-center w-full">
      <div className="flex flex-row gap-2">
        <input
          type="date"
          value={date || initialDate || ''}
          onChange={(e) => setDate(e.target?.value)}
          className="w-full px-4 py-2 pr-10 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light text-custom-secondary-light dark:text-custom-secondary-dark dark:bg-custom-primary-dark cursor-pointer placeholder-custom-secondary-dark dark:placeholder-custom-secondary-light"
          required={field.required}
          data-testid={`wizard-input-${field.name}-date`}
        />

        <input
          type="time"
          value={time || initialTime || ''}
          onChange={(e) => setTime(e.target?.value)}
          className="w-full px-4 py-2 pr-10 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark placeholder-custom-secondary-dark dark:placeholder-custom-secondary-light text-custom-secondary-light dark:text-custom-secondary-dark"
          data-testid={`wizard-input-${field.name}-hour`}
        />

      </div>
      <ValidationIcon value={value} isValid={isValid} />
    </motion.div>
  );
}; 