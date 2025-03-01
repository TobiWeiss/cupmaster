import { WizardElementProps } from '../ElementRenderer';

export const NumberElement = ({ element: field, value, onChange }: WizardElementProps) => {
  const handleIncrement = () => {
    onChange(Number(value) + 1);
  };

  const handleDecrement = () => {
    if (Number(value) <= 0) return;
    onChange(Number(value) - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (isNaN(newValue)) return;
    onChange(newValue);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={handleDecrement}
        className="w-10 h-20 text-2xl font-bold rounded-full bg-custom-primary-light dark:bg-custom-primary-dark 
                 text-custom-contrast-text-light dark:text-custom-contrast-text-dark
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-custom-primary-light-hover dark:hover:bg-custom-primary-dark-hover
                 focus:outline-none focus:ring-2 focus:ring-custom-primary-light dark:focus:ring-custom-primary-dark"
        aria-label="Decrease value"
      >
        -
      </button>
      <input
        type="number"
        value={value || 0}
        onChange={handleInputChange}

        data-testid={`wizard-input-${field.name}`	}
        className="text-2xl w-40 bg-transparent border-b-2 border-custom-primary-light dark:border-custom-primary-dark
                 focus:outline-none focus:border-custom-primary-light-hover dark:focus:border-custom-primary-dark-hover
                 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      
      <button
        type="button"
        onClick={handleIncrement}
        className="w-10 h-20 text-2xl font-bold rounded-full bg-custom-primary-light dark:bg-custom-primary-dark
                 text-custom-contrast-text-light dark:text-custom-contrast-text-dark
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-custom-primary-light-hover dark:hover:bg-custom-primary-dark-hover
                 focus:outline-none focus:ring-2 focus:ring-custom-primary-light dark:focus:ring-custom-primary-dark"
        aria-label="Increase value"
      >
        +
      </button>
    </div>
  );
}; 