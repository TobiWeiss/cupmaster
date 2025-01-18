import { ITournament } from '../interfaces/ITournament';
import { ITournamentConfig } from '../interfaces/ITournamentConfig';
import { ITeam } from '../interfaces/ITeam';
import { TournamentId } from '../value-objects/TournamentId';
import { TournamentStatus } from '../enums';

export class Tournament implements ITournament {
  constructor(
    public readonly id: TournamentId,
    public config: ITournamentConfig,
    public teams: ITeam[],
    public status: TournamentStatus
  ) {}

  static create(
    id: string,
    config: ITournamentConfig,
    teams: ITeam[] = [],
    status: TournamentStatus = TournamentStatus.NOT_STARTED
  ): Tournament {
    return new Tournament(
      TournamentId.create(id),
      config,
      teams,
      status
    );
  }

  addTeam(team: ITeam): void {
    if (this.status !== TournamentStatus.NOT_STARTED) {
      throw new Error('Cannot add teams after tournament has started');
    }
    this.teams.push(team);
  }

  start(): void {
    if (this.teams.length < 2) {
      throw new Error('Tournament needs at least 2 teams to start');
    }
    this.status = TournamentStatus.IN_PROGRESS;
  }

  complete(): void {
    if (this.status !== TournamentStatus.IN_PROGRESS) {
      throw new Error('Can only complete tournaments that are in progress');
    }
    this.status = TournamentStatus.COMPLETED;
  }
} 