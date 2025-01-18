import { TeamId } from '../value-objects/TeamId';
import { IPlayer } from './IPlayer';

export interface ITeam {
  id: TeamId;
  name: string;
  players: IPlayer[];
} 