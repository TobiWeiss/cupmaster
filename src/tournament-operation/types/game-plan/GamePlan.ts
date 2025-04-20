import { Game, IGame } from './Game';
import { v4 as uuidv4 } from 'uuid';
import { IBaseClass } from '../../../common/types/BaseClass';

export interface IGamePlan extends IBaseClass {
  getId(): string;
  setId(id: string): void;
  getGames(): IGame[];
  setGames(games: IGame[]): void;
  getMetadata(): {
    created: Date;
    modified: Date;
    version: number;
  };
  setMetadata(metadata: {
    created: Date;
    modified: Date;
    version: number;
  }): void;
} 

export class GamePlan implements IGamePlan {
  id: string;
  tournamentId: string;
  games: IGame[];
  metadata: {
    created: Date;
    modified: Date;
    version: number;
  };

  constructor(
    tournamentId: string,
  ) {
    this.id = uuidv4();
    this.tournamentId = tournamentId;
    this.games = [];
    this.metadata = {
      created: new Date(),
      modified: new Date(),
      version: 0,
    };
  }

  static init( tournamentId: string, data?: Record<string, any>) {
    if(!data || !data.id) {
     return new GamePlan(tournamentId);
    }
    const gamePlan = new GamePlan(data.tournamentId);
    gamePlan.setId(data.id!);
    gamePlan.setGames(data.games);
    gamePlan.setMetadata(data.metadata);
    return gamePlan;
  }

  static fromObject(data: Record<string, any>) {
    const gamePlan = new GamePlan(data.tournamentId);
    gamePlan.setId(data.id!);
    gamePlan.setGames(data.games);
    gamePlan.setMetadata(data.metadata);
    return gamePlan;
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      tournamentId: this.tournamentId,
      games: this.games,
      metadata: this.metadata,
    };
  }

  clone(): GamePlan {
    const gamePlan = new GamePlan(this.tournamentId);
    gamePlan.setId(this.id);
    gamePlan.setGames(this.games.map(game => Game.fromObject(game)));
    gamePlan.setMetadata(this.metadata);
    return gamePlan;
  }


  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setGames(games: IGame[]) {
    this.games = games;
  }

  getGames() {
    return this.games;
  }

  setMetadata(metadata: {
    created: Date;
    modified: Date;
    version: number;
  }) {
    this.metadata = metadata;
  }

  getMetadata() {
    return this.metadata;
  }
}
