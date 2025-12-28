import { StorageInterface } from '../../common/services/storage/StorageInterface';
import { GamePlan } from '../types/game-plan/GamePlan';
import { Tournament } from '../types/tournament/Tournament';
import { GamePlanManager } from './GamePlanManager';

export class GamePlanService {

  constructor(private storage: StorageInterface) {} 

  async createGamePlan(tournament: Tournament): Promise<GamePlan> {
    const gamePlan = GamePlanManager.createGamePlan(tournament) as GamePlan;
    gamePlan.setId(tournament.getId());
    
    await this.storage.saveGamePlan(gamePlan.toObject());
    return gamePlan;
  }

  async getGamePlan(id: string): Promise<GamePlan | null> {
    const data = await this.storage.getGamePlan(id);
    
    return data ? GamePlan.fromObject(data) : null;
  }
  
  async updateGamePlan(gamePlan: GamePlan): Promise<GamePlan> {
    await this.storage.saveGamePlan(gamePlan.toObject());
    return gamePlan;
  }

  async deleteGamePlan(id: string): Promise<void> {
    await this.storage.deleteGamePlan(id);
  }

  async updateGamePlanFieldsAndDates(gamePlan: GamePlan, tournament: Tournament): Promise<GamePlan> {
    const updatedGamePlan = GamePlanManager.updateFieldsAndDates(gamePlan, tournament) as GamePlan;
    await this.storage.saveGamePlan(updatedGamePlan.toObject());
    return updatedGamePlan;
  }

  async reorderGames(gamePlan: GamePlan, tournament: Tournament, oldIndex: number, newIndex: number): Promise<GamePlan> {
    const reorderedGamePlan = GamePlanManager.reorderGames(gamePlan, tournament, oldIndex, newIndex) as GamePlan;
    await this.storage.saveGamePlan(reorderedGamePlan.toObject());
    return reorderedGamePlan;
  }
} 