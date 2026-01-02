import { GameStatus } from './GameStatus';
import { IScore, Score } from './Score';
import { GameField, IGameField } from './GameField';
import { GameTime, IGameTime } from './GameTime';
import { GameParticipant, IGameParticipant } from './GameParticipant';
import { v4 as uuidv4 } from 'uuid';
import { IBaseClass } from '../../../common/types/BaseClass';
import { KnockoutGame } from './KnockoutGame';
import { GroupGame } from './GroupGame';

export interface IGame extends IBaseClass {
  getId(): string;
  setId(id: string): void;
  getFirstParticipant(): IGameParticipant;
  setFirstParticipant(participant: IGameParticipant): void;
  getFirstParticipantScore(): number;
  setFirstParticipantScore(score: number): void;
  getFirstParticipantLogo(): string | undefined;
  setFirstParticipantLogo(logo: string): void;
  getFirstParticipantName(): string;
  setFirstParticipantName(name: string): void;
  getSecondParticipantScore(): number;
  setSecondParticipantScore(score: number): void;
  getSecondParticipant(): IGameParticipant;
  setSecondParticipant(participant: IGameParticipant): void;
  getSecondParticipantLogo(): string | undefined;
  setSecondParticipantLogo(logo: string): void;
  getSecondParticipantName(): string;
  setSecondParticipantName(name: string): void;
  getScore(): IScore;
  setScore(score: IScore): void;
  getTime(): IGameTime;
  setTime(time: IGameTime): void;
  getStartTime(): Date;
  setStartTime(startTime: Date): void;
  getEndTime(): Date | undefined;
  setEndTime(endTime: Date): void;
  getDuration(): number;
  setDuration(duration: number): void;
  getField(): IGameField;
  setField(field: IGameField): void;
  getFieldId(): string;
  setFieldId(fieldId: string): void;
  getFieldName(): string;
  setFieldName(fieldName: string): void;
  getStatus(): GameStatus;
  setStatus(status: GameStatus): void;
  getWinner(): IGameParticipant;
  getLoser(): IGameParticipant;
}

export class Game implements IGame {
  id: string;
  firstParticipant: IGameParticipant;
  secondParticipant: IGameParticipant;
  score: IScore;
  time: IGameTime;
  field: IGameField;
  status: GameStatus;

  constructor() {
    this.id = uuidv4();
    this.firstParticipant = new GameParticipant();
    this.secondParticipant = new GameParticipant();
    this.score = new Score();
    this.time = new GameTime();
    this.field = new GameField();
    this.status = GameStatus.PENDING;
  }

  static init(data: Record<string, any>): Game {
    const game = new Game();
    game.firstParticipant = GameParticipant.init(data.firstParticipant.name, data.firstParticipant.logo);
    game.secondParticipant = GameParticipant.init(data.secondParticipant.name, data.secondParticipant.logo);
    game.score = Score.init(data.score);
    game.time = GameTime.init(data.time);
    game.field = GameField.init(data.field);
    game.status = data.status;
    return game;
  }
  
   clone(): Game {
    const newGame = new Game();

    newGame.firstParticipant = GameParticipant.fromObject(this.firstParticipant);
    newGame.secondParticipant = GameParticipant.fromObject(this.secondParticipant);
    newGame.score = Score.fromObject(this.score);
    newGame.time = GameTime.fromObject(this.time);
    newGame.field = GameField.fromObject(this.field);
    newGame.status = this.status;
    
    return newGame;
  }

  toObject(): Record<string, any> {  
    return {
      id: this.id,
      firstParticipant: this.firstParticipant,
      secondParticipant: this.secondParticipant,
      score: this.score,
      time: this.time,
      field: this.field,
      status: this.status,
    };
  }

  static fromObject(object: Record<string, any>) {
    if(KnockoutGame.isKnockoutGame(object)) {
      return KnockoutGame.fromObject(object);
    }
    if(GroupGame.isGroupGame(object)) {
      return GroupGame.fromObject(object);
    }
    
    const game = new Game();
    game.id = object.id;
    game.firstParticipant = GameParticipant.fromObject(object.firstParticipant);
    game.secondParticipant = GameParticipant.fromObject(object.secondParticipant);
    game.score = Score.fromObject(object.score);
    game.time = GameTime.fromObject(object.time);
    game.field = GameField.fromObject(object.field);
    game.status = object.status;

    return game;
  }

  setId(id: string) {
    this.id = id;
  } 

  getId() {
    return this.id;
  }


  setFirstParticipant(participant: GameParticipant) {
    this.firstParticipant = participant;
  }

  getFirstParticipant() {
    return this.firstParticipant;
  }

  setFirstParticipantScore(score: number) {
    this.score.setFirstParticipantsScore(score);
  }

  getFirstParticipantScore() {
    return this.score.getFirstParticipantsScore();
  }

  setFirstParticipantLogo(logo: string) {
    this.firstParticipant.setLogo(logo);
  }

  getFirstParticipantLogo() {
    return this.firstParticipant.getLogo();
  }

  setFirstParticipantName(name: string) {
    this.firstParticipant.setName(name);
  }

  getFirstParticipantName() {
    return this.firstParticipant.getName();
  }

  setSecondParticipantLogo(logo: string) {
    this.secondParticipant.setLogo(logo);
  }

  getSecondParticipantLogo() {
    return this.secondParticipant.getLogo();
  }

  setSecondParticipant(participant: GameParticipant) {
    this.secondParticipant = participant;
  }

  getSecondParticipant() {
    return this.secondParticipant;
  }

  setSecondParticipantScore(score: number) {
    this.score.setSecondParticipantsScore(score);
  }

  getSecondParticipantScore() {
    return this.score.getSecondParticipantsScore();
  }

  setSecondParticipantName(name: string) {
    this.secondParticipant.setName(name);
  }

  getSecondParticipantName() {
    return this.secondParticipant.getName();
  }


  setScore(score: IScore) {
    this.score = score;
  }

  getScore() {
    return this.score;
  }


  setTime(time: IGameTime) {
    this.time = time;
  }

  getTime() {
    return this.time;
  }

  setStartTime(startTime: Date) {
    this.time.setStartTime(startTime);
  }

  getStartTime() {
    return this.time.getStartTime();
  }

  setEndTime(endTime: Date) {
    this.time.setEndTime(endTime);
  }

  getEndTime() {
    return this.time.getEndTime();
  }

  setDuration(duration: number) {
    this.time.setDuration(duration);
  }

  getDuration() {
    return this.time.getDuration();
  }

  setField(field: IGameField) {
    this.field = field;
  }

  
  getField() {
    return this.field;
  }

  setFieldId(fieldId: string) {
     this.field.setId(fieldId);
  }

  getFieldId() {
    return this.field.getId();
  }

  setFieldName(fieldName: string) {
    this.field.setName(fieldName);
  }

  getFieldName() {
    return this.field.getName();
  }

  setStatus(status: GameStatus) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  getWinner() {
    return this.score.getFirstParticipantsScore() > this.score.getSecondParticipantsScore() ? this.firstParticipant : this.secondParticipant;
  }

  getLoser() {
    return this.score.getFirstParticipantsScore() < this.score.getSecondParticipantsScore() ? this.firstParticipant : this.secondParticipant;
  }
} 