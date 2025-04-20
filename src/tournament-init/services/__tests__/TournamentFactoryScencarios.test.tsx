import { describe, expect, it } from 'vitest';
import scenarios from './scenarios.json';
import { TournamentCreator } from '../TournamentCreator';

describe('TournamentFactory Scenarios', () => {
    scenarios.forEach((scenario) => {
        it(`should create a tournament from form data: ${scenario.name}`, () => {
            const input = scenario.inputData;
            const expectedOutput = scenario.expectedData;
            const tournament = TournamentCreator.fromFormData(input!);
            const output = TournamentCreator.toFormData(tournament);
            expect(output).toEqual(expectedOutput);
        });
    });
}); 

