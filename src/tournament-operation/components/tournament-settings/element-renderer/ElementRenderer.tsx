import { useTranslation } from 'react-i18next';
import { SmallestText } from '../../../../common/components/typography/Text';
import { fieldRegistry } from './elements/FieldRegistry';
import { ISettingsElement } from '../types';

export interface SettingsElementProps {
  element: ISettingsElement;
  value: any;
  onChange: (value: any) => void;
  onSave: (value: any) => void;
  onCancel: () => void;
  isEditing: boolean;
}

export const ElementRenderer = ({ element, value, onChange, onSave, onCancel, isEditing }: SettingsElementProps) => {
  const { t } = useTranslation();

  const renderField = () => {
    const FieldComponent = fieldRegistry[element.type];
    if (!FieldComponent) {
      console.warn(`No component found for field type: ${element.type}`);
      return null;
    }
    
    return (
      <FieldComponent 
        element={element} 
        value={value} 
        onChange={onChange}
        onSave={onSave}
        onCancel={onCancel}
        isEditing={isEditing}
      />
    );
  };

  return (
    <div className="w-full space-y-2">
      {renderField()}
    </div>
  );
}; 