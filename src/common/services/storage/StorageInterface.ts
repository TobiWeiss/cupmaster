import { ITournament} from "../../../tournament-operation/types/tournament/Tournament";

export interface StorageInterface {
  getTournaments(): Promise<ITournament[]>;
  getTournament(id: string): Promise<ITournament | null>;
  saveTournament(tournament: Record<string, any>): Promise<void>;
  deleteTournament(id: string): Promise<void>;
}