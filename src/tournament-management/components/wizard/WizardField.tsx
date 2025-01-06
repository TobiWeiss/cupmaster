import { useTranslation } from 'react-i18next';
import { IWizardField } from './WizardConfig';
import { SmallText } from '../../../common/components/typography/Text';
import { Button } from '../../../common/components/ui/Button';
import { Upload, Check } from 'lucide-react';
import { Icon } from '../../../common/components/ui/Icon';

interface WizardFieldProps {
  field: IWizardField;
  value: any;
  onChange: (value: any) => void;
  isValid: boolean;
}

export const WizardField = ({ field, value, onChange, isValid }: WizardFieldProps) => {
  const { t } = useTranslation();

  const hasValue = value !== undefined && value !== '' && value !== null;
  const showValidationIcon = hasValue && isValid;

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <div className="relative flex items-center w-full">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark placeholder-custom-secondary-dark dark:placeholder-custom-secondary-light text-custom-secondary-light dark:text-custom-secondary-dark"
              required={field.required}
            />
            {showValidationIcon && (
              <Icon 
                icon={Check} 
                size="sm" 
                className="absolute right-3 text-green-500"
              />
            )}
          </div>
        );

      case 'number':
        return (
          <div className="relative flex items-center w-full">
            <input
              type="number"
              value={value || ''}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark"
              required={field.required}
            />
            {showValidationIcon && (
              <Icon 
                icon={Check} 
                size="sm" 
                className="absolute right-3 text-green-500"
              />
            )}
          </div>
        );

      case 'date':
        return (
          <div className="relative flex items-center w-full">
            <input
              type="date"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark cursor-pointer"
              required={field.required}
            />
            {showValidationIcon && (
              <Icon 
                icon={Check} 
                size="sm" 
                className="absolute right-3 text-green-500"
              />
            )}
          </div>
        );

      case 'select':
        return (
          <div className="relative flex items-center w-full">
            <select
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
              required={field.required}
            >
              <option value="">{t('common.select')}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {t(option.label)}
                </option>
              ))}
            </select>
            {showValidationIcon && (
              <Icon 
                icon={Check} 
                size="sm" 
                className="absolute right-8 text-green-500"
              />
            )}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              className="form-checkbox h-5 w-5 text-custom-third"
            />
            <span>{t(field.question)}</span>
          </label>
        );

      case 'image':
        return (
          <div className="flex items-center space-x-4 justify-center">
            {value && (
              <img
                src={value}
                alt="Preview"
                className="h-16 w-16 object-cover rounded-md"
              />
            )}
            <Button
              variant="outline"
              icon={Upload}
              onClick={() => document.getElementById(field.name)?.click()}
            >
              {t('common.upload')}
            </Button>
            <input
              id={field.name}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    onChange(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-2">
      {renderField()}
      {!isValid && field.validation?.message && (
        <SmallText className="text-custom-third">
          {t(field.validation.message)}
        </SmallText>
      )}
    </div>
  );
}; 