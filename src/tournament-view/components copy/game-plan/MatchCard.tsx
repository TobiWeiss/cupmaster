import { FC } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../common/components/ui/Card';
import { SmallText } from '../../../common/components/typography/Text';
import { Game } from '../../types/game-plan/Game';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../common/utils/dateUtils';

interface MatchCardProps {
  match: Game;
  index: number;
  groupName?: string;
  compact?: boolean;
}

export const MatchCard: FC<MatchCardProps> = ({ match, index, groupName, compact = false }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className={compact ? "h-full max-w-xs mx-auto" : "h-full"}
    >
      <Card className={`p-3 h-full flex flex-col ${compact ? 'shadow-sm' : ''}`}>
        {/* Match header with time and field */}
        <div className="flex justify-between items-center mb-2 pb-2 border-b border-custom-secondary-light/20 dark:border-custom-secondary-dark/20">
          <div>
            <SmallText className={`font-bold ${compact ? 'text-xs' : ''}`}>
              {formatDate(match.time.startTime)}
            </SmallText>
            <SmallText className={`text-custom-secondary-light dark:text-custom-secondary-dark ${compact ? 'text-xs' : ''}`}>
              {match.time.duration} min
            </SmallText>
          </div>
          <div className="text-right">
            <SmallText className={`font-bold ${compact ? 'text-xs' : ''}`}>
              {t('tournamentOperation.gamePlan.field')} {match.field.id}
            </SmallText>
            {match.field.name && !compact && (
              <SmallText className="text-custom-secondary-light dark:text-custom-secondary-dark">
                {match.field.name}
              </SmallText>
            )}
          </div>
        </div>
        
        {/* Group name if available */}
        {groupName && (
          <div className={`${compact ? 'mb-2' : 'mb-3'}`}>
            <SmallText className={`inline-block px-2 py-1 rounded-full bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10 text-custom-secondary-light dark:text-custom-secondary-dark ${compact ? 'text-xs' : ''}`}>
              {groupName}
            </SmallText>
          </div>
        )}
        
        {/* Participants and score */}
        <div className="flex items-center justify-between flex-1">
          {/* First participant */}
          <div className="flex flex-col items-center text-center w-2/5">
            <div className={`${compact ? 'w-8 h-8' : 'w-12 h-12'} rounded-full overflow-hidden mb-2 bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10 flex items-center justify-center`}>
              {match.firstParticipant.logo ? (
                <img 
                  src={match.firstParticipant.logo} 
                  alt={match.firstParticipant.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <SmallText>{match.firstParticipant.name.charAt(0)}</SmallText>
              )}
            </div>
            <SmallText className={`font-bold line-clamp-2 ${compact ? 'text-xs' : ''}`}>
              {match.firstParticipant.name}
            </SmallText>
          </div>
          
          {/* Score */}
          <div className="flex items-center justify-center w-1/5">
            <motion.div 
              className={`px-3 py-1 rounded-lg ${
                match.status === 'PLAYING' 
                  ? 'bg-custom-secondary-light/20 dark:bg-custom-secondary-dark/20' 
                  : ''
              }`}
              animate={match.status === 'PLAYING' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <SmallText className={`font-bold ${compact ? 'text-base' : 'text-lg'}`}>
                {match.score.home} - {match.score.away}
              </SmallText>
            </motion.div>
          </div>
          
          {/* Second participant */}
          <div className="flex flex-col items-center text-center w-2/5">
            <div className={`${compact ? 'w-8 h-8' : 'w-12 h-12'} rounded-full overflow-hidden mb-2 bg-custom-secondary-light/10 dark:bg-custom-secondary-dark/10 flex items-center justify-center`}>
              {match.secondParticipant.logo ? (
                <img 
                  src={match.secondParticipant.logo} 
                  alt={match.secondParticipant.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <SmallText>{match.secondParticipant.name.charAt(0)}</SmallText>
              )}
            </div>
            <SmallText className={`font-bold line-clamp-2 ${compact ? 'text-xs' : ''}`}>
              {match.secondParticipant.name}
            </SmallText>
          </div>
        </div>
        
        {/* Match status - only show in non-compact mode */}
        {!compact && (
          <div className="mt-3 pt-2 border-t border-custom-secondary-light/20 dark:border-custom-secondary-dark/20">
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
        )}
      </Card>
    </motion.div>
  );
}; 