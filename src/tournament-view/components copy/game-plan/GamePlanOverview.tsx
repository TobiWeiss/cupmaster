import { FC, useState, useEffect, useMemo } from 'react';
import { Tournament } from '../../types/tournament/Tournament';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PageInfo } from '../../../common/components/ui/PageInfo';
import { CurrentGames } from './CurrentGames';
import { MatchList } from './MatchList';
import { Game } from '../../types/game-plan/Game';
import { GameStatus } from '../../types/game-plan/GameStatus';

interface GamePlanOverviewProps {
  tournament: Tournament;
}

export const GamePlanOverview: FC<GamePlanOverviewProps> = ({ tournament }) => {
  const { t } = useTranslation();
  const [matches, setMatches] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading matches from a service
  useEffect(() => {
    // This would normally come from a service
    const dummyMatches: Game[] = [
      {
        id: '1',
        firstParticipant: {
          id: '101',
          name: 'Team Alpha',
          logo: 'https://placehold.co/100x100/orange/white?text=A',
        },
        secondParticipant: {
          id: '102',
          name: 'Team Beta',
          logo: 'https://placehold.co/100x100/blue/white?text=B',
        },
        score: {
          home: 2,
          away: 1,
        },
        time: {
          startTime: new Date(Date.now() + 3600000), // 1 hour from now
          duration: 45,
        },
        field: {
          id: 1,
          name: 'Main Field',
        },
        status: GameStatus.PLANNED,
        winnerPlays: null,
        loserPlays: null,
      },
      {
        id: '2',
        firstParticipant: {
          id: '103',
          name: 'Team Gamma',
          logo: 'https://placehold.co/100x100/green/white?text=G',
        },
        secondParticipant: {
          id: '104',
          name: 'Team Delta',
          logo: 'https://placehold.co/100x100/red/white?text=D',
        },
        score: {
          home: 0,
          away: 0,
        },
        time: {
          startTime: new Date(),
          duration: 45,
        },
        field: {
          id: 2,
        },
        status: GameStatus.PLAYING,
        winnerPlays: null,
        loserPlays: null,
      },
      {
        id: '3',
        firstParticipant: {
          id: '105',
          name: 'Team Epsilon',
          logo: '',
        },
        secondParticipant: {
          id: '106',
          name: 'Team Zeta',
          logo: '',
        },
        score: {
          home: 3,
          away: 3,
        },
        time: {
          startTime: new Date(Date.now() - 7200000), // 2 hours ago
          duration: 45,
        },
        field: {
          id: 1,
          name: 'Main Field',
        },
        status: GameStatus.FINISHED,
        winnerPlays: null,
        loserPlays: null,
      },
      {
        id: '4',
        firstParticipant: {
          id: '107',
          name: 'Team Theta',
          logo: 'https://placehold.co/100x100/purple/white?text=T',
        },
        secondParticipant: {
          id: '108',
          name: 'Team Iota',
          logo: 'https://placehold.co/100x100/yellow/black?text=I',
        },
        score: {
          home: 0,
          away: 0,
        },
        time: {
          startTime: new Date(Date.now() + 7200000), // 2 hours from now
          duration: 45,
        },
        field: {
          id: 2,
          name: 'Secondary Field',
        },
        status: GameStatus.PLANNED,
        winnerPlays: null,
        loserPlays: null,
      },
      {
        id: '5',
        firstParticipant: {
          id: '109',
          name: 'Team Kappa',
          logo: 'https://placehold.co/100x100/teal/white?text=K',
        },
        secondParticipant: {
          id: '110',
          name: 'Team Lambda',
          logo: 'https://placehold.co/100x100/pink/white?text=L',
        },
        score: {
          home: 0,
          away: 0,
        },
        time: {
          startTime: new Date(Date.now() + 10800000), // 3 hours from now
          duration: 45,
        },
        field: {
          id: 1,
          name: 'Main Field',
        },
        status: GameStatus.PLANNED,
        winnerPlays: null,
        loserPlays: null,
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setMatches(dummyMatches);
      setIsLoading(false);
    }, 800);
  }, [tournament]);

  // Filter and sort current and upcoming matches
  const currentAndUpcomingMatches = useMemo(() => {
    return matches
      .filter(match => match.status === GameStatus.PLAYING || match.status === GameStatus.PLANNED)
      .sort((a, b) => {
        // Playing matches first
        if (a.status === GameStatus.PLAYING && b.status !== GameStatus.PLAYING) return -1;
        if (a.status !== GameStatus.PLAYING && b.status === GameStatus.PLAYING) return 1;
        
        // Then sort by start time
        return a.time.startTime.getTime() - b.time.startTime.getTime();
      })
      .slice(0, 4); // Limit to 4 matches
  }, [matches]);

  // Sort all matches by date
  const allMatches = useMemo(() => {
    return [...matches].sort((a, b) => a.time.startTime.getTime() - b.time.startTime.getTime());
  }, [matches]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <PageInfo
          title={t('tournamentOperation.gamePlan.title')}
          description={t('tournamentOperation.gamePlan.description')}
          className="my-10"
        />
      </div>

      {/* Current and upcoming matches section */}
      <CurrentGames 
        matches={currentAndUpcomingMatches} 
        isLoading={isLoading} 
      />

      {/* All matches section */}
      <MatchList 
        matches={allMatches} 
        isLoading={isLoading} 
      />
    </motion.div>
  );
}; 