import { ITournament, Team, Tournament, TournamentStatus } from '../../tournament-init/types/tournament';
import { StorageInterface } from '../../common/services/storage/StorageInterface';
import { v4 as uuidv4 } from 'uuid';

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
    return data.map((tournament: ITournament) => Tournament.init(tournament));
  }

  async updateTournament(tournament: Tournament): Promise<Tournament> {
    this.storage.saveTournament(tournament.toObject());

    return tournament;
  }
}