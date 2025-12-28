
export interface StorageInterface {
  getTournaments(): Promise<Record<string, any>[]>;
  getTournament(id: string): Promise<Record<string, any> | null>;
  saveTournament(tournament: Record<string, any>): Promise<void>;
  deleteTournament(id: string): Promise<void>;
  getGamePlan(id: string): Promise<Record<string, any> | null>;
  saveGamePlan(gamePlan: Record<string, any>): Promise<void>;
  deleteGamePlan(id: string): Promise<void>;
  getGroups(tournamentId: string): Promise<Record<string, any>[]>;
  createGroups(groups: Record<string, any>[]): Promise<void>;
  updateGroups(groups: Record<string, any>[]): Promise<void>;
}