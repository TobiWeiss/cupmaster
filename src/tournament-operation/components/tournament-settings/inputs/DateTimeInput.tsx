import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X } from 'lucide-react';
import { Button } from '../../../../common/components/ui/Button';
import { InvalidDateException } from '../exceptions';

interface DateTimeInputProps {
    id: string;
    value: Date;
    onSave: (value: Date) => void;
    onCancel: () => void;
    minDate?: Date;
    maxDate?: Date;
}

export const DateTimeInput: FC<DateTimeInputProps> = ({ id, value, onSave, onCancel, minDate, maxDate }) => {
    const { t } = useTranslation();
    const [localValue, setLocalValue] = useState(value);

    const validateDate = (newDate: Date) => {
        if (minDate && newDate < minDate) {
            throw new InvalidDateException(`Date must be after ${minDate.toLocaleString()}`);
        }
        if (maxDate && newDate > maxDate) {
            throw new InvalidDateException(`Date must be before ${maxDate.toLocaleString()}`);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        if (isNaN(newDate.getTime())) {
            throw new InvalidDateException('Please enter a valid date and time');
        }
        validateDate(newDate);
        setLocalValue(newDate);
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
                    type="datetime-local"
                    data-testid={`datetime-input-${id}`}
                    value={localValue.toISOString().slice(0, 16)}
                    onChange={handleChange}
                    className="flex-1"
                />
            </div>
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    data-testid={`datetime-input-cancel-${id}`}
                    icon={X}
                >
                    {t('common.cancel')}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    data-testid={`datetime-input-save-${id}`}
                    icon={Save}
                >
                    {t('common.save')}
                </Button>
            </div>
        </div>
    );
}; 