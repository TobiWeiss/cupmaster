import { FC } from 'react';
import { Tournament } from '../../../tournament-init/types/tournament';
import { Card } from '../../../common/components/ui/Card';
import { motion } from 'framer-motion';
import { LargeText, SmallText } from '../../../common/components/typography/Text';
import { useTranslation } from 'react-i18next';

interface GamePlanOverviewProps {
  tournament: Tournament;
}

export const GamePlanOverview: FC<GamePlanOverviewProps> = () => {
  const { t } = useTranslation();

  // Dummy data for now
  const dummyMatches = [
    { id: 1, homeTeam: 'Team A', awayTeam: 'Team B', date: new Date(), field: 1 },
    { id: 2, homeTeam: 'Team C', awayTeam: 'Team D', date: new Date(), field: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <LargeText>{t('tournamentOperation.gamePlan.title')}</LargeText>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dummyMatches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <SmallText className="font-bold">
                {match.homeTeam} vs {match.awayTeam}
              </SmallText>
              <SmallText>
                {t('tournamentOperation.gamePlan.field')}: {match.field}
              </SmallText>
              <SmallText>
                {match.date.toLocaleString()}
              </SmallText>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 