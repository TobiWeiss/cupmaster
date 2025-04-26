import { FC, useState } from 'react';
import { Tournament } from '../../types/tournament/Tournament';
import { Card } from '../../../common/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { LargeText, SmallText } from '../../../common/components/typography/Text';
import { Settings, Calendar, Users, Trophy, Save, Cross, X, Edit2, ALargeSmall, Network, Map, Clock, Binary, ListOrdered } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageInfo } from '../../../common/components/ui/PageInfo';
import { SelectInput } from './inputs/SelectInput';
import { NumberInput } from './inputs/NumberInput';
import { TiebreakerList } from './inputs/TiebreakerList';
import { TournamentFormat } from '../../types/tournament/TournamentFormat';
import { Button } from '../../../common/components/ui/Button';
import { TextInput } from './inputs/TextInput';
import { FieldList } from './inputs/FieldList';
import { DateTimeInput } from './inputs/DateTimeInput';
import { Icon } from '../../../common/components/ui/Icon';
import { Field } from '../../types/tournament/Field';

interface TournamentSettingsProps {
  tournament: Tournament;
  onSave?: (tournament: Tournament) => void;
}

export const TournamentSettings: FC<TournamentSettingsProps> = ({ tournament, onSave }) => {
  const { t } = useTranslation();
  const [editedTournament, setEditedTournament] = useState<Tournament>(tournament);
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

  const handleSave = () => {
    if (onSave) {
      onSave(editedTournament);
    }
    setIsEditing({});
  };

  const toggleEditing = (field: string) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const updateTournament = (field: string, value: any) => {
    const newTournament = { ...editedTournament } as any;

    // Handle nested properties
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'leagueConfig') {
        newTournament.config.leagueConfig[child] = value;
      }
    } else {
      // Handle direct methods
      switch (field) {
        case 'name':
          newTournament.setName(value);
          break;
        case 'format':
          newTournament.setType(value, []);
          break;
        case 'fields':
          newTournament.setFields(value);
          break;
        case 'startDate':
          newTournament.setStartDate(value);
          break;
        case 'matchesAgainstEachParticipant':
          newTournament.setMatchesAgainstEachParticipant(value, newTournament.getFormat());
          break;
        case 'matchDuration':
          newTournament.setMatchDuration(value, newTournament.getFormat());
          break;
        case 'matchBreakDuration':
          newTournament.setMatchBreakDuration(value, newTournament.getFormat());
          break;
        case 'pointsForWin':
          newTournament.setPointsForWin(value, newTournament.getFormat());
          break;
        case 'pointsForDraw':
          newTournament.setPointsForDraw(value, newTournament.getFormat());
          break;
        case 'tiebreakers':
          newTournament.setTiebreakers(value, newTournament.getFormat());
          break;
      }
    }

    setEditedTournament(newTournament);
  };

  const formatOptions = [
    { value: TournamentFormat.LEAGUE, label: t('tournamentOperation.settings.categories.basic.formats.league') },
    { value: TournamentFormat.KNOCKOUT, label: t('tournamentOperation.settings.categories.basic.formats.knockout') },
    { value: TournamentFormat.GROUP_KNOCKOUT, label: t('tournamentOperation.settings.categories.basic.formats.groupKnockout') }
  ];

  const categories = [
    {
      id: 'basic',
      title: t('tournamentOperation.settings.categories.basic.title'),
      settings: [
        {
          id: 'name',
          icon: ALargeSmall,
          label: t('tournamentOperation.settings.categories.basic.tournamentName'),
          value: editedTournament.getName(),
          editable: true,
          component: TextInput
        },
        {
          id: 'format',
          icon: Network,
          label: t('tournamentOperation.settings.categories.basic.format'),
          value: editedTournament.getFormat(),
          editable: true,
          component: SelectInput,
          options: formatOptions
        },
        {
          id: 'fields',
          icon: Map,
          label: t('tournamentOperation.settings.categories.basic.numberOfFields'),
          value: editedTournament.getFields(),
          editable: true,
          component: FieldList
        }
      ]
    },
    {
      id: 'dates',
      title: t('tournamentOperation.settings.categories.dates.title'),
      settings: [
        {
          id: 'startDate',
          icon: Clock,
          label: t('tournamentOperation.settings.categories.dates.startDate'),
          value: editedTournament.getStartDate(),
          editable: true,
          component: DateTimeInput
        },
        {
          id: 'endDate',
          icon: Clock,
          label: t('tournamentOperation.settings.categories.dates.endDate'),
          value: editedTournament.getEndDate() || new Date(),
          editable: false
        }
      ]
    }
  ];

  // Only show format-specific settings for the current format
  if (editedTournament.getFormat() === TournamentFormat.LEAGUE) {
    categories.push({
      id: 'leagueFormat',
      title: t('tournamentOperation.settings.categories.format.title'),
      settings: [
        {
          id: 'matchesAgainstEachParticipant',
          label: t('tournamentOperation.settings.categories.format.matchesAgainstEachParticipant'),
          icon: Binary,
          value: editedTournament.getMatchesAgainstEachParticipant(editedTournament.getFormat()),
          editable: true,
          component: NumberInput,
          min: 1,
          max: 4
        },
        {
          id: 'matchDuration',
          label: t('tournamentOperation.settings.categories.format.matchDuration'),
          icon: Clock,
          value: editedTournament.getMatchDuration(editedTournament.getFormat()),
          editable: true,
          component: NumberInput,
          min: 5,
          max: 90,
          unit: t('common.minutes')
        },
        {
          id: 'matchBreakDuration',
          label: t('tournamentOperation.settings.categories.format.matchBreakDuration'),
          icon: Clock,
          value: editedTournament.getMatchBreakDuration(editedTournament.getFormat()),
          editable: true,
          component: NumberInput,
          min: 0,
          max: 30,
          unit: t('common.minutes')
        },
        {
          id: 'pointsForWin',
          label: t('tournamentOperation.settings.categories.format.pointsForWin'),
          icon: Binary,
          value: editedTournament.getPointsForWin(editedTournament.getFormat()),
          editable: true,
          component: NumberInput,
          min: 1,
          max: 5
        },
        {
          id: 'pointsForDraw',
          label: t('tournamentOperation.settings.categories.format.pointsForDraw'),
          icon: Binary,
          value: editedTournament.getPointsForDraw(editedTournament.getFormat()),
          editable: true,
          component: NumberInput,
          min: 0,
          max: 3
        },
        {
          id: 'tiebreakers',
          label: t('tournamentOperation.settings.categories.format.tiebreakers'),
          icon: ListOrdered,
          value: editedTournament.getTiebreakers(editedTournament.getFormat()),
          editable: true,
          component: TiebreakerList
        }
      ]
    });
  }

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

      <div className="grid gap-4 grid-cols-10">
        {categories.map((category, categoryIndex) => (
          <motion.div
            className={categoryIndex != 2 ? 'col-span-5' : 'col-span-10'}
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <Card className="p-4 h-full">
              <div className="flex items-center gap-2 mb-4">
                <LargeText className="font-bold">{category.title}</LargeText>
              </div>
              <div className="space-y-4">
                {category.settings.map((setting: any) => (
                  <div key={setting.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-row"> 
                      <Icon className='mr-2' size="base" icon={setting?.icon ?? Map} />
                      <SmallText className="text-custom-secondary-light dark:text-custom-secondary-dark font-bold">
                        {setting.label}
                      </SmallText>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleEditing(setting.id)}
                        disabled={!setting.editable}
                      >
                        {isEditing[setting.id] ? <Icon className='mx-2' size="base" icon={X} /> : <Icon className='mx-2' size="base" icon={Edit2} />}
                      </Button>

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
                              value={setting.value}
                              onChange={(value: any) => updateTournament(setting.id, value)}
                              onSave={() => toggleEditing(setting.id)}
                              options={setting.options}
                              min={setting.min}
                              max={setting.max}
                              unit={setting.unit}
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
                          {setting.id === 'fields' ? (
                            <SmallText>{setting.value.map((val: Field) => val.getName())}</SmallText>
                          ) : setting.id === 'tiebreakers' ? (
                            <SmallText>{setting.value.map((val: string) => t('tournamentOperation.settings.tiebreakers.' + val)).join(', ')}</SmallText>
                          ) : setting.id === 'startDate' || setting.id === 'endDate' ? (
                            <SmallText>
                              {setting.value.toLocaleDateString()} {setting.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </SmallText>
                          ) : setting.id === 'format' ? (
                            <SmallText>
                              {formatOptions.find(opt => opt.value === setting.value)?.label}
                            </SmallText>
                          ) : (
                            <SmallText>{setting.value}</SmallText>
                          )}
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