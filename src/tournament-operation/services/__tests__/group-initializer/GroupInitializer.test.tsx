import { GroupInitializer } from "../../group-initializer/GroupInitializer";
import { describe, expect, it } from "vitest";
import { Participant } from "../../../types/tournament/Participant";

describe('GroupCreator', () => {
    it('should create groups if participants can be equally distributed on groups', () => {
        const groupInitializer = new GroupInitializer();
        const twentyParticipants = Array.from({ length: 20 }, (_, index) => new Participant(`Participant ${index + 1}`, `https://example.com/logo${index + 1}.png`));
        const groups = groupInitializer.initGroups("test", twentyParticipants, 5);
        expect(groups.length).toBe(5);
        expect(groups[0].getParticipants().length).toBe(4);
        expect(groups[1].getParticipants().length).toBe(4);
        expect(groups[2].getParticipants().length).toBe(4);
        expect(groups[3].getParticipants().length).toBe(4);
        expect(groups[4].getParticipants().length).toBe(4);
        expect(groups[0].getParticipants()[0].getName()).toBe('Participant 1');
        expect(groups[1].getParticipants()[0].getName()).toBe('Participant 2');
        expect(groups[2].getParticipants()[0].getName()).toBe('Participant 3');
        expect(groups[3].getParticipants()[0].getName()).toBe('Participant 4');
        expect(groups[4].getParticipants()[0].getName()).toBe('Participant 5');

        const setOfParticipants = new Set(groups.flatMap(group => group.getParticipants().map(participant => participant.getName())));
        expect(setOfParticipants.size).toBe(20);
    });

    it('should create groups if participants cannot be equally distributed on groups', () => {
        const groupInitializer = new GroupInitializer();
        const fifteenParticipants = Array.from({ length: 15 }, (_, index) => new Participant(`Participant ${index + 1}`, `https://example.com/logo${index + 1}.png`));
        const groups = groupInitializer.initGroups("test", fifteenParticipants, 2);
        expect(groups.length).toBe(2);
        expect(groups[0].getParticipants().length).toBe(8);
        expect(groups[1].getParticipants().length).toBe(7);
        const setOfParticipants = new Set(groups.flatMap(group => group.getParticipants().map(participant => participant.getName())));
        expect(setOfParticipants.size).toBe(15);
    });

    it('should create groups if number of participants is lower than numberOfGroups', () => {
        const groupInitializer = new GroupInitializer();
        const groups = groupInitializer.initGroups("test", [new Participant('Participant 1', 'https://example.com/logo1.png')], 2);
        expect(groups.length).toBe(2);
        expect(groups[0].getParticipants().length).toBe(1);
        expect(groups[1].getParticipants().length).toBe(0);
    });

    it('should return an empty array if no participants are provided', () => {
        const groupInitializer = new GroupInitializer();
        const groups = groupInitializer.initGroups("test", [], 2);
        expect(groups.length).toBe(0);
    });

    it('should return an empty array if numberOfGroups is 0', () => {
        const groupInitializer = new GroupInitializer();
        const groups = groupInitializer.initGroups("test", [new Participant('Participant 1', 'https://example.com/logo1.png'), new Participant('Participant 2', 'https://example.com/logo2.png')], 0);
        expect(groups.length).toBe(0);
    });
}); 