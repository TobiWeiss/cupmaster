import { FC } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../common/components/ui/Card';
import { SmallText } from '../../../common/components/typography/Text';
import { Game } from '../../types/game-plan/Game';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../common/utils/dateUtils';

interface MatchListItemProps {
  match: Game;
  index: number;
  isHighlighted?: boolean;
}

export const MatchListItem: FC<MatchListItemProps> = ({ match, index, isHighlighted = false }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card 
        className={`p-3 flex items-center ${
          isHighlighted 
            ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/10' 
            : ''
        }`}
      >
        {/* Time */}
        <div className="w-24 flex-shrink-0">
          <SmallText className="text-xs font-medium">
            {formatDate(match.time.startTime)}
          </SmallText>
        </div>
        
        {/* Field */}
        <div className="w-20 flex-shrink-0">
          <SmallText className="text-xs">
            {t('tournamentOperation.gamePlan.field')} {match.field.id}
          </SmallText>
        </div>
        
        {/* Group */}
        <div className="w-20 flex-shrink-0">
          <SmallText className="text-xs inline-block px-2 py-0.5 rounded-full bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10">
            Group {index % 2 === 0 ? "A" : "B"}
          </SmallText>
        </div>
        
        {/* Participants */}
        <div className="flex-grow flex items-center">
          {/* First participant */}
          <div className="flex items-center flex-1 min-w-0">
            {match.firstParticipant.logo ? (
              <img 
                src={match.firstParticipant.logo} 
                alt={match.firstParticipant.name} 
                className="w-5 h-5 rounded-full mr-2"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10 flex items-center justify-center mr-2">
                <SmallText className="text-xs">{match.firstParticipant.name.charAt(0)}</SmallText>
              </div>
            )}
            <SmallText className="truncate">
              {match.firstParticipant.name}
            </SmallText>
          </div>
          
          {/* Score */}
          <div className="px-3 flex-shrink-0">
            <SmallText className="font-bold">
              {match.score.home} - {match.score.away}
            </SmallText>
          </div>
          
          {/* Second participant */}
          <div className="flex items-center flex-1 min-w-0 justify-end">
            <SmallText className="truncate">
              {match.secondParticipant.name}
            </SmallText>
            {match.secondParticipant.logo ? (
              <img 
                src={match.secondParticipant.logo} 
                alt={match.secondParticipant.name} 
                className="w-5 h-5 rounded-full ml-2"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10 flex items-center justify-center ml-2">
                <SmallText className="text-xs">{match.secondParticipant.name.charAt(0)}</SmallText>
              </div>
            )}
          </div>
        </div>
        
        {/* Status */}
        <div className="w-20 flex-shrink-0 text-right">
          <SmallText className={`text-xs ${
            match.status === 'PLAYING' 
              ? 'text-green-500 dark:text-green-400' 
              : match.status === 'FINISHED' 
                ? 'text-custom-secondary-light dark:text-custom-secondary-dark' 
                : 'text-custom-secondary-light/70 dark:text-custom-secondary-dark/70'
          }`}>
            {match.status === 'PLAYING' 
              ? t('tournamentOperation.gamePlan.status.playing')
              : match.status === 'FINISHED' 
                ? t('tournamentOperation.gamePlan.status.finished')
                : match.status === 'PENDING' 
                  ? t('tournamentOperation.gamePlan.status.pending')
                  : t('tournamentOperation.gamePlan.status.planned')}
          </SmallText>
        </div>
      </Card>
    </motion.div>
  );
}; 