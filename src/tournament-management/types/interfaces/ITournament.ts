import { TournamentId } from '../value-objects/TournamentId';
import { ITournamentConfig } from './ITournamentConfig';
import { ITeam } from './ITeam';
import { TournamentStatus } from '../enums';

export interface ITournament {
  id: TournamentId;
  config: ITournamentConfig;
  teams: ITeam[];
  status: TournamentStatus;
} 