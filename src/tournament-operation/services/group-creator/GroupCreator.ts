import { Group } from "../../types/game-plan/Group";
import { GroupParticipant } from "../../types/game-plan/GroupParticipant";
import { IParticipant } from "../../types/tournament/Participant";

export class GroupCreator {
    constructor() {
    }

    createGroups(tournamentId: string, participants: IParticipant[], numberOfGroups: number): Group[] {
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
        return groups;
    }
}