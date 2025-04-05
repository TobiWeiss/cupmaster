import { describe, expect, it } from 'vitest';
import scenarios from './scenarios.json';
import { TournamentFactory } from '../TournamentFactory';

describe('TournamentFactory Scenarios', () => {
    scenarios.forEach((scenario) => {
        it(`should create a tournament from form data: ${scenario.name}`, () => {
            const input = scenario.inputData;
            const expectedOutput = scenario.expectedData;
            const tournament = TournamentFactory.fromFormData(input!);
            const output = TournamentFactory.toFormData(tournament);
            expect(output).toEqual(expectedOutput);
        });
    });
}); 

