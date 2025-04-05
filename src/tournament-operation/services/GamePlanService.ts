import { GamePlan } from '../types/game-plan/GamePlan';
import { Tournament } from '../types/tournament/Tournament';

export class GamePlanService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createGamePlan(tournament: Tournament): Promise<GamePlan | null> {
    // Dummy implementation for now
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getGamePlan(_id: string): Promise<GamePlan | null> {
    // Dummy implementation for now
    return null;
  }
} 