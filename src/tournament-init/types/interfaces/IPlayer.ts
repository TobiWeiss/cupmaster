import { PlayerId } from '../value-objects/PlayerId';

export interface IPlayer {
  id: PlayerId;
  name: string;
  number: string;
  birthDate: Date;
} 