import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { Icon } from '../../../../../common/components/ui/Icon';
import { WizardElementProps } from '../ElementRenderer';
import { motion } from 'framer-motion';
import { easeInOut } from 'framer-motion';

export const SelectElement = ({ element: field, value, onChange }: WizardElementProps) => {
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: easeInOut } }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: easeInOut } }} className="relative flex items-center w-full">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-base px-4 py-2 pr-10 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark appearance-none"
        required={field.required}
        data-testid={`wizard-select-${field.name}`}
      >
        <option value="">{t('common.select')}</option>
        {field.options?.map(option => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon icon={ChevronDown} size="sm" className="text-custom-secondary-light dark:text-custom-secondary-dark" />
      </div>
    </motion.div>
  );
}; 