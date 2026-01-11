import { Group } from "../../types/game-plan/Group";
import { GroupParticipant } from "../../types/game-plan/GroupParticipant";
import { IParticipant } from "../../types/tournament/Participant";

export class GroupInitializer {
    
    constructor() {
    }

    initGroups(tournamentId: string, participants: IParticipant[], numberOfGroups: number): Group[] {
        console.info('initGroups', tournamentId, participants, numberOfGroups);
        if (!participants || participants.length === 0) {
            return [];
        }
        if (numberOfGroups < 1) {
            return [];
        }

        const groups: Group[] = [];
        for (let i = 0; i < numberOfGroups; i++) {
            groups.push(new Group(tournamentId));
        }
        participants.forEach((participant, index) => {
            const group = groups[index % numberOfGroups];
            group.addParticipant(GroupParticipant.fromParticipant(participant));
        });
        console.info('groups', groups, numberOfGroups);
        return groups;
    }

    /**
     * Adds a new participant to the group with the least participants
     * @param tournamentId 
     * @param participant 
     * @param groups 
     */
    addParticipantToGroup(participant: IParticipant, groups: Group[]): Group[] {
        const group = groups.sort((a, b) => a.getParticipants().length - b.getParticipants().length)[0];
        if (group) {
            group.addParticipant(GroupParticipant.fromParticipant(participant));
        }
        return groups;
    }

    removeParticipantFromGroup(participant: IParticipant, groups: Group[]): Group[] {
        const group = groups.find(g => g.getParticipants().some(p => p.getId() === participant.getId()));
        if (group) {
            group.removeParticipant(GroupParticipant.fromParticipant(participant));
        }
        return groups;
    }
}