import { useEffect, useState, useMemo } from "react";
import { GamePlan } from "../types/game-plan/GamePlan";
import { GamePlanService } from "../services/GamePlanService";
import { ITournament, Tournament } from "../types/tournament/Tournament";
import { LocalStorage } from "../../common/services";

export const useGamePlan = (tournament: ITournament | null) => {
  const [gamePlan, setGamePlan] = useState<GamePlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gamePlanService = useMemo(() => new GamePlanService(new LocalStorage()), []);

  useEffect(() => {
    const loadGamePlan = async () => {

      if (!tournament?.getId()) return;
      try {
        setLoading(true);

        const data = await gamePlanService.getGamePlan(tournament.getId()!);

        setGamePlan(data);
      } catch (err) {
        console.error('Error loading game plan', err);
        setError(err instanceof Error ? err.message : 'Failed to load game plan');
      } finally {
        setLoading(false);
      }
    };

    loadGamePlan();
  }, [tournament?.getId(), gamePlanService]);

  // Auto-save game plan when it changes
  useEffect(() => {
    if (gamePlan) {
      try {
        gamePlanService.updateGamePlan(gamePlan);
      } catch (err) {
        console.error('Error saving game plan', err);
        setError(err instanceof Error ? err.message : 'Failed to save game plan');
      } finally {
        setLoading(false);
      }
    }
  }, [gamePlan, gamePlanService]);

  const createNewGamePlan = async (tournament: Tournament): Promise<GamePlan> => {
    try {
      setLoading(true);
      const newGamePlan = await gamePlanService.createGamePlan(tournament);
      setGamePlan(newGamePlan);
      return newGamePlan;
    } catch (err) {
      console.error('Error creating game plan', err);
      setError(err instanceof Error ? err.message : 'Failed to create game plan');
      throw err;
    }
  };

  const updateGamePlan = async (tournament: Tournament): Promise<GamePlan> => {
    if (!gamePlan) {
      throw new Error('No game plan to update');
    }
    try {
      const updatedGamePlan = await gamePlanService.updateGamePlanFieldsAndDates(gamePlan, tournament);
      setGamePlan(updatedGamePlan);
      return updatedGamePlan;
    } catch (err) {
      console.error('Error updating game plan', err);
      setError(err instanceof Error ? err.message : 'Failed to update game plan');
      throw err;
    }
  };

  const reorderGames = async (sourceIndex: number, destinationIndex: number): Promise<GamePlan | null> => {
    if (!gamePlan || !tournament) return null;
    try {
      const reorderedGamePlan = await gamePlanService.reorderGames(gamePlan, tournament as Tournament, sourceIndex, destinationIndex);
      setGamePlan(reorderedGamePlan);
      return reorderedGamePlan;
    } catch (err) {
      console.error('Error reordering games', err);
      setError(err instanceof Error ? err.message : 'Failed to reorder games');
      throw err;
    }
  };

  const deleteGamePlan = async (id: string): Promise<void> => {
    try {
      await gamePlanService.deleteGamePlan(id);
      if (gamePlan?.getId() === id) {
        setGamePlan(null);
      }
    } catch (err) {
      console.error('Error deleting game plan', err);
      setError(err instanceof Error ? err.message : 'Failed to delete game plan');
      throw err;
    }
  };

  return {
    gamePlan,
    setGamePlan,
    updateGamePlan,
    createNewGamePlan,
    reorderGames,
    deleteGamePlan,
    loading,
    error
  };
};