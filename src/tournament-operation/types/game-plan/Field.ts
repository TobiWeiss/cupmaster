
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

  constructor() {
    this.id = uuidv4();
    this.name = '';
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