import { ITournament} from "../../../tournament-init/types/tournament";

export interface StorageInterface {
  getTournaments(): Promise<ITournament[]>;
  getTournament(id: string): Promise<ITournament | null>;
  saveTournament(tournament: ITournament): Promise<void>;
  deleteTournament(id: string): Promise<void>;
}