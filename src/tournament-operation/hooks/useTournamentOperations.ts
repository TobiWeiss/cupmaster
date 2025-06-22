import { useCallback } from 'react';
import { useGamePlan } from './useGamePlan';
import { useTournament } from './useTournament';
import { useNotify } from '../../common/hooks/useNotify';
import { NotificationType } from '../../common/types/NotifficationTypes';
import { IParticipant } from '../types/tournament/Participant';
import { Tournament } from '../types/tournament/Tournament';

export const useTournamentOperations = (tournamentId: string | undefined) => {
  const { tournament, setTournament, loading: tournamentLoading } = useTournament(tournamentId);
  const { gamePlan, updateGamePlan, createNewGamePlan, reorderGames, loading: gamePlanLoading } = useGamePlan(tournament);
  const { showConfirmation, showNotification } = useNotify();

  const handleParticipantChange = useCallback(async (participants: IParticipant[]) => {
    if (!tournament) return;
    
    
    const updatedTournament = Tournament.fromObject(tournament.toObject());
    updatedTournament.setParticipants(participants);
    
    setTournament(updatedTournament); // this automatically saves the tournament
    await createNewGamePlan(updatedTournament);
  }, [tournament, setTournament, createNewGamePlan]);

  const handleSettingsChange = useCallback(async (newTournament: Tournament): Promise<boolean> => {
    if (!tournament) return false;
  
    const oldMatchesAgainstEachParticipant = tournament.getMatchesAgainstEachParticipant(tournament.getFormat());
    const newMatchesAgainstEachParticipant = newTournament.getMatchesAgainstEachParticipant(newTournament.getFormat());
    
    const willCustomGameOrderBePreserved = oldMatchesAgainstEachParticipant === newMatchesAgainstEachParticipant;
    
    if (willCustomGameOrderBePreserved) {
      const newGamePlan = await updateGamePlan(newTournament);
      newTournament.updateEndDate(newGamePlan);
      setTournament(newTournament);
      showNotification("Turnier erfolgreich aktualisiert. Die Reihenfolge der Spiele wurde beibehalten.", NotificationType.INFO);
      return true;
    } else {
      const confirmed = await showConfirmation("Das Ändern dieser Einstellung führt dazu, dass der Spielplan neu berechnet und die Match-Reihenfolge geändert wird. Sind sie sicher?");
      console.info("confirmed", confirmed);
      if (confirmed) {
        const newGamePlan = await createNewGamePlan(newTournament);
        newTournament.updateEndDate(newGamePlan);
        setTournament(newTournament);
        return true;
      } else {
        showNotification("Der Spielplan wurde nicht aktualisiert", NotificationType.INFO);
        return false;
      }
    }
  }, [tournament, updateGamePlan, createNewGamePlan, setTournament, showConfirmation, showNotification]);

  const handleGameReorder = useCallback(async (sourceIndex: number, destinationIndex: number) => {
    await reorderGames(sourceIndex, destinationIndex);
  }, [reorderGames]);

  return {
    // Data
    tournament,
    gamePlan,
    
    // Loading states
    tournamentLoading,
    gamePlanLoading,
    
    // Actions
    handleParticipantChange,
    handleSettingsChange,
    handleGameReorder,
    
    // Utilities
    setTournament,
  };
}; 