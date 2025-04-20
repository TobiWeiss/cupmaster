
import { v4 as uuidv4 } from 'uuid';
import { IBaseClass } from '../../../common/types/BaseClass';

export interface IGameField extends IBaseClass {
  getId(): string;
  setId(id: string): void;
  getName(): string;
  setName(name: string): void;
}

export class GameField implements IGameField {
  id: string;
  name?: string;

  constructor(name?: string) {
    this.id = uuidv4();
    this.name = name;
  }

  static init(data: Record<string, any>): GameField {
    const gameField = new GameField();
    gameField.name = data.name;
    return gameField;
  }

  clone(): GameField {
    const newGameField = new GameField();
    newGameField.id = this.id;
    newGameField.name = this.name;
    return newGameField;
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
    };
  }

  static fromObject(object: Record<string, any>): GameField {
    const gameField = new GameField();
    gameField.id = object.id;
    gameField.name = object.name;
    return gameField;
  }
  
  getId(): string {
    return this.id;
  } 

  setId(id: string): void {
    this.id = id;
  }

  getName(): string {
    return this.name ?? '';
  } 

  setName(name: string): void {
    this.name = name;
  }
} 