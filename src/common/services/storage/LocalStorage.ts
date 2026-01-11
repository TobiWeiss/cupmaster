import { CouldNotDeleteGamePlanException, CouldNotDeleteTournamentException, CouldNotFindGamePlanException, CouldNotFindGamePlansException, CouldNotFindGroupsException, CouldNotFindTournamentException, CouldNotFindTournamentsException, CouldNotSaveGamePlanException, CouldNotSaveGroupsException, CouldNotSaveTournamentException } from './exceptions';
import { StorageInterface } from './StorageInterface';

export class LocalStorage implements StorageInterface {
  public static readonly TOURNAMENT_STORAGE_KEY = 'tournaments';
  public static readonly GAME_PLAN_STORAGE_KEY = 'gamePlans';
  public static readonly GROUPS_STORAGE_KEY = 'groups';
  private async getAll(): Promise<Record<string, any>[]> {
    const data = localStorage.getItem(LocalStorage.TOURNAMENT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  async getTournaments(): Promise<Record<string, any>[]> {
    try {
      return this.getAll();
    } catch (error) {
      console.error('Error getting tournaments in LocalStorage', error);
      throw new CouldNotFindTournamentsException('Could not find tournaments in LocalStorage');
    }
  }

  async getTournament(id: string): Promise<Record<string, any> | null> {
    try {
      
      const tournaments = await this.getAll();
      
      return tournaments.find((t: Record<string, any>) => t.id === id) || null;
    } catch (error) {
      console.error('Error getting tournament with id in LocalStorage', error);
      throw new CouldNotFindTournamentException('Could not find tournament with id in LocalStorage');
    }
  }

  async saveTournament(tournament: Record<string, any>): Promise<void> {
    try {
      const tournaments = await this.getAll();
      const index = tournaments.findIndex((t: Record<string, any>) => t.id === tournament.id);
      
    if (index >= 0) {
      tournaments[index] = tournament;
    } else {
      tournaments.push(tournament);
    }

      localStorage.setItem(LocalStorage.TOURNAMENT_STORAGE_KEY, JSON.stringify(tournaments));
    } catch (error) {
      console.error('Error saving tournament in LocalStorage', error);
      throw new CouldNotSaveTournamentException('Could not save tournament in LocalStorage');
    }
  }

  async deleteTournament(id: string): Promise<void> {
    try {
      const tournaments = await this.getAll();
      const filtered = tournaments.filter((t: Record<string, any>) => t.id !== id);
      localStorage.setItem(LocalStorage.TOURNAMENT_STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting tournament in LocalStorage', error);
      throw new CouldNotDeleteTournamentException('Could not delete tournament in LocalStorage');
    }
  }

  async getGamePlan(id: string): Promise<Record<string, any> | null> {
    try {
      const gamePlans = await this.getAllGamePlans();
      return gamePlans.find((gp: Record<string, any>) => gp.id === id) || null;
    } catch (error) {
      console.error('Error getting game plan in LocalStorage', error);
      throw new CouldNotFindGamePlanException('Could not find game plan in LocalStorage');
    }
  }

  async getGamePlans(): Promise<Record<string, any>[]> {
    try {
      return this.getAllGamePlans();
    } catch (error) {
      console.error('Error getting game plans in LocalStorage', error);
      throw new CouldNotFindGamePlanException('Could not find game plans in LocalStorage');
    }
  }
  
  async saveGamePlan(gamePlan: Record<string, any>): Promise<void> {
    try {
    const gamePlans = await this.getAllGamePlans();
    const index = gamePlans.findIndex((gp: Record<string, any>) => gp.id === gamePlan.id);
    if (index >= 0) {
      gamePlans[index] = gamePlan;
    } else {
      gamePlans.push(gamePlan);
    }

      localStorage.setItem(LocalStorage.GAME_PLAN_STORAGE_KEY, JSON.stringify(gamePlans));
    } catch (error) {
      console.error('Error saving game plan in LocalStorage', error);
      throw new CouldNotSaveGamePlanException('Could not save game plan in LocalStorage');
    }
  }

  async deleteGamePlan(id: string): Promise<void> {
    try {
      const gamePlans = await this.getAllGamePlans();
      const filtered = gamePlans.filter((gp: Record<string, any>) => gp.id !== id);
      localStorage.setItem(LocalStorage.GAME_PLAN_STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting game plan in LocalStorage', error);
      throw new CouldNotDeleteGamePlanException('Could not delete game plan in LocalStorage');
    }
  }

  private async getAllGamePlans(): Promise<Record<string, any>[]> {
    try {
      const data = localStorage.getItem(LocalStorage.GAME_PLAN_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting game plans in LocalStorage', error);
      throw new CouldNotFindGamePlansException('Could not find game plans in LocalStorage');
    }
  }

  async getGroups(tournamentId: string): Promise<Record<string, any>[]> {
    try {
      const allGroups = await this.getAllGroups();
      return allGroups.filter((g: Record<string, any>) => g.tournamentId === tournamentId);
    } catch (error) {
      console.error('Error getting groups in LocalStorage', error);
      throw new CouldNotFindGroupsException('Could not find groups for tournament in LocalStorage');
    }
  }
  
  private async getAllGroups(): Promise<Record<string, any>[]> {
    try {
      const data = localStorage.getItem(LocalStorage.GROUPS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting groups in LocalStorage', error);
      throw new CouldNotFindGroupsException('Could not find groups in LocalStorage');
    }
  }

  async createGroups(groups: Record<string, any>[]): Promise<void> {
    try {
      const allGroups = await this.getAllGroups();
      groups.forEach((g: Record<string, any>) => {
        allGroups.push(g);
      });
      console.info('allGroups', allGroups);
      localStorage.setItem(LocalStorage.GROUPS_STORAGE_KEY, JSON.stringify(allGroups));
    } catch (error) {
      console.error('Error creating groups in LocalStorage', error);
      throw new CouldNotSaveGroupsException('Could not save groups in LocalStorage');
    }
  }

  async updateGroups(groups: Record<string, any>[]): Promise<void> {
    try {
      const allGroups = await this.getAllGroups();
      groups.forEach((g: Record<string, any>) => {
        const index = allGroups.findIndex((group: Record<string, any>) => group.id === g.id);
        if (index >= 0) {
          allGroups[index] = g;
        }
      });
      localStorage.setItem(LocalStorage.GROUPS_STORAGE_KEY, JSON.stringify(allGroups));
    } catch (error) {
      console.error('Error updating groups in LocalStorage', error);
      throw new CouldNotSaveGroupsException('Could not save groups in LocalStorage');
    }
  }
}