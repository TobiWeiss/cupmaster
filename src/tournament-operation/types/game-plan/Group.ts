import { v4 as uuidv4 } from 'uuid';
import { IGroupParticipant } from "./GroupParticipant";

export interface IGroup {
    getId(): string;
    setId(id: string): void;
    getName(): string;
    setName(name: string): void;
    getParticipants(): IGroupParticipant[];
    setParticipants(participants: IGroupParticipant[]): void;
}

export class Group implements IGroup {
    id: string;
    name: string;
    tournamentId: string;
    participants: IGroupParticipant[];

    constructor(tournamentId: string) {
        this.id = uuidv4();
        this.name = '';
        this.tournamentId = tournamentId;
        this.participants = [];
    }

    static init(data: Record<string, any>): Group {
        const group = new Group(data.tournamentId);
        group.name = data.name;
        group.participants = data.participants;
        return group;
    }
    
    static fromObject(object: Record<string, any>): Group {
        const group = new Group(object.tournamentId);
        group.id = object.id;
        group.name = object.name;
        group.participants = object.participants;
        return group;
    }
    
    toObject(): Record<string, any> {
        return {
            id: this.id,
            name: this.name,
            participants: this.participants,
        };
    }
    
    
    getId(): string {
        return this.id;
    }
    
    
    setId(id: string): void {
        this.id = id;
    }
    
    
    getName(): string {
        return this.name;
    }
    
    setName(name: string): void {
        this.name = name;
    }
    
    
    getParticipants(): IGroupParticipant[] {
        return this.participants;
    }
    
    setParticipants(participants: IGroupParticipant[]): void {
        this.participants = participants;
    }
}