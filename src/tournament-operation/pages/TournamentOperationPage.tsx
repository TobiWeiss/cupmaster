import { FC, useEffect, useState } from 'react';
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
import { useNotify } from '../../common/hooks/useNotifications';
import { NotificationType } from '../../common/types/NotifficationTypes';


type ActiveView = 'game-plan' | 'participants' | 'settings';

export const TournamentOperationPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [activeView, setActiveView] = useState<ActiveView>('game-plan');
  const { showConfirmation, showNotification } = useNotify();

  const { tournament, setTournament, loading: tournamentLoading } = useTournament(id);
  const { gamePlan, updateGamePlan, createNewGamePlan, reorderGames, loading: gamePlanLoading } = useGamePlan(tournament);

  const onChangeParticipants = (participants: IParticipant[]) => {
    if (!tournament) return;
    tournament!.setParticipants(participants);
    tournament!.setNumberOfParticipants(participants.length);
    setTournament(tournament);
    updateGamePlan(tournament!);
  }

  const onChangeSettings = async (newTournament: Tournament): Promise<boolean> => {
    if (!tournament) return false;
  
    const oldMatchesAgainstEachParticipant = tournament.getMatchesAgainstEachParticipant(tournament.getFormat());
    const newMatchesAgainstEachParticipant = newTournament.getMatchesAgainstEachParticipant(newTournament.getFormat());
    
    const willCustomGameOrderBePreserverd = oldMatchesAgainstEachParticipant === newMatchesAgainstEachParticipant;
    
    if (willCustomGameOrderBePreserverd) {
      const newGamePlan = updateGamePlan(newTournament);
      newTournament.updateEndDate(newGamePlan);
      setTournament(newTournament);
      showNotification("Turnier erfolgreich aktualisiert. Die Reihenfolge der Spiele wurde beibehalten.", NotificationType.INFO);
      return true;
    } else {
      const confirmed = await showConfirmation("Das Ändern dieser Einstellung führt dazu, dass der Spielplan neu berechnet und die Match-Reihenfolge geändert wird. Sind sie sicher?");
      if (confirmed) {
        const newGamePlan = createNewGamePlan(newTournament);
        newTournament.updateEndDate(newGamePlan);
        setTournament(newTournament);
      } else {
        showNotification("Der Spielplan wurde nicht aktualisiert", NotificationType.INFO);
        return false;
      }
    }
    return true;
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