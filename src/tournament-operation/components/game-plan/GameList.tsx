import { FC } from 'react';
import { easeIn, motion } from 'framer-motion';
import { IGame } from '../../types/game-plan/Game';
import { GameStatus } from '../../types/game-plan/GameStatus';
import { SmallText } from '../../../common/components/typography/Text';
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface GameListProps {
  games: IGame[];
  isLoading: boolean;
  onReorderGames?: (sourceIndex: number, destinationIndex: number) => void;
}

export const GameList: FC<GameListProps> = ({ games, isLoading, onReorderGames }) => {
  const { t } = useTranslation();
  
  // Set up sensors for different input methods
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
            {games.map((game, index) => (
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
                    isHighlighted={game.getStatus() === GameStatus.PLAYING}
                  />
                </SortableItem>
              </motion.div>
            ))}
          </SortableContext>
        )}
      </div>
    </DndContext>
  );
}; 