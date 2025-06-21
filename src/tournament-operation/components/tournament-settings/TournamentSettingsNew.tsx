import { FC, useState, useEffect } from 'react';
import { Tournament } from '../../types/tournament/Tournament';
import { Card } from '../../../common/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { LargeText } from '../../../common/components/typography/Text';
import { useTranslation } from 'react-i18next';
import { PageInfo } from '../../../common/components/ui/PageInfo';
import { Icon } from '../../../common/components/ui/Icon';
import { TournamentFormat } from '../../types/tournament/TournamentFormat';
import { createSettingsElements, createLeagueFormatElements } from './config';
import { ISettingsElement } from './types';
import { cloneDeep } from 'lodash';
import { useNotify } from '../../../common/hooks/useNotify';
import { NotificationType } from '../../../common/types/NotifficationTypes';
import { ValidationException } from '../../types/tournament/exceptions';
import { ElementRenderer } from './element-renderer/ElementRenderer';

interface TournamentSettingsProps {
  tournament: Tournament;
  onSave?: (tournament: Tournament) => Promise<boolean>;
}

export const TournamentSettingsNew: FC<TournamentSettingsProps> = ({ tournament, onSave }) => {
  const { t } = useTranslation();
  const { showNotification } = useNotify();
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const [editedTournament, setEditedTournament] = useState<Tournament>(Tournament.fromObject(cloneDeep(tournament.toObject())));

  // Update editedTournament when parent tournament changes
  useEffect(() => {
    setEditedTournament(Tournament.fromObject(cloneDeep(tournament.toObject())));
  }, [tournament]);

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

  const handleCancel = (field: string) => {
    closeEdit(field);
  };

  const handleSave = async (field: string, value: any) => {
    try {
      // Find the element and call its onChange
      const allElements = [...createSettingsElements(t)];
      if (editedTournament.getFormat() === TournamentFormat.LEAGUE) {
        allElements.push(...createLeagueFormatElements(t));
      }
      
      const element = allElements.find(el => el.id === field);
      if (element) {
        element.onChange(editedTournament, value);
        setEditedTournament(editedTournament);
      
        if (onSave) {
          const success = await onSave(editedTournament);
          if (!success) {
            rollbackTournament();
          } else {
            closeEdit(field);
          }
        } else {
          closeEdit(field);
        }
      }
    } catch (error) {
      console.log('error', error);
      if (error instanceof ValidationException) {
        showNotification(error.message, NotificationType.WARNING);
      } else {
        showNotification(t('common.error.unknown'), NotificationType.ERROR);
      }
      rollbackTournament();
      closeEdit(field);
    }
  };

  const rollbackTournament = () => {
    setEditedTournament(Tournament.fromObject(cloneDeep(tournament.toObject())));
  }

  const getSettingValue = (element: ISettingsElement) => {
    switch (element.id) {
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
        return editedTournament.getTiebreakers(editedTournament.getFormat()).map((tb: any) => tb.toString());
      default:
        return null;
    }
  };

  const allElements = [...createSettingsElements(t)];
  if (editedTournament.getFormat() === TournamentFormat.LEAGUE) {
    allElements.push(...createLeagueFormatElements(t));
  }

  return (
    <motion.div
      data-testid="tournament-settings"
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
        <Card className="p-4 h-full">
          <div className="flex items-center gap-2 mb-4">
            <LargeText className="font-bold">{t('tournamentOperation.settings.categories.basic.title')}</LargeText>
          </div>
          <div className="space-y-4">
            {allElements.filter(el => ['name', 'format', 'fields'].includes(el.id)).map((element) => (
              <div key={element.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className='mr-2' size="base" icon={element.icon} />
                  <LargeText className="text-custom-secondary-light dark:text-custom-secondary-dark font-bold">
                    {element.label}
                  </LargeText>
                </div>
                <ElementRenderer
                  element={element}
                  value={getSettingValue(element)}
                  onChange={(value) => {
                    if (element.editable) {
                      openEdit(element.id);
                    }
                  }}
                  onSave={(value) => handleSave(element.id, value)}
                  onCancel={() => handleCancel(element.id)}
                  isEditing={isEditing[element.id] || false}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 h-full">
          <div className="flex items-center gap-2 mb-4">
            <LargeText className="font-bold">{t('tournamentOperation.settings.categories.dates.title')}</LargeText>
          </div>
          <div className="space-y-4">
            {allElements.filter(el => ['startDate', 'endDate'].includes(el.id)).map((element) => (
              <div key={element.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className='mr-2' size="base" icon={element.icon} />
                  <LargeText className="text-custom-secondary-light dark:text-custom-secondary-dark font-bold">
                    {element.label}
                  </LargeText>
                </div>
                <ElementRenderer
                  element={element}
                  value={getSettingValue(element)}
                  onChange={(value) => {
                    if (element.editable) {
                      openEdit(element.id);
                    }
                  }}
                  onSave={(value) => handleSave(element.id, value)}
                  onCancel={() => handleCancel(element.id)}
                  isEditing={isEditing[element.id] || false}
                />
              </div>
            ))}
          </div>
        </Card>

        {editedTournament.getFormat() === TournamentFormat.LEAGUE && (
          <Card className="p-4 col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <LargeText className="font-bold">{t('tournamentOperation.settings.categories.format.title')}</LargeText>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {allElements.filter(el => ['matchesAgainstEachParticipant', 'matchDuration', 'matchBreakDuration', 'pointsForWin', 'pointsForDraw', 'tiebreakers'].includes(el.id)).map((element) => (
                <div key={element.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className='mr-2' size="base" icon={element.icon} />
                    <LargeText className="text-custom-secondary-light dark:text-custom-secondary-dark font-bold">
                      {element.label}
                    </LargeText>
                  </div>
                  <ElementRenderer
                    element={element}
                    value={getSettingValue(element)}
                    onChange={(value) => {
                      if (element.editable) {
                        openEdit(element.id);
                      }
                    }}
                    onSave={(value) => handleSave(element.id, value)}
                    onCancel={() => handleCancel(element.id)}
                    isEditing={isEditing[element.id] || false}
                  />
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </motion.div>
  );
}; 