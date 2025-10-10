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