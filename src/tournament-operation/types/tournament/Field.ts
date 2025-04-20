
import { v4 as uuidv4 } from 'uuid';

export interface IField {
  getId(): string;
  setId(id: string): void;
  getName(): string;
  setName(name: string): void;
}

export class Field implements IField {
  id: string;
  name?: string;

  constructor(name: string = '') {
    this.id = uuidv4();
    this.name = name;
  }

  static init(data: Record<string, any>): Field {
    const field = new Field();
    field.name = data.name;
    return field;
  }

  static fromObject(object: Record<string, any>): Field {
    const field = new Field();
    field.id = object.id;
    field.name = object.name;
    return field;
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
    };
  }

  getId(): string {
    return this.id;
  } 

  setId(id: string): void {
    this.id = id;
  }

  getName(): string {
    return this.name ?? '';
  } 

  setName(name: string): void {
    this.name = name;
  }
} 