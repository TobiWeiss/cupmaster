import { ITournament,  Tournament, } from '../types/tournament/Tournament';
import { StorageInterface } from '../../common/services/storage/StorageInterface';
import { v4 as uuidv4 } from 'uuid';
import { TournamentStatus } from '../types/tournament/TournamentStatus';

export class TournamentService {
  constructor(private storage: StorageInterface) {}

  async createTournament(data: Tournament): Promise<Tournament> {
    const tournament: Tournament = data;
    tournament.id = uuidv4();
    tournament.status = TournamentStatus.INITIALIZED;

    await this.storage.saveTournament(tournament.toObject());
    return tournament;
  }

  async getTournament(id: string): Promise<Tournament | null> {
    
    const data = await this.storage.getTournament(id);
    
    return data ? Tournament.init(data) : null;
  }

  async getAllTournaments(): Promise<Tournament[]> {
    const data  = await this.storage.getTournaments();
    return data.map((tournament: Record<string, any>) => Tournament.fromObject(tournament));
  }

  async updateTournament(tournament: ITournament): Promise<Tournament> {
    await this.storage.saveTournament(tournament);

    return Tournament.init(tournament);
  }
}