import { FC } from 'react';
import { motion } from 'framer-motion';
import { Game } from '../../types/game-plan/Game';
import { GameStatus } from '../../types/game-plan/GameStatus';
import { SmallText } from '../../../common/components/typography/Text';
import { MatchListItem } from './MatchListItem';
import { useTranslation } from 'react-i18next';

interface MatchListProps {
  matches: Game[];
  isLoading: boolean;
}

export const MatchList: FC<MatchListProps> = ({ matches, isLoading }) => {
  const { t } = useTranslation();
  
  if (isLoading) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8"
    >
      <div className="mb-4">
        <SmallText className="font-bold text-custom-secondary-light dark:text-custom-secondary-dark">
          {t('tournamentOperation.gamePlan.allMatches')}
        </SmallText>
      </div>

      <div className="space-y-2">
        {matches.length === 0 ? (
          <SmallText>{t('tournamentOperation.gamePlan.noMatches')}</SmallText>
        ) : (
          matches.map((match, index) => (
            <MatchListItem 
              key={match.id} 
              match={match} 
              index={index}
              isHighlighted={match.status === GameStatus.PLAYING}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}; 