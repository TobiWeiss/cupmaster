import { useCallback } from 'react';
import { Tournament } from '../types/tournament/Tournament';
import { TournamentFormat, TournamentPhase } from '../types/tournament/TournamentFormat';
import { useNotify } from '../../common/hooks/useNotify';
import { NotificationType } from '../../common/types/NotifficationTypes';

interface UseSettingsReturn {
  handleSettingsChange: (
    oldTournament: Tournament,
    newTournament: Tournament,
    updateGamePlan: (tournament: Tournament) => Promise<any>,
    createNewGamePlan: (tournament: Tournament) => Promise<any>,
    setTournament: (tournament: Tournament) => void,
    createNewGroups: (tournament: Tournament) => Promise<any>
  ) => Promise<boolean>;
}

export const useSettings = (): UseSettingsReturn => {
  const { showConfirmation, showNotification } = useNotify();

  /**
   * Checks if the tournament format has changed
   */
  const hasTheFormatOfTheTournamentChanged = (oldTournament: Tournament, newTournament: Tournament): boolean => {
    return oldTournament.getFormat() !== newTournament.getFormat();
  };

  /**
   * Checks if matches against each participant have changed for any phase
   */
  const haveTheMatchesAgainstEachParticipantChanged = (oldTournament: Tournament, newTournament: Tournament): boolean => {
    const oldFormat = oldTournament.getFormat();
    const newFormat = newTournament.getFormat();
    const phases = oldTournament.getPhases();

    // Check for each phase
    for (const phase of phases) {
      const oldMatches = oldTournament.getMatchesAgainstEachParticipant(oldFormat, phase);
      const newMatches = newTournament.getMatchesAgainstEachParticipant(newFormat, phase);
      if (oldMatches !== newMatches) {
        return true;
      }
    }

    // Also check the main format if no phases
    if (phases.length === 0) {
      const oldMatches = oldTournament.getMatchesAgainstEachParticipant(oldFormat);
      const newMatches = newTournament.getMatchesAgainstEachParticipant(newFormat);
      return oldMatches !== newMatches;
    }

    return false;
  };

  /**
   * Checks if the amount of qualified participants has changed for any phase
   */
  const hasTheAmountOfQualifiedParticipantsChanged = (oldTournament: Tournament, newTournament: Tournament): boolean => {
    const oldFormat = oldTournament.getFormat();
    const newFormat = newTournament.getFormat();
    const phases = oldTournament.getPhases();

    // Check for each phase
    for (const phase of phases) {
      const oldQualified = oldTournament.getQualifiedParticipants(oldFormat, phase);
      const newQualified = newTournament.getQualifiedParticipants(newFormat, phase);
      if (oldQualified !== newQualified) {
        return true;
      }
    }

    // Also check the main format if no phases
    if (phases.length === 0) {
      const oldQualified = oldTournament.getQualifiedParticipants(oldFormat);
      const newQualified = newTournament.getQualifiedParticipants(newFormat);
      return oldQualified !== newQualified;
    }

    return false;
  };

  const hasTheNumberOfGroupsChanged = (oldTournament: Tournament, newTournament: Tournament): boolean => {
    return oldTournament.getNumberOfGroups(oldTournament.getFormat(), TournamentPhase.GROUP_STAGE) !== newTournament.getNumberOfGroups(newTournament.getFormat(), TournamentPhase.GROUP_STAGE);
  };

  /**
   * Determines if a new game plan needs to be created based on tournament changes
   */
  const requiresNewGamePlan = (oldTournament: Tournament, newTournament: Tournament): boolean => {
    return (
      hasTheFormatOfTheTournamentChanged(oldTournament, newTournament) ||
      haveTheMatchesAgainstEachParticipantChanged(oldTournament, newTournament) ||
      hasTheAmountOfQualifiedParticipantsChanged(oldTournament, newTournament) ||
      hasTheNumberOfGroupsChanged(oldTournament, newTournament)
    );
  };

  const requiresNewGroups = (oldTournament: Tournament, newTournament: Tournament): boolean => {
    return !oldTournament.hasGroups() && newTournament.hasGroups() 
    && hasTheNumberOfGroupsChanged(oldTournament, newTournament);
  };

  const handleSettingsChange = useCallback(
    async (
      oldTournament: Tournament,
      newTournament: Tournament,
      updateGamePlan: (tournament: Tournament) => Promise<any>,
      createNewGamePlan: (tournament: Tournament) => Promise<any>,
      setTournament: (tournament: Tournament) => void,
      createNewGroups: (tournament: Tournament) => Promise<any>
    ): Promise<boolean> => {
      if (requiresNewGamePlan(oldTournament, newTournament)) {
        const confirmed = await showConfirmation(
          "Das Ändern dieser Einstellung führt dazu, dass der Spielplan neu berechnet und die Match-Reihenfolge geändert wird. Sind sie sicher?"
        );
        if (confirmed) {
          if (requiresNewGroups(oldTournament, newTournament)) {
            await createNewGroups(newTournament);
          }
          const newGamePlan = await createNewGamePlan(newTournament);
          newTournament.updateEndDate(newGamePlan);
          setTournament(newTournament);
          return true;
        }
        return false;
      } else {
        // All other changes -> update gamePlan
        const newGamePlan = await updateGamePlan(newTournament);
        newTournament.updateEndDate(newGamePlan);
        setTournament(newTournament);
        showNotification(
          "Turnier erfolgreich aktualisiert. Die Reihenfolge der Spiele wurde beibehalten.",
          NotificationType.INFO
        );
        return true;
      }
    },
    [showConfirmation, showNotification]
  );

  return {
    handleSettingsChange,
  };
};


