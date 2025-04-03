import { Minus, Plus } from 'lucide-react';
import { Button } from '../../../../../common/components/ui/Button';
import { Icon } from '../../../../../common/components/ui/Icon';
import { WizardElementProps } from '../ElementRenderer';
import { LargeText, SmallText } from '../../../../../common/components/typography/Text';
import { useState } from 'react';

export const NumberElement = ({ element: field, value, onChange }: WizardElementProps) => {
   const [localValue, setLocalValue] = useState<number>(value || 0);

  const handleIncrement = (inc: number) => {
    setLocalValue(Number(localValue) + inc);
    onChange(Number(localValue) + inc);
  };

  const handleDecrement = (inc: number) => {
    if (Number(localValue) <= 0) return;
    setLocalValue(Number(localValue) - inc);
    onChange(Number(localValue) - inc);
  };

  const handleChange = (value: string) => {
    if(isNaN(Number(value))) return;
    setLocalValue(Number(value));
    onChange(Number(value));
  };

  return (
    <div className="flex-col items-center justify-center gap-4">
    <div className="flex items-center justify-center gap-4 mb-5">
    <input
        type="text"
        value={localValue || ''}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full text-center text-lg px-4 py-2 pr-10 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark placeholder-custom-secondary-dark dark:placeholder-custom-secondary-light text-custom-secondary-light dark:text-custom-secondary-dark"
        data-testid={`wizard-input-${field.name}`}
      />
    </div>
    <div className="flex items-center justify-center gap-4">
      <Button variant="outline" onClick={() => handleDecrement(5)} disabled={Number(localValue) <= 5} data-testid={`wizard-input-${field.name}-decrement`}>
        <Icon icon={Minus} />
        <SmallText>5</SmallText>	
      </Button>
      <Button variant="outline" onClick={() => handleDecrement(1)} disabled={Number(localValue) <= 0} data-testid={`wizard-input-${field.name}-decrement-1`}>
        <Icon icon={Minus} />
        <SmallText>1</SmallText>	
      </Button>
     
      <Button variant="outline" onClick={() => handleIncrement(1)} data-testid={`wizard-input-${field.name}-increment`}>
        <Icon icon={Plus} />	
        <SmallText>1</SmallText>
      </Button>

      <Button variant="outline" onClick={() => handleIncrement(5)} data-testid={`wizard-input-${field.name}-increment-5`}>
        <Icon icon={Plus} />
        <SmallText>5</SmallText>	
      </Button>
    </div>
    </div>
  );
}; 