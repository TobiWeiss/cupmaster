import { useTranslation } from 'react-i18next';
import { Button } from '../../../../common/components/ui/Button';
import { WizardElementProps } from '../ElementRenderer';

export const BooleanElement = ({ element, value, onChange }: WizardElementProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex justify-center gap-4">
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
    </div>
  );
}; 