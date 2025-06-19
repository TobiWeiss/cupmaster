import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../../common/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Save, ArrowUp, ArrowDown, X } from 'lucide-react';
import { SmallText } from '../../../../common/components/typography/Text';
import { Tiebreaker } from '../../../types/tournament/Tiebreaker';

export interface TiebreakerListProps {
  id: string;
  value: Tiebreaker[];
  onChange: (value: Tiebreaker[]) => void;
  onSave: () => void;
}

export const TiebreakerList: FC<TiebreakerListProps> = ({ id, value, onChange, onSave }) => {
  const { t } = useTranslation();
  const [tiebreakers, setTiebreakers] = useState<Tiebreaker[]>(value);
  const [availableTiebreakers, setAvailableTiebreakers] = useState<Tiebreaker[]>([
    Tiebreaker.GOAL_DIFFERENCE,
    Tiebreaker.HEAD_TO_HEAD,
    Tiebreaker.GOALS_SCORED,
  ].filter(tb => !value.includes(tb)));

  const handleAddTiebreaker = (tiebreaker: Tiebreaker) => {
    setTiebreakers([...tiebreakers, tiebreaker]);
    setAvailableTiebreakers(availableTiebreakers.filter(tb => tb !== tiebreaker));
  };

  const handleRemoveTiebreaker = (tiebreaker: Tiebreaker) => {
    setTiebreakers(tiebreakers.filter(tb => tb !== tiebreaker));
    setAvailableTiebreakers([...availableTiebreakers, tiebreaker].sort());
  };

  const handleMoveTiebreaker = (index: number, direction: 'up' | 'down') => {
    const newTiebreakers = [...tiebreakers];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= tiebreakers.length) return;
    
    const temp = newTiebreakers[index];
    newTiebreakers[index] = newTiebreakers[newIndex];
    newTiebreakers[newIndex] = temp;
    
    setTiebreakers(newTiebreakers);
  };

  const handleSave = () => {
    onChange(tiebreakers);
    onSave();
  };

  const handleCancel = () => {
    setTiebreakers(value);
    setAvailableTiebreakers([
      Tiebreaker.GOAL_DIFFERENCE,
      Tiebreaker.HEAD_TO_HEAD,
      Tiebreaker.GOALS_SCORED,
    ].filter(tb => !value.includes(tb)));
    onSave();
  };

  const getTiebreakerLabel = (tiebreaker: Tiebreaker): string => {
    switch (tiebreaker) {
      case Tiebreaker.GOAL_DIFFERENCE:
        return t('tournamentOperation.settings.tiebreakers.GOAL_DIFFERENCE');
      case Tiebreaker.HEAD_TO_HEAD:
        return t('tournamentOperation.settings.tiebreakers.HEAD_TO_HEAD');
      case Tiebreaker.GOALS_SCORED:
        return t('tournamentOperation.settings.tiebreakers.GOALS_SCORED');
      default:
        return tiebreaker;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <SmallText className="font-medium">{t('tournamentOperation.settings.tiebreakers.current')}</SmallText>
        {tiebreakers.length === 0 ? (
          <SmallText className="italic text-custom-secondary-light/70 dark:text-custom-secondary-dark/70">
            {t('tournamentOperation.settings.tiebreakers.none')}
          </SmallText>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {tiebreakers.map((tiebreaker, index) => (
              <motion.div
                key={tiebreaker}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between p-2 rounded-md border border-custom-secondary-light/20 dark:border-custom-secondary-dark/20"
              >
                <div className="flex items-center gap-2">
                  <SmallText className="font-medium">{index + 1}.</SmallText>
                  <SmallText>{getTiebreakerLabel(tiebreaker)}</SmallText>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveTiebreaker(index, 'up')}
                    disabled={index === 0}
                    icon={ArrowUp}
                    data-testid={`tiebreaker-list-move-up-${id}-${index}`}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveTiebreaker(index, 'down')}
                    disabled={index === tiebreakers.length - 1}
                    icon={ArrowDown}
                    data-testid={`tiebreaker-list-move-down-${id}-${index}`}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveTiebreaker(tiebreaker)}
                    icon={X}
                    data-testid={`tiebreaker-list-remove-${id}-${index}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {availableTiebreakers.length > 0 && (
        <div className="space-y-2">
          <SmallText className="font-medium">{t('tournamentOperation.settings.tiebreakers.available')}</SmallText>
          <div className="flex flex-wrap gap-2">
            {availableTiebreakers.map(tiebreaker => (
              <Button
                key={tiebreaker}
                variant="outline"
                size="sm"
                onClick={() => handleAddTiebreaker(tiebreaker)}
                data-testid={`tiebreaker-list-add-${id}-${tiebreaker}`}
              >
                {getTiebreakerLabel(tiebreaker)}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCancel}
          icon={X}
          data-testid={`tiebreaker-list-cancel-${id}`}
        >
          {t('common.cancel')}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSave}
          icon={Save}
          data-testid={`tiebreaker-list-save-${id}`}
        >
          {t('common.save')}
        </Button>
      </div>
    </motion.div>
  );
}; 