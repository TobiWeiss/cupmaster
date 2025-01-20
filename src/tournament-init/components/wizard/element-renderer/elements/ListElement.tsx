import { WizardElementProps } from '../ElementRenderer';

export const ListElement = ({ element: field, value, onChange }: WizardElementProps) => {
  if (!field.customComponent) {
    console.warn('ListField requires a customComponent prop');
    return null;
  }

  return field.customComponent({
    items: value ?? [],
    onChange,
    editingName: null,
    isAdding: false,
    onSetEditingName: () => {},
    onSetIsAdding: () => {}
  });
}; 