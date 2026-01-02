import { FC, useMemo } from 'react';
import { easeIn, motion } from 'framer-motion';
import { IGame } from '../../types/game-plan/Game';
import { GameStatus } from '../../types/game-plan/GameStatus';
import { SmallText, LargeText } from '../../../common/components/typography/Text';
import { GameListItem } from './GameListItem';
import { useTranslation } from 'react-i18next';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { IKnockoutGame, KnockoutGame } from '../../types/game-plan/KnockoutGame';
import { IGroup } from '../../types/game-plan/Group';

interface GameListProps {
  games: IGame[];
  isLoading: boolean;
  groups?: IGroup[] | null;
  onReorderGames?: (sourceIndex: number, destinationIndex: number) => void;
}

export const GameList: FC<GameListProps> = ({ games, isLoading, groups, onReorderGames }) => {
  const { t } = useTranslation();
  
  // Set up sensors for different input methods
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group games by round for knockout games
  const gamesWithRounds = useMemo(() => {
    return games.map((game, index) => {
      const isKnockoutGame = KnockoutGame.isKnockoutGame(game);
      const round = isKnockoutGame ? (game as IKnockoutGame).getRound() : null;
      return { game, index, round };
    });
  }, [games]);

  // Determine if we should show round separators (only if there are knockout games)
  const hasKnockoutGames = gamesWithRounds.some(item => item.round !== null);

  // Helper function to get round translation key
  const getRoundTranslationKey = (round: string | null): string => {
    if (!round) return '';
    return `tournamentOperation.gamePlan.rounds.${round}`;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Find the indices based on the ids
      const activeIndex = games.findIndex(game => `game-${game.getId()}` === active.id);
      const overIndex = games.findIndex(game => `game-${game.getId()}` === over.id);
      
      if (activeIndex !== -1 && overIndex !== -1 && onReorderGames) {
        onReorderGames(activeIndex, overIndex);
      }
    }
  };
  
  if (isLoading) {
    return null;
  }
  
  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-2">
        {games.length === 0 ? (
          <SmallText>{t('tournamentOperation.gamePlan.noMatches')}</SmallText>
        ) : (
          <SortableContext 
            items={games.map(game => `game-${game.getId()}`)}
            strategy={verticalListSortingStrategy}
          >
            {gamesWithRounds.map(({ game, index, round }, itemIndex) => {
              const previousRound = itemIndex > 0 ? gamesWithRounds[itemIndex - 1].round : null;
              const showSeparator = hasKnockoutGames && round !== null && round !== previousRound;
              
              return (
                <div key={`game-wrapper-${game.getId()}`}>
                  {showSeparator && (
                    <div className="mt-12 mb-6 mx-8">
                      <LargeText className="font-bold" data-testid={`round-separator-${round}`}>
                        {t(getRoundTranslationKey(round))}
                      </LargeText>
                    </div>
                  )}
                  <motion.div
                    key={`animation-key-${game.getId()}`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1, 
                      transition: { duration: 0.005, delay: index * 0.008, ease: easeIn }
                    }}
                    className="mt-8 mx-8"
                  >
                    <SortableItem id={`game-${game.getId()}`}>
                      <GameListItem 
                        key={game.getId()} 
                        game={game} 
                        index={index}
                        groups={groups}
                        allGames={games}
                        isHighlighted={game.getStatus() === GameStatus.PLAYING}
                      />
                    </SortableItem>
                  </motion.div>
                </div>
              );
            })}
          </SortableContext>
        )}
      </div>
    </DndContext>
  );
}; 