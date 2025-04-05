

export interface IGameTime {
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