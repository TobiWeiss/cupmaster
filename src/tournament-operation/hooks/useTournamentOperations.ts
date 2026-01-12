import { useCallback, useEffect, useState } from 'react';
import { useGamePlan } from './useGamePlan';
import { useTournament } from './useTournament';
import { IParticipant } from '../types/tournament/Participant';
import { Tournament } from '../types/tournament/Tournament';
import { useGroups } from './useGroups';
import { useSettings } from './useSettings';

export const useTournamentOperations = (tournamentId: string | undefined) => {
  const [initialized, setInitialized] = useState(false);
  const { tournament, setTournament, loading: tournamentLoading } = useTournament(tournamentId);
  const { gamePlan, updateGamePlan, createNewGamePlan, reorderGames, loading: gamePlanLoading } = useGamePlan(tournament);
  const { groups, loading: groupsLoading, createGroups, addParticipantsToGroups, removeParticipantsFromGroups, updateParticipantsInGroups } = useGroups(tournament);
  const { handleSettingsChange: handleSettingsChangeInternal } = useSettings();

  const handleParticipantAdded = useCallback(async (participant: IParticipant) => {
    if (!tournament) return;
    const updatedTournament = Tournament.fromObject(tournament.toObject());
    updatedTournament.addParticipant(participant);
    setTournament(updatedTournament);
    if(updatedTournament.hasGroups()) {
      await addParticipantsToGroups(participant);
    }
    await createNewGamePlan(updatedTournament);
  }, [tournament, setTournament, createNewGamePlan]);

  const handleParticipantRemoved = useCallback(async (participant: IParticipant) => {
    if (!tournament) return;
    const updatedTournament = Tournament.fromObject(tournament.toObject());
    updatedTournament.removeParticipant(participant);
    setTournament(updatedTournament);
    if(updatedTournament.hasGroups()) {
      await removeParticipantsFromGroups(participant);
    }
    await createNewGamePlan(updatedTournament);
  }, [tournament, setTournament, createNewGamePlan]);

  const handleParticipantUpdated = useCallback(async (participant: IParticipant) => {
    if (!tournament) return;
    const updatedTournament = Tournament.fromObject(tournament.toObject());
    updatedTournament.updateParticipant(participant);
    setTournament(updatedTournament);
    if(updatedTournament.hasGroups()) {
      await updateParticipantsInGroups(participant);
    }
  }, [tournament, setTournament, createNewGamePlan]);

  const handleSettingsChange = useCallback(async (newTournament: Tournament): Promise<boolean> => {
    if (!tournament) return false;

    return await handleSettingsChangeInternal(
      tournament,
      newTournament,
      updateGamePlan,
      createNewGamePlan,
      setTournament,
      createGroups
    );
  }, [tournament, updateGamePlan, createNewGamePlan, setTournament, handleSettingsChangeInternal]);

  const handleGameReorder = useCallback(async (sourceIndex: number, destinationIndex: number) => {
    await reorderGames(sourceIndex, destinationIndex);
  }, [reorderGames]);

  // Initialize game plan and groups if they have not been created yet
  useEffect(() => {
    const initializeGamePlanAndGroups = async () => {
    if(gamePlanLoading || groupsLoading || initialized) return;

    if(tournament?.hasGroups() && !groups || groups?.length === 0) {
      await createGroups(tournament!);
    }

    if(!gamePlan) {
        await createNewGamePlan(tournament!);
      }

      setInitialized(true);
    };
    initializeGamePlanAndGroups();
    }, [gamePlanLoading, groupsLoading, initialized]);

  return {
    // Data
    tournament,
    gamePlan,
    groups,
    // Loading states
    tournamentLoading,
    gamePlanLoading,
    groupsLoading,
    initialized,
    // Actions
    handleParticipantAdded,
    handleParticipantRemoved,
    handleParticipantUpdated,
    
    handleGameReorder,
  
    handleSettingsChange,
    // Utilities
    setTournament,
  };
}; 