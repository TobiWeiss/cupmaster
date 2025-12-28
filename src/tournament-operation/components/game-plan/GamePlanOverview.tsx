import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PageInfo } from '../../../common/components/ui/PageInfo';
import { GameList } from './GameList';
import { GroupOverview } from './GroupOverview';
import { IGamePlan } from '../../types/game-plan/GamePlan';
import { IGroup } from '../../types/game-plan/Group';
import { SmallText } from '../../../common/components/typography/Text';

interface GamePlanOverviewProps {
  gamePlan: IGamePlan | null;
  groups: IGroup[] | null;
  onReorderGames: (sourceIndex: number, destinationIndex: number) => void;
}

export const GamePlanOverview: FC<GamePlanOverviewProps> = ({ gamePlan, groups, onReorderGames }) => {
  const { t } = useTranslation();

  function doesGamePlanHaveGames() {
    return gamePlan?.getGames()?.length && gamePlan?.getGames()?.length > 0;
  }

  return (
    <div data-testid="game-plan-overview">
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
      
      {/* Groups section */}
      <GroupOverview groups={groups} />

      {/* All matches section */}
      {doesGamePlanHaveGames() ? (
        <GameList
          games={gamePlan?.getGames() ?? []}
          isLoading={false}
          onReorderGames={onReorderGames}
        />
      ) : (
        <div className="flex justify-center items-center h-full">
          <SmallText dataTestId='no-matches-text' className="text-gray-500">{t('tournamentOperation.gamePlan.noMatches')}</SmallText>
        </div>
      )}
    </div>
  );
}; 