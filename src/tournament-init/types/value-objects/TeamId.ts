export class TeamId {
  private constructor(private readonly value: string) {}

  static create(id: string): TeamId {
    if (!id || id.trim().length === 0) {
      throw new Error('Team ID cannot be empty');
    }
    return new TeamId(id);
  }

  toString(): string {
    return this.value;
  }
} 