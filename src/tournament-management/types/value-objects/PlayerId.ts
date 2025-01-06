export class PlayerId {
  private constructor(private readonly value: string) {}

  static create(id: string): PlayerId {
    if (!id || id.trim().length === 0) {
      throw new Error('Player ID cannot be empty');
    }
    return new PlayerId(id);
  }

  toString(): string {
    return this.value;
  }
} 