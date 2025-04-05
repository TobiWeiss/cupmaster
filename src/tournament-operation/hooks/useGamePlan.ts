import { useEffect, useState, useMemo } from "react";
import { GamePlan, IGamePlan } from "../types/game-plan/GamePlan";
import { GamePlanFactory } from "../services/GamePlanFactory";
import { GamePlanService } from "../services/GamePlanService";
import { Tournament } from "../types/tournament/Tournament";

export const useGamePlan = (tournament: Tournament | null) => {
  const [gamePlan, setGamePlan] = useState<IGamePlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the service instance so it doesn't change on every render
  const gamePlanService = useMemo(() => new GamePlanService(), []);


  const loadGamePlan = async (tournament: Tournament) => {
    if (!tournament.id) return;
    try {
      const data = await gamePlanService.getGamePlan(tournament.getId()!);

      if (!data) {
        const gamePlan = GamePlanFactory.createGamePlan(tournament);
        setGamePlan(gamePlan);
      } else {
        setGamePlan(data);
      }
    } catch (err) {
      console.error('Error loading game plan', err);
      setError(err instanceof Error ? err.message : 'Failed to load tournament');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     if (tournament?.id) {
      loadGamePlan(tournament);
    } 
  }, [tournament?.id]);

  const updateGamePlan = (tournament: Tournament) => {
    const gamePlan = GamePlanFactory.createGamePlan(tournament!);
    setGamePlan(gamePlan);
  }
  
  return { gamePlan, updateGamePlan, loading, error };
};