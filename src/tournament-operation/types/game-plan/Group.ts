import { v4 as uuidv4 } from 'uuid';
import { GroupParticipant, IGroupParticipant } from "./GroupParticipant";

export interface IGroup {
    getId(): string;
    setId(id: string): void;
    getName(): string;
    setName(name: string): void;
    getTournamentId(): string;
    setTournamentId(tournamentId: string): void;
    getParticipants(): IGroupParticipant[];
    setParticipants(participants: IGroupParticipant[]): void;
    addParticipant(participant: IGroupParticipant): void;
    removeParticipant(participant: IGroupParticipant): void;
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
        group.id = data.id;
        group.name = data.name;
        group.tournamentId = data.tournamentId;
        group.participants = data.participants;
        return group;
    }
    
    static fromObject(object: Record<string, any>): Group {
        const group = new Group(object.tournamentId);
        group.id = object.id;
        group.name = object.name;
        group.tournamentId = object.tournamentId;
        group.participants = object.participants.map((p: Record<string, any>) => GroupParticipant.fromObject(p));
        return group;
            }
            
    toObject(): Record<string, any> {
        return {
            id: this.id,
            name: this.name,
            tournamentId: this.tournamentId,
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

    addParticipant(participant: IGroupParticipant): void {
        this.participants.push(participant);
    }

    removeParticipant(participant: IGroupParticipant): void {
        this.participants = this.participants.filter(p => p.getId() !== participant.getId());
    }

    getTournamentId(): string {
        return this.tournamentId;
    }

    setTournamentId(tournamentId: string): void {
        this.tournamentId = tournamentId;
    }
}