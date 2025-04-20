import { v4 as uuidv4 } from 'uuid';

export interface IParticipant {
  id?: string;
  name: string;
  contact?: string;
  logo?: string;

  getId(): string;
  setId(id: string): void;
  getName(): string;
  setName(name: string): void;
  getContact(): string | undefined;
  setContact(contact: string): void;
  getLogo(): string | undefined;
  setLogo(logo: string): void;
}

export class Participant implements IParticipant {
  id: string;
  name: string;
  contact?: string;
  logo?: string;

  constructor(name: string = '', logo: string = '', contact: string = '') {
    this.id = uuidv4();
    this.name = name;
    this.contact = contact;
    this.logo = logo;
  }

  static init(data: Record<string, any>) {
    const participant = new Participant();
    participant.name = data.name;
    participant.contact = data.contact;
    participant.logo = data.logo;
    return participant;
  }

  
  static fromObject(data: Record<string, any>) {
    const participant = new Participant();
    participant.id = data.id;
    participant.name = data.name;
    participant.contact = data.contact;
    participant.logo = data.logo;
    return participant;
  }


  toObject(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      contact: this.contact,
      logo: this.logo,
    };
  }

  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setContact(contact: string) {
    this.contact = contact;
  }
  
  getContact() {
    return this.contact;
  }

  setLogo(logo: string) {
    this.logo = logo;
  }

  getLogo() {
    return this.logo;
  } 
} 