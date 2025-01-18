import { WizardElementProps } from '../ElementRenderer';
import { ValidationIcon } from './ValidationIcon';

export const NumberElement = ({ element: field, value, onChange, isValid }: WizardElementProps) => {
  return (
    <div className="relative flex items-center w-full">
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-4 py-2 pr-10 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark"
        required={field.required}
        data-testid={`wizard-input-${field.name}`}
      />
      <ValidationIcon value={value} isValid={isValid} />
    </div>
  );
}; 