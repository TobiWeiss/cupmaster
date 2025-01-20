import { useTranslation } from 'react-i18next';
import { Button } from '../../../../../common/components/ui/Button';
import { WizardElementProps } from '../ElementRenderer';
import { easeInOut } from 'framer-motion';
import { motion } from 'framer-motion';

export const BooleanElement = ({ element, value, onChange }: WizardElementProps) => {
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: easeInOut } }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: easeInOut } }} className="relative flex justify-center gap-4">
      <Button
        variant={value === true ? "primary" : "outline"}
        onClick={() => onChange(true)}
        className={`w-32 ${value === true ? 'ring-2 ring-custom-third' : ''}`}
        data-testid={`wizard-button-yes-${element.name}`}
      >
        {t('common.yes')}
      </Button>
      <Button
        variant={value === false ? "primary" : "outline"}
        onClick={() => onChange(false)}
        className={`w-32 ${value === false ? 'ring-2 ring-custom-third' : ''}`}
        data-testid={`wizard-button-no-${element.name}`}
      >
        {t('common.no')}
      </Button>
    </motion.div>
  );
}; 