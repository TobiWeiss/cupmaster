import { FC } from 'react';
import { motion } from 'framer-motion';
import { IGame } from '../../types/game-plan/Game';
import { IKnockoutGame } from '../../types/game-plan/KnockoutGame';
import { IGroup } from '../../types/game-plan/Group';
import { RegularGameItem } from './RegularGameItem';
import { KnockoutGameItem } from './KnockoutGameItem';

interface GameListItemProps {
  game: IGame;
  index: number;
  groups?: IGroup[] | null;
  allGames?: IGame[];
  isHighlighted?: boolean;
}

export const GameListItem: FC<GameListItemProps> = ({ game, index, groups, allGames }) => {
  // Check if game is a KnockoutGame
  const isKnockoutGame = 'getRuleForFirstParticipant' in game && typeof (game as any).getRuleForFirstParticipant === 'function';
  const knockoutGame = isKnockoutGame ? (game as IKnockoutGame) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.01 }}
    >
      {knockoutGame ? (
        <KnockoutGameItem 
          game={game} 
          knockoutGame={knockoutGame} 
          groups={groups} 
          allGames={allGames} 
        />
      ) : (
        <RegularGameItem game={game} />
      )}
    </motion.div>
  );
};
