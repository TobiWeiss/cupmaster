
export interface IGameParticipant {
  getId(): string;
  setId(id: string): void;
  getName(): string;
  setName(name: string): void;
  getLogo(): string | undefined;
  setLogo(logo: string): void;
}

export class GameParticipant implements IGameParticipant {
  id: string;
  name: string;
  logo?: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.logo = '';
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  } 

  setLogo(logo: string) {
    this.logo = logo;
  }

  getId() {
    return this.id;
  } 

  getName() {
    return this.name;
  }

  getLogo() {
    return this.logo;
  }
} 