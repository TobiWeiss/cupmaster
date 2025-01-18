import { Team, Tournament } from '../types/tournament';
import { StorageInterface } from '../../common/services/storage/StorageInterface';
import { v4 as uuidv4 } from 'uuid';

export class TournamentService {
  constructor(private storage: StorageInterface) {}

  async createTournament(data: Omit<Tournament, 'id' | 'status' | 'groups'>): Promise<Tournament> {
    const tournament: Tournament = {
      ...data,
      id: uuidv4(),
      status: 'NOT_STARTED',
      teams: [],
    };

    await this.storage.saveTournament(tournament);
    return tournament;
  }

  async getTournament(id: string): Promise<Tournament | null> {
    return this.storage.getTournament(id);
  }

  async addTeam(tournamentId: string, team: Omit<Team, 'id'>): Promise<Team> {
    const tournament = await this.storage.getTournament(tournamentId);
    if (!tournament) throw new Error('Tournament not found');

    const newTeam: Team = {
      ...team,
      id: uuidv4(),
    };

    tournament.teams.push(newTeam);
    await this.storage.saveTournament(tournament);
    return newTeam;
  }
}