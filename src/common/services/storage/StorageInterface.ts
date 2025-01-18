import { Tournament } from "../../../tournament-init/types/tournament";

export interface StorageInterface {
  getTournaments(): Promise<Tournament[]>;
  getTournament(id: string): Promise<Tournament | null>;
  saveTournament(tournament: Tournament): Promise<void>;
  deleteTournament(id: string): Promise<void>;
}