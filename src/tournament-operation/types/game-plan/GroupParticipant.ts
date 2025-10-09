import { v4 as uuidv4 } from 'uuid';
import { IBaseClass } from '../../../common/types/BaseClass';
import { IParticipant } from '../tournament/Participant';

export interface IGroupParticipant extends IBaseClass {
  getId(): string;
  setId(id: string): void;
  getName(): string;
  setName(name: string): void;
  getLogo(): string | undefined;
  setLogo(logo: string): void;
}

export class GroupParticipant implements IGroupParticipant {
  id: string;
  name: string;
  logo?: string;

  constructor() {
    this.id = uuidv4();
    this.name = '';
    this.logo = '';
  }

  static init(name: string, logo?: string): GroupParticipant {
    const groupParticipant = new GroupParticipant();
    groupParticipant.name = name;
    groupParticipant.logo = logo;
    return groupParticipant;
  }

  clone(): GroupParticipant {
    const newGroupParticipant = new GroupParticipant();
    newGroupParticipant.id = this.id;
    newGroupParticipant.name = this.name;
    newGroupParticipant.logo = this.logo;
    return newGroupParticipant;
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      logo: this.logo,
    };
  }

  static fromObject(object: Record<string, any>): GroupParticipant {
    const groupParticipant = new GroupParticipant();
    groupParticipant.setId(object.id); 
    groupParticipant.setName(object.name);
    groupParticipant.setLogo(object.logo);
    return groupParticipant;
  }

  static fromParticipant(participant: IParticipant): GroupParticipant {
    const groupParticipant = new GroupParticipant();
    groupParticipant.setId(participant.getId());
    groupParticipant.setName(participant.getName());
    groupParticipant.setLogo(participant.getLogo());
    return groupParticipant;
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  } 

  setLogo(logo?: string) {
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
