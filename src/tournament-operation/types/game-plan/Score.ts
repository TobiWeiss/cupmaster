
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

  static init(data: Record<string, any>): Score {
    const score = new Score();
    score.firstParticipant = data.firstParticipant;
    score.secondParticipant = data.secondParticipant;
    return score;
  }

  static clone(score: Score): Score {
    const newScore = new Score();
    newScore.firstParticipant = score.firstParticipant;
    newScore.secondParticipant = score.secondParticipant;
    return newScore;
  }

  toObject(): Record<string, any> {
    return {
      firstParticipant: this.firstParticipant,
      secondParticipant: this.secondParticipant,
    };
  }

  static fromObject(object: Record<string, any>): Score {
    const score = new Score();
    score.firstParticipant = object.firstParticipant;
    score.secondParticipant = object.secondParticipant;
    return score;
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