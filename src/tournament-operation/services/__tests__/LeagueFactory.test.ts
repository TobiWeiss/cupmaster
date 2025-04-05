import { beforeEach, describe, expect, it } from "vitest";
import { Tournament } from "../../types/tournament/Tournament";
import { LeagueFactory } from "../factories/LeagueFactory";
import scenarios from './legaue-scenarios.json';

describe('LeagueFactory', () => {

    let leagueFactory: LeagueFactory;

    beforeEach(() => {
        leagueFactory = new LeagueFactory();
    });

    describe('Create Game Plan', () => {
        it('should create a game plan with the correct number of games', () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            const expectedData = scenarios.map((scenario) => scenario.expectedData);

            tournaments.forEach((tournament, index) => {
                const gamePlan = leagueFactory.createGamePlan(tournament);
                expect(gamePlan).toBeDefined();
                expect(gamePlan.getGames().length).toBe(expectedData[index].numberOfMatches);
            });
        });

        it('should create a game plan within which no team plays twice in a row', () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            tournaments.forEach((tournament, index) => {
                const gamePlan = leagueFactory.createGamePlan(tournament);
                const games = gamePlan.getGames();
                let teamsLastPlayed: string[] = [];
                games.forEach((game) => {
                    const homeTeam = game.getFirstParticipant().getId();
                    const awayTeam = game.getSecondParticipant().getId();
                    expect(teamsLastPlayed.includes(homeTeam)).toBe(false);
                    expect(teamsLastPlayed.includes(awayTeam)).toBe(false);
                    teamsLastPlayed = [];
                    teamsLastPlayed.push(homeTeam);
                    teamsLastPlayed.push(awayTeam);
                });
            });
        });
    })
});