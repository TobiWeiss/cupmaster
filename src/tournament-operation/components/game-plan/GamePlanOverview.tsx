import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PageInfo } from '../../../common/components/ui/PageInfo';
import { GameList } from './GameList';
import {  IGamePlan } from '../../types/game-plan/GamePlan';
import { useTournament } from '../../hooks/useTournament';
import { useGamePlan } from '../../hooks/useGamePlan';
import { ITournament } from '../../types/tournament/Tournament';

interface GamePlanOverviewProps {
  gamePlan: IGamePlan | null;
  onReorderGames: (sourceIndex: number, destinationIndex: number) => void;
}

export const GamePlanOverview: FC<GamePlanOverviewProps> = ({ gamePlan, onReorderGames }) => {
  const { t } = useTranslation();
 
 

  return (
    <div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <PageInfo
        title={t('tournamentOperation.gamePlan.title')}
        description={t('tournamentOperation.gamePlan.description')}
        className="my-10"
      />
    </motion.div>
     {/* All matches section */}
     <GameList
        games={gamePlan?.getGames() ?? []}
        isLoading={false}
        onReorderGames={onReorderGames}
      />
    </div>
  );
}; 