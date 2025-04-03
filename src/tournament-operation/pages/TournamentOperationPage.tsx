import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tournament } from '../../tournament-init/types/tournament';
import { GamePlanOverview } from '../components/game-plan/GamePlanOverview';
import { ParticipantSettings } from '../components/participant-settings/ParticipantSettings';
import { TournamentSettings } from '../components/tournament-settings/TournamentSettings';
import { BottomNavigation } from '../components/navigation/BottomNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTournamentService } from '../../tournament-init/hooks/useTournamentService';
import { LargeText } from '../../common/components/typography/Text';

type ActiveView = 'game-plan' | 'participants' | 'settings';

export const TournamentOperationPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tournamentService = useTournamentService();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('game-plan');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTournament = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        const loadedTournament = await tournamentService.getTournament(id);
        if (!loadedTournament) {
          navigate('/');
          return;
        }
        setTournament(loadedTournament);
      } catch (error) {
        console.error('Failed to load tournament:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadTournament();
  }, []);

  const renderActiveView = () => {
    console.log('rendering');
    if (!tournament) return null;

    switch (activeView) {
      case 'game-plan':
        return <GamePlanOverview tournament={tournament} />;
      case 'participants':
        return <ParticipantSettings tournament={tournament} />;
      case 'settings':
        return <TournamentSettings tournament={tournament} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LargeText>Loading tournament...</LargeText>
      </div>
    );
  }

  if (!tournament) return null;

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 container mx-auto px-4 py-8"
        >
          {renderActiveView()}
        </motion.div>
      </AnimatePresence>

      <BottomNavigation
        activeView={activeView}
        onViewChange={setActiveView}
      />
    </div>
  );
}; 