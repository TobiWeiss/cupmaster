import { useEffect, useState, useMemo } from "react";
import { GamePlan, IGamePlan } from "../types/game-plan/GamePlan";
import { GamePlanManager } from "../services/GamePlanManager";
import { GamePlanService } from "../services/GamePlanService";
import { ITournament, Tournament } from "../types/tournament/Tournament";
import { arrayMove } from "@dnd-kit/sortable";

export const useGamePlan = (tournament: ITournament | null) => {
  const [gamePlan, setGamePlan] = useState<IGamePlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the service instance so it doesn't change on every render
  const gamePlanService = useMemo(() => new GamePlanService(), []);
  const tournamentMemo = useMemo(() => tournament, [tournament]);

  const loadGamePlan = async (tournament: ITournament) => {
    if (!tournament.getId()) return;
    try {
      const data = await gamePlanService.getGamePlan(tournament.getId()!);

      if (!data) {
        const gamePlan = GamePlanManager.createGamePlan(tournament);
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
     if (tournament?.getId()) {
      loadGamePlan(tournament);
    } 
  }, [tournament?.getId()]);

  const updateGamePlan = (tournament: Tournament) => {
    const newGamePlan = GamePlanManager.createGamePlan(tournament);
    setGamePlan(newGamePlan);
    return newGamePlan;
  }

  const reorderGames = (sourceIndex: number, destinationIndex: number) => {
    if (!gamePlan) return;
    const newGamePlan = GamePlanManager.recalulateGameTimes(gamePlan, tournamentMemo!, sourceIndex, destinationIndex);
    setGamePlan(newGamePlan);
    return newGamePlan;
  }
  
  return { gamePlan, updateGamePlan, reorderGames, loading, error };
};