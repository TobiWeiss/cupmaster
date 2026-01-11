import { useCallback } from 'react';
import { useGamePlan } from './useGamePlan';
import { useTournament } from './useTournament';
import { IParticipant } from '../types/tournament/Participant';
import { Tournament } from '../types/tournament/Tournament';
import { useGroups } from './useGroups';
import { useSettings } from './useSettings';

export const useTournamentOperations = (tournamentId: string | undefined) => {
  const { tournament, setTournament, loading: tournamentLoading } = useTournament(tournamentId);
  const { gamePlan, updateGamePlan, createNewGamePlan, reorderGames, loading: gamePlanLoading } = useGamePlan(tournament);
  const { groups, loading: groupsLoading } = useGroups(tournament);
  const { handleSettingsChange: handleSettingsChangeInternal } = useSettings();

  const handleParticipantChange = useCallback(async (participants: IParticipant[]) => {
    if (!tournament) return;
    
    
    const updatedTournament = Tournament.fromObject(tournament.toObject());
    updatedTournament.setParticipants(participants);
    
    setTournament(updatedTournament); // this automatically saves the tournament
    await createNewGamePlan(updatedTournament);
  }, [tournament, setTournament, createNewGamePlan]);

  const handleSettingsChange = useCallback(async (newTournament: Tournament): Promise<boolean> => {
    if (!tournament) return false;

    return await handleSettingsChangeInternal(
      tournament,
      newTournament,
      updateGamePlan,
      createNewGamePlan,
      setTournament
    );
  }, [tournament, updateGamePlan, createNewGamePlan, setTournament, handleSettingsChangeInternal]);

  const handleGameReorder = useCallback(async (sourceIndex: number, destinationIndex: number) => {
    await reorderGames(sourceIndex, destinationIndex);
  }, [reorderGames]);

  return {
    // Data
    tournament,
    gamePlan,
    groups,
    // Loading states
    tournamentLoading,
    gamePlanLoading,
    groupsLoading,
    // Actions
    handleParticipantChange,
    handleSettingsChange,
    handleGameReorder,
    
    // Utilities
    setTournament,
  };
}; 