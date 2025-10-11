import { beforeEach, describe, expect, it } from "vitest";
import scenarios from '../group-knockout-scenarios.json';
import { Tournament } from "../../../types/tournament/Tournament";
import { GroupCreator } from "../../game-plan-creators/GroupCreator";
import { GroupInitializer } from "../../group-initializer/GroupInitializer";
import { TournamentFormat, TournamentPhase } from "../../../types/tournament/TournamentFormat";
import { IGroup } from "../../../types/game-plan/Group";
import { IGamePlan } from "../../../types/game-plan/GamePlan";

describe('GroupCreator', () => {
    let groupCreator: GroupCreator;
    let groupInitializer: GroupInitializer;

    beforeEach(() => {
        groupCreator = new GroupCreator();
        groupInitializer = new GroupInitializer();
    });

    describe('Create Game Plan', () => {
        it('should create a game plan with the correct number of games', () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });
            const expectedData = scenarios.map((scenario) => scenario.expectedData);

            tournaments.forEach((tournament, index) => {
                const groups = groupInitializer.initGroups(tournament.getId(), tournament.getParticipants(), tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE));
                const gamePlan = groupCreator.createGamePlan(tournament, groups);
                expect(gamePlan).toBeDefined();
                expect(gamePlan.getGames().length).toBe(expectedData[index].numberOfMatches);
                assertGroupParticipantsHaveCorrectAmountOfGames(gamePlan, groups, tournament.getMatchesAgainstEachParticipant(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE));
            });
        });

        it('should distribute the games over the fields', () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            tournaments.forEach((tournament) => {
                const groups = groupInitializer.initGroups(tournament.getId(), tournament.getParticipants(), tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE));
                const gamePlan = groupCreator.createGamePlan(tournament, groups);
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
                const groups = groupInitializer.initGroups(tournament.getId(), tournament.getParticipants(), tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE));
                const gamePlan = groupCreator.createGamePlan(tournament, groups);
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
});

const assertGroupParticipantsHaveCorrectAmountOfGames = (gamePlan: IGamePlan, groups: IGroup[], matchesAgainstEachParticipant: number) => {
    groups.forEach(group => {
        group.getParticipants().forEach(participant => {
            expect(gamePlan.getGames()
                .filter(game => game.getFirstParticipant().getId() === participant.getId() || game.getSecondParticipant().getId() === participant.getId()).length
            ).toBe((group.getParticipants().length - 1) * matchesAgainstEachParticipant);
        });
    });
}