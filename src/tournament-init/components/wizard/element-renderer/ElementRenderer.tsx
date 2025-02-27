import { useTranslation } from 'react-i18next';
import { IWizardElement } from '../WizardConfig';
import { SmallestText } from '../../../../common/components/typography/Text';
import { fieldRegistry } from './elements/FieldRegistry';

export interface WizardElementProps {
  element: IWizardElement;
  value: any;
  onChange: (value: any) => void;
  isValid: boolean;
}

export const ElementRenderer = ({ element: field, value, onChange, isValid }: WizardElementProps) => {
  const { t } = useTranslation();
  
 

  const renderField = () => {
    const FieldComponent = fieldRegistry[field.type];
    return <FieldComponent element={field} value={value} onChange={onChange} isValid={isValid}/>;
  };

  return (
    <div className="w-full space-y-2">
      {renderField()}
      {!isValid && field.validation?.message && (
        <SmallestText className="text-custom-third pt-6" dataTestId="wizard-validation-message">
          {t(field.validation.message)}
        </SmallestText>
      )}
    </div>
  );
}; 