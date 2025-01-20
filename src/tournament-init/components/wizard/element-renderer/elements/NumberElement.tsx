import { easeInOut } from 'framer-motion';
import { motion } from 'framer-motion';
import { WizardElementProps } from '../ElementRenderer';
import { ValidationIcon } from './ValidationIcon';

export const NumberElement = ({ element: field, value, onChange, isValid }: WizardElementProps) => {
  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: easeInOut } }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: easeInOut } }} className="relative flex items-center w-full">
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-4 py-2 pr-10 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark placeholder-custom-secondary-dark dark:placeholder-custom-secondary-light text-custom-secondary-light dark:text-custom-secondary-dark"
        required={field.required}
        data-testid={`wizard-input-${field.name}`}
      />
      <ValidationIcon value={value} isValid={isValid} />
    </motion.div>
  );
}; 