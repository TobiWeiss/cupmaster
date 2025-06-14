import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GamePlanOverview } from '../components/game-plan/GamePlanOverview';
import { ParticipantSettings } from '../components/participant-settings/ParticipantSettings';
import { TournamentSettings } from '../components/tournament-settings/TournamentSettings';
import { BottomNavigation } from '../components/navigation/BottomNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LargeText } from '../../common/components/typography/Text';
import { useGamePlan } from '../hooks/useGamePlan';
import { useTournament } from '../hooks/useTournament';
import { IParticipant } from '../types/tournament/Participant';
import { Tournament } from '../types/tournament/Tournament';

type ActiveView = 'game-plan' | 'participants' | 'settings';

export const TournamentOperationPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [activeView, setActiveView] = useState<ActiveView>('game-plan');

  const { tournament, setTournament, loading: tournamentLoading } = useTournament(id);
  const { gamePlan, updateGamePlan, reorderGames, loading: gamePlanLoading } = useGamePlan(tournament);

  const onChangeParticipants = (participants: IParticipant[]) => {
    tournament?.setParticipants(participants);
    tournament.setNumberOfParticipants(participants.length);
    setTournament(tournament);
    updateGamePlan(tournament!);
  }

  const onChangeSettings = (tournament: Tournament) => {
    const updatedGamePlan = updateGamePlan(tournament);
    tournament.updateEndDate(updatedGamePlan);
    setTournament(tournament);
  }

  const handleReorderGames = (sourceIndex: number, destinationIndex: number) => {
    reorderGames(sourceIndex, destinationIndex);
  };

  const renderActiveView = () => {
    if (!tournament) return null;

    switch (activeView) {
      case 'game-plan':
        return <GamePlanOverview gamePlan={gamePlan} onReorderGames={handleReorderGames} />;
      case 'participants':
        return <ParticipantSettings tournament={tournament} onSave={onChangeParticipants} />;
      case 'settings':
        return <TournamentSettings tournament={tournament} onSave={onChangeSettings} />;
    }
  };

  if (tournamentLoading || gamePlanLoading) {
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