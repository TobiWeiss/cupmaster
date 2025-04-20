import { FC } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../common/components/ui/Card';
import { SmallText } from '../../../common/components/typography/Text';
import { IGame } from '../../types/game-plan/Game';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../common/utils/dateUtils';
import { Icon } from '../../../common/components/ui/Icon';
import { Clock, MapPin } from 'lucide-react';

interface GameListItemProps {
  game: IGame;
  index: number;
  isHighlighted?: boolean;
}

export const GameListItem: FC<GameListItemProps> = ({ game, index }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card className="flex px-10">
        {/* Top Row as Grid Layout */}
        <div className="grid grid-cols-9 items-center my-0">
          {/* Time */}
          <div className="col-span-3 flex items-center">
            <Icon className='mr-2' size="sm" icon={Clock} />
            <SmallText className="text-xs font-medium">
              {formatDate(game.getStartTime())}
            </SmallText>
          </div>

          {/* Group */}
          <div className="col-span-3 flex justify-center">
            <SmallText className="text-xs inline-block px-2 py-0.5 rounded-full bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10">
              Group {index % 2 === 0 ? "A" : "B"}
            </SmallText>
          </div>

          {/* Field */}
          <div className="col-span-3 flex items-center justify-end">
            <Icon className='mr-2' size="sm" icon={MapPin} />
            <SmallText className="text-xs">
              {t('tournamentOperation.gamePlan.field')} {game.getFieldName()}
            </SmallText>
          </div>
        </div>

        {/* Participants and Score in Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-9 items-center justify-items-center mx-0 lg:mx-10 xl:mx-80">
          {/* First participant */}
          <div className="col-span-4 flex items-center justify-center min-w-0">
            {game.getFirstParticipantLogo() ? (
              <img
                src={game.getFirstParticipantLogo()}
                alt={game.getFirstParticipantName()}
                className="w-5 h-5 rounded-full mr-2"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10 flex items-center justify-center mr-2">
                <SmallText className="text-xs">{game.getFirstParticipantName().charAt(0)}</SmallText>
              </div>
            )}
            <SmallText className="truncate">
              {game.getFirstParticipantName()}
            </SmallText>
          </div>

          {/* Score */}
          <div className="flex items-center justify-center">
            <SmallText className="font-bold text-lg">
              {game.getStatus() === 'PLANNED' ? '-' : `${game.getFirstParticipantScore()} - ${game.getSecondParticipantScore()}`}
            </SmallText>
          </div>

          {/* Second participant */}
          <div className="col-span-4 flex items-center justify-center min-w-0">
            <SmallText className="truncate">
              {game.getSecondParticipantName()}
            </SmallText>
            {game.getSecondParticipantLogo() ? (
              <img
                src={game.getSecondParticipantLogo()}
                alt={game.getSecondParticipantName()}
                className="w-5 h-5 rounded-full ml-2"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10 flex items-center justify-center ml-2">
                <SmallText className="text-xs">{game.getSecondParticipantName().charAt(0)}</SmallText>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
