import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X, Edit2, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../../../../common/components/ui/Button';
import { SmallText } from '../../../../../common/components/typography/Text';
import { SettingsElementProps } from '../ElementRenderer';
import { motion } from 'framer-motion';
import { Tiebreaker } from '../../../../types/tournament/Tiebreaker';

export const TiebreakerListElement: FC<SettingsElementProps> = ({ 
  element, 
  value, 
  onChange, 
  onSave, 
  onCancel, 
  isEditing 
}) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState<string[]>(value || []);

  useEffect(() => {
    setLocalValue(value || []);
  }, [value]);

  const tiebreakerOptions = [
    { value: 'GOAL_DIFFERENCE', label: t('tournamentOperation.settings.tiebreakers.GOAL_DIFFERENCE') },
    { value: 'HEAD_TO_HEAD', label: t('tournamentOperation.settings.tiebreakers.HEAD_TO_HEAD') },
    { value: 'GOALS_SCORED', label: t('tournamentOperation.settings.tiebreakers.GOALS_SCORED') },
    { value: 'GOALS_AGAINST', label: t('tournamentOperation.settings.tiebreakers.GOALS_AGAINST') },
    { value: 'FAIR_PLAY', label: t('tournamentOperation.settings.tiebreakers.FAIR_PLAY') },
    { value: 'DRAW', label: t('tournamentOperation.settings.tiebreakers.DRAW') }
  ];

  const handleAddTiebreaker = (tiebreaker: string) => {
    if (!localValue.includes(tiebreaker)) {
      const newTiebreakers = [...localValue, tiebreaker];
      setLocalValue(newTiebreakers);
      onChange(newTiebreakers);
    }
  };

  const handleRemoveTiebreaker = (index: number) => {
    const newTiebreakers = localValue.filter((_, i) => i !== index);
    setLocalValue(newTiebreakers);
    onChange(newTiebreakers);
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
          {element.getDisplayValue ? element.getDisplayValue(value) : localValue.map(val => t('tournamentOperation.settings.tiebreakers.' + val)).join(', ')}
        </SmallText>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(localValue)}
          icon={Edit2}
          data-testid={`tiebreakerlist-element-edit-${element.id}`}
        />
      </div>
    );
  }

  const availableTiebreakers = tiebreakerOptions.filter(option => !localValue.includes(option.value));

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-2"
    >
      <div className="space-y-2">
        {localValue.map((tiebreaker, index) => (
          <div key={index} className="flex gap-2 items-center">
            <SmallText className="flex-1 px-4 py-2 bg-custom-secondary-light dark:bg-custom-secondary-dark rounded-md">
              {t('tournamentOperation.settings.tiebreakers.' + tiebreaker)}
            </SmallText>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveTiebreaker(index)}
              icon={Trash2}
              data-testid={`tiebreakerlist-element-remove-${element.id}-${index}`}
            />
          </div>
        ))}
        {availableTiebreakers.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {availableTiebreakers.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                size="sm"
                onClick={() => handleAddTiebreaker(option.value)}
                icon={Plus}
                data-testid={`tiebreakerlist-element-add-${element.id}-${option.value}`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          data-testid={`tiebreakerlist-element-cancel-${element.id}`}
          icon={X}
        >
          {t('common.cancel')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          data-testid={`tiebreakerlist-element-save-${element.id}`}
          icon={Save}
        >
          {t('common.save')}
        </Button>
      </div>
    </motion.div>
  );
}; 