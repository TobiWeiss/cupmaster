import { FC } from 'react';
import { motion } from 'framer-motion';
import { Game } from '../../types/game-plan/Game';
import { GameStatus } from '../../types/game-plan/GameStatus';
import { SmallText } from '../../../common/components/typography/Text';
import { MatchCard } from './MatchCard';
import { useTranslation } from 'react-i18next';

interface CurrentGamesProps {
  matches: Game[];
  isLoading: boolean;
}

export const CurrentGames: FC<CurrentGamesProps> = ({ matches, isLoading }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <div className="mb-4">
        <SmallText className="font-bold text-custom-secondary-light dark:text-custom-secondary-dark">
          {t('tournamentOperation.gamePlan.currentAndUpcoming')}
        </SmallText>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-8 h-8 border-4 border-custom-secondary-light dark:border-custom-secondary-dark rounded-full border-t-transparent"
          />
        </div>
      ) : matches.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-6"
        >
          <SmallText>{t('tournamentOperation.gamePlan.noUpcomingMatches')}</SmallText>
        </motion.div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {matches.map((match, index) => (
            <MatchCard 
              key={match.id} 
              match={match} 
              index={index} 
              groupName={index % 2 === 0 ? "Group A" : "Group B"} 
              compact={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 