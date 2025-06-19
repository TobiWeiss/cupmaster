import { beforeEach, describe, expect, it } from "vitest";
import { Tournament } from "../../../types/tournament/Tournament";
import { LeagueCreator } from "../../game-plan-creators/LeagueCreator";
import scenarios from '../legaue-scenarios.json';
import { Field } from "../../../types/tournament/Field";

describe('LeagueCreator', () => {

    let leagueCreator: LeagueCreator;

    beforeEach(() => {
        leagueCreator = new LeagueCreator();
    });

    describe('Create Game Plan', () => {
        it('should create a game plan with the correct number of games', () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            const expectedData = scenarios.map((scenario) => scenario.expectedData);

            tournaments.forEach((tournament, index) => {
                const gamePlan = leagueCreator.createGamePlan(tournament);
                expect(gamePlan).toBeDefined();
                expect(gamePlan.getGames().length).toBe(expectedData[index].numberOfMatches);
            });
        });

        it('should create a game plan with the correct amount of matches against each participant', () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            const expectedData = scenarios.map((scenario) => scenario.expectedData);

            tournaments.forEach((tournament, index) => {
                const gamePlan = leagueCreator.createGamePlan(tournament);

                expect(gamePlan).toBeDefined();
                const participants = tournament.getParticipants();
                participants.forEach((participant1) => {
                    participants.forEach((participant2) => {
                        if (participant1.getId() === participant2.getId()) {
                            return;
                        }

                        const games = gamePlan.getGames().filter((game) => game.getFirstParticipant().getId() === participant1.getId() && game.getSecondParticipant().getId() === participant2.getId()
                            || game.getFirstParticipant().getId() === participant2.getId() && game.getSecondParticipant().getId() === participant1.getId());
                        expect(games.length).toBe(expectedData[index].matchesAgainstEachParticipant);
                    });
                });
            });
        });

        it('should create a game plan within which no team plays twice in a row within a round if the tournament has 6 or more participants', () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            tournaments.forEach((tournament, index) => {
                const gamePlan = leagueCreator.createGamePlan(tournament);
                const expectedData = scenarios[index].expectedData;
                gamePlan.getGames().splice(0, (expectedData.numberOfMatches / expectedData.matchesAgainstEachParticipant));
                console.log(gamePlan.getGames());
                let teamsLastPlayed: string[] = [];
                gamePlan.getGames().forEach((game) => {
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

        it('should create a game plan within which no team plays three times in a row within a round if the tournament has less than 6 participants', () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            const numberOfParticipants = [4, 5];
            numberOfParticipants.forEach((numberOfParticipants) => {
                tournaments.forEach((tournament, index) => {
                    tournament.setParticipants(tournament.getParticipants().slice(0, numberOfParticipants));
                    const gamePlan = leagueCreator.createGamePlan(tournament);
                    const expectedData = scenarios[index].expectedData;
                    gamePlan.getGames().splice(0, (expectedData.numberOfMatches / expectedData.matchesAgainstEachParticipant));

                    let teamsLastPlayed: string[] = [];
                    let teamsPlayedNextToLast: string[] = [];
                    gamePlan.getGames().forEach((game) => {
                        const homeTeam = game.getFirstParticipant().getId();
                        const awayTeam = game.getSecondParticipant().getId();
                        expect(teamsLastPlayed.includes(homeTeam) && teamsPlayedNextToLast.includes(homeTeam)).toBe(false);
                        expect(teamsLastPlayed.includes(awayTeam) && teamsPlayedNextToLast.includes(awayTeam)).toBe(false);
                        teamsPlayedNextToLast = [];
                        teamsPlayedNextToLast.push(teamsLastPlayed[0]);
                        teamsPlayedNextToLast.push(teamsLastPlayed[1]);
                        teamsLastPlayed = [];
                        teamsLastPlayed.push(homeTeam);
                        teamsLastPlayed.push(awayTeam);
                    });
                });
            });
        });

        it('should distribute the games over the fields', () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            tournaments.forEach((tournament) => {
                const gamePlan = leagueCreator.createGamePlan(tournament);
                const fields = tournament.getFields();
                let fieldIndex = 0;
                gamePlan.getGames().forEach((game) => {
                    expect(game.getField()).toBeDefined();
                    expect(game.getField().getName()).toBe(fields[fieldIndex].getName());
                    fieldIndex++;
                    if (fieldIndex >= fields.length) {
                        fieldIndex = 0;
                    }
                });
            });
        });


        it('should set the correct time for each game while respecting that matches can be played in parallel', () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            tournaments.forEach((tournament, index) => {
                const gamePlan = leagueCreator.createGamePlan(tournament);
                const expectedData = scenarios[index].expectedData;

                gamePlan.getGames().forEach((game, indexGame) => {
                    if (indexGame == 0) {
                        expect(game.getStartTime()).toEqual(new Date(expectedData.expectedFirstGameStartTime));
                    }

                    if (indexGame == 5) {
                        expect(game.getStartTime()).toEqual(new Date(expectedData.expectedSixtGameStartTime));
                    }

                    if (indexGame == gamePlan.getGames().length - 1) {
                        expect(game.getStartTime()).toEqual(new Date(expectedData.expectedLastGameStartTime));
                    }
                });
            });
        });
    });

    describe('Update Fields and Dates', () => {
        it('should update the fields and dates of the game plan if a field is added to the tournament', () => {
            const tournament = Tournament.init(scenarios[0].initialData);
            const gamePlan = leagueCreator.createGamePlan(tournament);
            const newTournament = Tournament.init(scenarios[0].initialData);
            newTournament.addField(new Field('Test Field'));
            const newGamePlan = leagueCreator.updateFieldsAndDates(gamePlan, newTournament);
            expect(newGamePlan.getGames().length).toEqual(gamePlan.getGames().length);
            const timeOfLastGame = newGamePlan!.getLastGame()!.getStartTime();
            expect(timeOfLastGame).toEqual(new Date("2030-03-08T10:24:00.000Z"));
        });
    });
});