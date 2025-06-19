import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X } from 'lucide-react';
import { Button } from '../../../../common/components/ui/Button';

export interface TextInputProps {
  id: string;
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  maxLength?: number;
  minLength?: number;
}

export const TextInput: FC<TextInputProps> = ({ id, value, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleSave = () => {
    onSave(localValue);
  };

  const handleCancel = () => {
    setLocalValue(value);
    onCancel();
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          data-testid={`text-input-${id}`}
          className="w-full px-4 py-2 text-base rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          data-testid={`text-input-cancel-${id}`}
          icon={X}
        >
          {t('common.cancel')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          data-testid={`text-input-save-${id}`}
          icon={Save}
        >
          {t('common.save')}
        </Button>
      </div>
    </div>
  );
}; 