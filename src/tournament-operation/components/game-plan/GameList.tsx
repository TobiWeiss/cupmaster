import { FC } from 'react';
import { easeIn, easeInOut, motion } from 'framer-motion';
import { Game, IGame } from '../../types/game-plan/Game';
import { GameStatus } from '../../types/game-plan/GameStatus';
import { SmallText } from '../../../common/components/typography/Text';
import { GameListItem } from './GameListItem';
import { useTranslation } from 'react-i18next';

interface GameListProps {
  games: IGame[];
  isLoading: boolean;
}

export const GameList: FC<GameListProps> = ({ games, isLoading }) => {
  const { t } = useTranslation();
  
  if (isLoading) {
    return null;
  }
  
  return (
      <div className="space-y-2">
        {games.length === 0 ? (
          <SmallText>{t('tournamentOperation.gamePlan.noMatches')}</SmallText>
        ) : (
          games.map((game, index) => (
            <motion.div
            key={game.getId()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.005, delay: index * 0.008, ease: easeIn } }}
            className="mt-8 mx-8"
          >
            <GameListItem 
              key={game.getId()} 
              game={game} 
              index={index}
              isHighlighted={game.getStatus() === GameStatus.PLAYING}
            />
          </motion.div>
          ))
        )}
      </div>
  );
}; 