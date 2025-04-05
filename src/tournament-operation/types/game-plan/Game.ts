import { GameStatus } from './GameStatus';
import { IScore, Score } from './Score';
import { Field, IField } from './Field';
import { GameTime, IGameTime } from './GameTime';
import { GameParticipant, IGameParticipant } from './GameParticipant';
import { v4 as uuidv4 } from 'uuid';

export interface IGame {
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
  getField(): IField;
  setField(field: IField): void;
  getFieldId(): string;
  setFieldId(fieldId: string): void;
  getFieldName(): string;
  setFieldName(fieldName: string): void;
  getStatus(): GameStatus;
  setStatus(status: GameStatus): void;
  getWinnerPlays(): IGame | null;
  setWinnerPlays(game: IGame): void;
  getLoserPlays(): IGame | null;
  setLoserPlays(game: IGame): void;
  getWinner(): IGameParticipant;
  getLoser(): IGameParticipant;
}

export class Game implements IGame {
  id: string;
  firstParticipant: IGameParticipant;
  secondParticipant: IGameParticipant;
  score: IScore;
  time: IGameTime;
  field: IField;
  status: GameStatus;
  winnerPlays: IGame | null; 
  loserPlays: IGame | null;

  constructor() {
    this.id = uuidv4();
    this.firstParticipant = new GameParticipant();
    this.secondParticipant = new GameParticipant();
    this.score = new Score();
    this.time = new GameTime();
    this.field = new Field();
    this.status = GameStatus.PENDING;
    this.winnerPlays = null;
    this.loserPlays = null;
  }

  static init(data: Record<string, any>): Game {
    const game = new Game();
    game.id = data.id;
    game.firstParticipant = data.firstParticipant;
    game.secondParticipant = data.secondParticipant;
    game.score = data.score;
    game.time = data.time;
    game.field = data.field;
    game.status = data.status;
    game.winnerPlays = data.winnerPlays;
    game.loserPlays = data.loserPlays;
    return game;
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
      winnerPlays: this.winnerPlays,
      loserPlays: this.loserPlays,
    };
  }

  fromObject(object: Record<string, any>) {
    this.id = object.id;
    this.firstParticipant = object.firstParticipant;
    this.secondParticipant = object.secondParticipant;
    this.score = object.score;
    this.time = object.time;
    this.field = object.field;
    this.status = object.status;
    this.winnerPlays = object.winnerPlays;
    this.loserPlays = object.loserPlays;
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

  setField(field: IField) {
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


  setWinnerPlays(game: IGame) {
    this.winnerPlays = game;
  }

  
  getWinnerPlays() {
    return this.winnerPlays;
  }

  setLoserPlays(game: IGame) {
    this.loserPlays = game;
  }

  getLoserPlays() {
    return this.loserPlays;
  } 

  getWinner() {
    return this.score.getFirstParticipantsScore() > this.score.getSecondParticipantsScore() ? this.firstParticipant : this.secondParticipant;
  }

  getLoser() {
    return this.score.getFirstParticipantsScore() < this.score.getSecondParticipantsScore() ? this.firstParticipant : this.secondParticipant;
  }
} 