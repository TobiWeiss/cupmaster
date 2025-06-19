import { describe, expect, it } from 'vitest';
import scenarios from './scenarios.json';
import { TournamentCreator } from '../TournamentCreator';
import { TournamentFormat, TournamentPhase } from '../../../tournament-operation/types/tournament/TournamentFormat';
import { Tiebreaker } from '../../../tournament-operation/types/tournament/Tiebreaker';

describe('TournamentCreator Scenarios', () => {
    scenarios.forEach((scenario) => {
        it(`should create a valid tournament from form data: ${scenario.name}`, () => {
            const input = scenario.inputData;
            const tournament = TournamentCreator.fromFormData(input!);

            // Validate basic tournament properties
            expect(tournament.getName()).toBe(input.name);
            expect(tournament.getLogoUrl()).toBe(input.logoUrl || undefined);
            expect(tournament.getStartDate()).toEqual(new Date(input.startDate));
            expect(tournament.getNumberOfParticipants()).toBe(input.numberOfParticipants);
            expect(tournament.getParticipants()).toHaveLength(input.participants.length);

            // Validate participants
            input.participants.forEach((participant: any, index: number) => {
                expect(tournament.getParticipants()[index].name).toBe(participant.name);
                expect(tournament.getParticipants()[index].logo).toBe(participant.logo);
            });

            // Validate fields
            if (input.fields) {
                expect(tournament.getFields()).toHaveLength(input.fields);
                tournament.getFields().forEach((field, index) => {
                    expect(field.getName()).toBe(`Field ${index + 1}`);
                });
            }

            // Validate end date if present
            if (input.multipleDays && input.endDate) {
                expect(tournament.getEndDate()).toEqual(new Date(input.endDate));
            } else {
                expect(tournament.getEndDate()).toBeUndefined();
            }

            // Validate format-specific configurations
            switch (input.format) {
                case TournamentFormat.LEAGUE:
                    validateLeagueConfig(tournament, input);
                    break;
                case TournamentFormat.KNOCKOUT:
                    validateKnockoutConfig(tournament, input);
                    break;
                case TournamentFormat.GROUP_KNOCKOUT:
                    validateGroupKnockoutConfig(tournament, input);
                    break;
            }
        });
    });
});

function validateLeagueConfig(tournament: any, input: any) {
    expect(tournament.getFormat()).toBe(TournamentFormat.LEAGUE);
    expect(tournament.getPhases()).toEqual([]);
    
    expect(tournament.getMatchesAgainstEachParticipant(TournamentFormat.LEAGUE))
        .toBe(input['leagueConfig.matchesAgainstEachParticipant'] || 1);
    expect(tournament.getMatchDuration(TournamentFormat.LEAGUE))
        .toBe(input['leagueConfig.matchDuration'] || 10);
    expect(tournament.getMatchBreakDuration(TournamentFormat.LEAGUE))
        .toBe(input['leagueConfig.matchBreak'] || 2);
    expect(tournament.getPointsForWin(TournamentFormat.LEAGUE))
        .toBe(input['leagueConfig.pointsForWin'] || 3);
    expect(tournament.getPointsForDraw(TournamentFormat.LEAGUE))
        .toBe(input['leagueConfig.pointsForDraw'] || 1);
    
    const expectedTiebreakers = input['leagueConfig.tiebreakers'] || [
        Tiebreaker.GOAL_DIFFERENCE, 
        Tiebreaker.HEAD_TO_HEAD, 
        Tiebreaker.GOALS_SCORED
    ];
    expect(tournament.getTiebreakers(TournamentFormat.LEAGUE)).toEqual(expectedTiebreakers);
}

function validateKnockoutConfig(tournament: any, input: any) {
    expect(tournament.getFormat()).toBe(TournamentFormat.KNOCKOUT);
    expect(tournament.getPhases()).toEqual([TournamentPhase.KNOCKOUT_STAGE]);
    
    expect(tournament.getMatchesAgainstEachParticipant(TournamentFormat.KNOCKOUT))
        .toBe(input['knockoutConfig.matchesAgainstEachParticipant'] || 1);
    expect(tournament.getMatchDuration(TournamentFormat.KNOCKOUT))
        .toBe(input['knockoutConfig.matchDuration'] || 10);
    expect(tournament.getMatchBreakDuration(TournamentFormat.KNOCKOUT))
        .toBe(input['knockoutConfig.matchBreak'] || 2);
    expect(tournament.getHasThirdPlaceMatch(TournamentFormat.KNOCKOUT))
        .toBe(input['knockoutConfig.hasThirdPlace'] || false);
}

function validateGroupKnockoutConfig(tournament: any, input: any) {
    expect(tournament.getFormat()).toBe(TournamentFormat.GROUP_KNOCKOUT);
    expect(tournament.getPhases()).toEqual([TournamentPhase.GROUP_STAGE, TournamentPhase.KNOCKOUT_STAGE]);
    
    // Group Stage validation
    expect(tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE))
        .toBe(input['groupConfig.numberOfGroups'] || 1);
    expect(tournament.getMatchesAgainstEachParticipant(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE))
        .toBe(input['groupConfig.matchesAgainstEachParticipant'] || 1);
    expect(tournament.getMatchDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE))
        .toBe(input['groupConfig.matchDuration'] || 10);
    expect(tournament.getMatchBreakDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE))
        .toBe(input['groupConfig.matchBreak'] || 2);
    expect(tournament.getPointsForWin(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE))
        .toBe(input['groupConfig.pointsForWin'] || 3);
    expect(tournament.getPointsForDraw(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE))
        .toBe(input['groupConfig.pointsForDraw'] || 1);
    expect(tournament.getQualifiedParticipants(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE))
        .toBe(input['groupConfig.qualifiedParticipants'] || 1);
    
    const expectedGroupTiebreakers = input['groupConfig.tiebreakers'] || [
        Tiebreaker.GOAL_DIFFERENCE, 
        Tiebreaker.HEAD_TO_HEAD, 
        Tiebreaker.GOALS_SCORED
    ];
    expect(tournament.getTiebreakers(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE))
        .toEqual(expectedGroupTiebreakers);
    
    // Knockout Stage validation
    expect(tournament.getMatchesAgainstEachParticipant(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE))
        .toBe(input['knockoutConfig.matchesAgainstEachParticipant'] || 1);
    expect(tournament.getMatchDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE))
        .toBe(input['knockoutConfig.matchDuration'] || 10);
    expect(tournament.getMatchBreakDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE))
        .toBe(input['knockoutConfig.matchBreak'] || 2);
    expect(tournament.getHasThirdPlaceMatch(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE))
        .toBe(input['knockoutConfig.hasThirdPlace'] || false);
} 

