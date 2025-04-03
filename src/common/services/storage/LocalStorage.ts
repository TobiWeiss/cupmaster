import { ITournament, Tournament } from '../../../tournament-init/types/tournament';
import { StorageInterface } from './StorageInterface';

export class LocalStorage implements StorageInterface {
  private readonly STORAGE_KEY = 'tournaments';

  private async getAll(): Promise<ITournament[]> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  async getTournaments(): Promise<ITournament[]> {
    return this.getAll();
  }

  async getTournament(id: string): Promise<ITournament | null> {
    const tournaments = await this.getAll();
    return tournaments.find(t => t.id === id) || null;
  }

  async saveTournament(tournament: ITournament): Promise<void> {
    const tournaments = await this.getAll();
    const index = tournaments.findIndex(t => t.id === tournament.id);
    
    if (index >= 0) {
      tournaments[index] = tournament;
    } else {
      tournaments.push(tournament);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tournaments));
  }

  async deleteTournament(id: string): Promise<void> {
    const tournaments = await this.getAll();
    const filtered = tournaments.filter(t => t.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }
}