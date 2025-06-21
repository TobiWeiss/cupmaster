import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X, Edit2, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../../../../common/components/ui/Button';
import { SmallText } from '../../../../../common/components/typography/Text';
import { SettingsElementProps } from '../ElementRenderer';
import { motion } from 'framer-motion';
import { Field } from '../../../../types/tournament/Field';

export const FieldListElement: FC<SettingsElementProps> = ({ 
  element, 
  value, 
  onChange, 
  onSave, 
  onCancel, 
  isEditing 
}) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState<Field[]>(value || []);

  useEffect(() => {
    setLocalValue(value || []);
  }, [value]);

  const handleAddField = () => {
    const newField = new Field(`Field ${localValue.length + 1}`);
    const newFields = [...localValue, newField];
    setLocalValue(newFields);
    onChange(newFields);
  };

  const handleRemoveField = (index: number) => {
    const newFields = localValue.filter((_, i) => i !== index);
    setLocalValue(newFields);
    onChange(newFields);
  };

  const handleFieldNameChange = (index: number, name: string) => {
    const newFields = [...localValue];
    newFields[index] = new Field(name);
    setLocalValue(newFields);
    onChange(newFields);
  };

  const handleSave = () => {
    onSave(localValue);
  };

  const handleCancel = () => {
    setLocalValue(value || []);
    onCancel();
  };

  if (!isEditing) {
    return (
      <div className="flex justify-between items-center">
        <SmallText dataTestId={`setting-content-${element.id}`}>
          {element.getDisplayValue ? element.getDisplayValue(value) : localValue.map(field => field.getName()).join(', ')}
        </SmallText>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(localValue)}
          icon={Edit2}
          data-testid={`fieldlist-element-edit-${element.id}`}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-2"
    >
      <div className="space-y-2">
        {localValue.map((field, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={field.getName()}
              onChange={(e) => handleFieldNameChange(index, e.target.value)}
              data-testid={`fieldlist-element-field-${element.id}-${index}`}
              className="flex-1 px-4 py-2 text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveField(index)}
              icon={Trash2}
              data-testid={`fieldlist-element-remove-${element.id}-${index}`}
            />
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddField}
          icon={Plus}
          data-testid={`fieldlist-element-add-${element.id}`}
        >
          {t('common.add')}
        </Button>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          data-testid={`fieldlist-element-cancel-${element.id}`}
          icon={X}
        >
          {t('common.cancel')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          data-testid={`fieldlist-element-save-${element.id}`}
          icon={Save}
        >
          {t('common.save')}
        </Button>
      </div>
    </motion.div>
  );
}; 