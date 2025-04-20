
import { IBaseClass } from '../../../common/types/BaseClass';

export interface IGameTime extends IBaseClass {
  getStartTime(): Date;
  setStartTime(startTime: Date): void;
  getEndTime(): Date | undefined;
  setEndTime(endTime: Date): void;
  getDuration(): number;
  setDuration(duration: number): void;
}

export class GameTime implements IGameTime {
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes

  constructor() {
    this.startTime = new Date();
    this.endTime = undefined;
    this.duration = 0;
  }

  static init(data: Record<string, any>): GameTime {
    const gameTime = new GameTime();
    gameTime.startTime = data.startTime;
    gameTime.endTime = data.endTime;
    gameTime.duration = data.duration;
    return gameTime;
  }

  clone(): GameTime {
    const newGameTime = new GameTime();
    newGameTime.startTime = this.startTime;
    newGameTime.endTime = this.endTime;
    newGameTime.duration = this.duration;
    return newGameTime;
  }

  toObject(): Record<string, any> {
    return {
      startTime: this.startTime,
      endTime: this.endTime,
      duration: this.duration,
    };
  }

  static fromObject(object: Record<string, any>): GameTime {
    const gameTime = new GameTime();
    gameTime.startTime = object.startTime;
    gameTime.endTime = object.endTime;
    gameTime.duration = object.duration;
    return gameTime;
  }

  getStartTime(): Date {
    return this.startTime;
  }

  setStartTime(startTime: Date): void {
    this.startTime = startTime;
  }

  getEndTime(): Date | undefined {
    return this.endTime;
  } 

  setEndTime(endTime: Date): void {
    this.endTime = endTime;
  } 

  getDuration(): number {
    return this.duration;
  }

  setDuration(duration: number): void {
    this.duration = duration;
  } 
} 