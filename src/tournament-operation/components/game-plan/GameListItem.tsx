import { FC } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../common/components/ui/Card';
import { SmallestText, SmallText } from '../../../common/components/typography/Text';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card className="flex px-10">
        {/* Top Row as Grid Layout */}
        <div className="grid grid-cols-10 items-center my-0">
          {/* Time */}
          <div className="col-span-5 flex items-center">
            <Icon className='mr-2' size="sm" icon={Clock} />
            <SmallestText dataTestId={`game-time-${game.getId()}`}>
              {formatDate(game.getStartTime())}
            </SmallestText>
          </div>

          {/* Field */}
          <div className="col-span-5 flex items-center justify-end">
            <Icon className='mr-2' size="sm" icon={MapPin} />
            <SmallestText dataTestId={`field-name-${game.getId()}`}>
              {game.getFieldName()}
            </SmallestText>
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
                className="w-10 h-10 rounded-full mr-2"
                data-testid={`first-participant-logo-${game.getId()}`}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10 flex items-center justify-center mr-2">
                <SmallText>{game.getFirstParticipantName().charAt(0)}</SmallText>
              </div>
            )}
            <SmallText dataTestId={`first-participant-name-${game.getId()}`} className="truncate mr-2">
              {game.getFirstParticipantName()}
            </SmallText>
          </div>

          {/* Score */}
          <div className="flex items-center justify-center">
            <SmallestText className="font-bold">
              {game.getStatus() === 'PLANNED' ? '-' : `${game.getFirstParticipantScore()} - ${game.getSecondParticipantScore()}`}
            </SmallestText>
          </div>

          {/* Second participant */}
          <div className="col-span-4 flex items-center justify-center min-w-0">
            <SmallText dataTestId={`second-participant-name-${game.getId()}`} className="truncate">
              {game.getSecondParticipantName()}
            </SmallText>
            {game.getSecondParticipantLogo() ? (
              <img
                src={game.getSecondParticipantLogo()}
                alt={game.getSecondParticipantName()}
                className="w-10 h-10 rounded-full ml-2"
                data-testid={`second-participant-logo-${game.getId()}`}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10 flex items-center justify-center ml-2">
                <SmallestText>{game.getSecondParticipantName().charAt(0)}</SmallestText>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
