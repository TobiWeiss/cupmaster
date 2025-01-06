export class TournamentId {
  private constructor(private readonly value: string) {}

  static create(id: string): TournamentId {
    if (!id || id.trim().length === 0) {
      throw new Error('Tournament ID cannot be empty');
    }
    return new TournamentId(id);
  }

  toString(): string {
    return this.value;
  }
} 