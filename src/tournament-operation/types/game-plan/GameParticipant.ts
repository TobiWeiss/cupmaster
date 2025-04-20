import { v4 as uuidv4 } from 'uuid';
import { IBaseClass } from '../../../common/types/BaseClass';

export interface IGameParticipant extends IBaseClass {
  getId(): string;
  setId(id: string): void;
  getName(): string;
  setName(name: string): void;
  getLogo(): string | undefined;
  setLogo(logo: string): void;
}

export class GameParticipant implements IGameParticipant {
  id: string;
  name: string;
  logo?: string;

  constructor() {
    this.id = uuidv4();
    this.name = '';
    this.logo = '';
  }

  static init(name: string, logo?: string): GameParticipant {
    const gameParticipant = new GameParticipant();
    gameParticipant.name = name;
    gameParticipant.logo = logo;
    return gameParticipant;
  }

  clone(): GameParticipant {
    const newGameParticipant = new GameParticipant();
    newGameParticipant.id = this.id;
    newGameParticipant.name = this.name;
    newGameParticipant.logo = this.logo;
    return newGameParticipant;
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      logo: this.logo,
    };
  }

  static fromObject(object: Record<string, any>): GameParticipant {
    const gameParticipant = new GameParticipant();
    gameParticipant.setId(object.id); 
    gameParticipant.setName(object.name);
    gameParticipant.setLogo(object.logo);
    return gameParticipant;
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  } 

  setLogo(logo: string) {
    this.logo = logo;
  }

  getId() {
    return this.id;
  } 

  getName() {
    return this.name;
  }

  getLogo() {
    return this.logo;
  }

}
