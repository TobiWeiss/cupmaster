import { FC, useState } from 'react';
import { Tournament } from '../../types/tournament/Tournament';
import { Card } from '../../../common/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { LargeText, SmallText } from '../../../common/components/typography/Text';
import { useTranslation } from 'react-i18next';
import { PageInfo } from '../../../common/components/ui/PageInfo';
import { Icon } from '../../../common/components/ui/Icon';
import { TournamentFormat } from '../../types/tournament/TournamentFormat';
import { createSettingsConfig, createLeagueFormatSettings } from './config';
import { Map } from 'lucide-react';
import { Setting } from './types';

interface TournamentSettingsProps {
  tournament: Tournament;
  onSave?: (tournament: Tournament) => void;
}

export const TournamentSettings: FC<TournamentSettingsProps> = ({ tournament, onSave }) => {
  const { t } = useTranslation();
  const [editedTournament, setEditedTournament] = useState<Tournament>(tournament);
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

  const openEdit = (field: string) => {
    if(isEditing[field]) {
      return;
    }
    setIsEditing(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const closeEdit = (field: string) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const updateTournament = (onChange: (tournament: Tournament, value: any) => void, value: any) => {
    const newTournament = Tournament.fromObject({ ...editedTournament.toObject() });
    onChange(newTournament, value);
    setEditedTournament(newTournament);
    if (onSave) {
      onSave(newTournament);
    }
  };

  const categories = createSettingsConfig(t);
  
  // Only show format-specific settings for the current format
  if (editedTournament.getFormat() === TournamentFormat.LEAGUE) {
    categories.push(createLeagueFormatSettings(t));
  }

  const getSettingValue = (setting: Setting) => {
    switch (setting.id) {
      case 'name':
        return editedTournament.getName();
      case 'format':
        return editedTournament.getFormat();
      case 'fields':
        return editedTournament.getFields();
      case 'startDate':
        return editedTournament.getStartDate();
      case 'endDate':
        return editedTournament.getEndDate() || new Date();
      case 'matchesAgainstEachParticipant':
        return editedTournament.getMatchesAgainstEachParticipant(editedTournament.getFormat());
      case 'matchDuration':
        return editedTournament.getMatchDuration(editedTournament.getFormat());
      case 'matchBreakDuration':
        return editedTournament.getMatchBreakDuration(editedTournament.getFormat());
      case 'pointsForWin':
        return editedTournament.getPointsForWin(editedTournament.getFormat());
      case 'pointsForDraw':
        return editedTournament.getPointsForDraw(editedTournament.getFormat());
      case 'tiebreakers':
        return editedTournament.getTiebreakers(editedTournament.getFormat());
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <PageInfo
        title={t('tournamentOperation.settings.title')}
        description={t('tournamentOperation.settings.description')}
        className="my-10"
      />

      <div className="grid gap-4 grid-cols-2">
        {categories.map((category, categoryIndex) => (
          <motion.div
            className={categoryIndex === categories.length - 1 ? 'col-span-2' : 'col-span-1'}
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <Card className="p-4 h-full">
              <div className="flex items-center gap-2 mb-4">
                <LargeText className="font-bold">{category.title}</LargeText>
              </div>
              <div className={categoryIndex === categories.length - 1 ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
                {category.settings.map((setting) => (
                  <div key={setting.id} className="space-y-2 cursor-pointer" onClick={() => openEdit(setting.id)}>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-row"> 
                        <Icon className='mr-2' size="base" icon={setting?.icon ?? Map} />
                        <SmallText className="text-custom-secondary-light dark:text-custom-secondary-dark font-bold">
                          {setting.label}
                        </SmallText>
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      {isEditing[setting.id] && setting.editable ? (
                        <motion.div
                          key={`edit-${setting.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {setting.component && (
                            <setting.component
                              id={setting.id}
                              value={getSettingValue(setting)}
                              onChange={(value: any) => updateTournament(setting.onChange, value)}
                              onSave={() => closeEdit(setting.id)}
                              {...('options' in setting ? { options: setting.options } : {})}
                              {...('min' in setting ? { min: setting.min } : {})}
                              {...('max' in setting ? { max: setting.max } : {})}
                              {...('unit' in setting ? { unit: setting.unit } : {})}
                            />
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`display-${setting.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <SmallText>
                            {setting.getDisplayValue(getSettingValue(setting))}
                          </SmallText>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 