import { FC } from 'react';
import { Tournament } from '../../types/tournament/Tournament';
import { Card } from '../../../common/components/ui/Card';
import { motion } from 'framer-motion';
import { SmallText } from '../../../common/components/typography/Text';
import { Settings, Calendar, Users, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageInfo } from '../../../common/components/ui/PageInfo';

interface TournamentSettingsProps {
  tournament: Tournament;
}

interface SettingCategory {
  id: string;
  title: string;
  icon: any;
  settings: {
    label: string;
    value: string | number;
  }[];
}

export const TournamentSettings: FC<TournamentSettingsProps> = ({ tournament }) => {
  const { t } = useTranslation();
  const categories: SettingCategory[] = [
    {
      id: 'basic',
      title: t('tournamentOperation.settings.categories.basic.title'),
      icon: Settings,
      settings: [
        { label: t('tournamentOperation.settings.categories.basic.tournamentName'), value: tournament.getName() },
        { label: t('tournamentOperation.settings.categories.basic.format'), value: tournament.getFormat() },
        { label: t('tournamentOperation.settings.categories.basic.numberOfFields'), value: tournament.getFields() }
      ]
    },
    {
      id: 'dates',
      title: t('tournamentOperation.settings.categories.dates.title'),
      icon: Calendar,
      settings: [
        { label: t('tournamentOperation.settings.categories.dates.startDate'), value: tournament.getStartDate().toLocaleDateString() },
        { label: t('tournamentOperation.settings.categories.dates.endDate'), value: tournament.getEndDate()?.toLocaleDateString() || 'Single Day' }
      ]
    },
    {
      id: 'participants',
      title: t('tournamentOperation.settings.categories.participants.title'),
      icon: Users,
      settings: [
        { label: t('tournamentOperation.settings.categories.participants.numberOfParticipants'), value: tournament.getNumberOfParticipants() },
        { label: t('tournamentOperation.settings.categories.participants.registeredParticipants'), value: tournament.getParticipants().length }
      ]
    },
    {
      id: 'format',
      title: t('tournamentOperation.settings.categories.format.title'),
      icon: Trophy,
      settings: [
        { 
          label: t('tournamentOperation.settings.categories.format.matchesAgainstEachParticipant'), 
          value: tournament.getMatchesAgainstEachParticipant(tournament.getFormat()) 
        },
        { 
          label: t('tournamentOperation.settings.categories.format.matchDuration'), 
          value: `${tournament.getMatchDuration(tournament.getFormat())} minutes` 
        }
      ]
    }
  ];

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

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <category.icon size={20} />
                <SmallText className="font-bold">{category.title}</SmallText>
              </div>
              <div className="space-y-2">
                {category.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="flex justify-between">
                    <SmallText className="text-custom-secondary-light dark:text-custom-secondary-dark">
                      {setting.label}
                    </SmallText>
                    <SmallText>{setting.value}</SmallText>
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