
export interface IScore {
  getFirstParticipantsScore(): number;
  getSecondParticipantsScore(): number;
  setFirstParticipantsScore(score: number): void;
  setSecondParticipantsScore(score: number): void;
}

export class Score implements IScore {
  firstParticipant: number;
  secondParticipant: number;

  constructor() {
    this.firstParticipant = 0;
    this.secondParticipant = 0;
  }

  getFirstParticipantsScore(): number {
    return this.firstParticipant;
  }

  getSecondParticipantsScore(): number {
    return this.secondParticipant;
  }

  setFirstParticipantsScore(score: number): void {
    this.firstParticipant = score;
  }

  setSecondParticipantsScore(score: number): void {
    this.secondParticipant = score;
  }
  
} 