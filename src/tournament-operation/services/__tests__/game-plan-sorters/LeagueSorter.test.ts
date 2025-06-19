import { beforeEach, describe, expect, it } from "vitest";
import { LeagueSorter } from "../../game-plan-sorters/LeagueSorter";
import scenarios from '../legaue-scenarios.json';
import { Tournament } from "../../../types/tournament/Tournament";
import { LeagueCreator } from "../../game-plan-creators/LeagueCreator";

describe('LeagueSorter', () => {
    let leagueSorter: LeagueSorter;
    let leagueCreator: LeagueCreator;

    beforeEach(() => {
        leagueCreator = new LeagueCreator();
        leagueSorter = new LeagueSorter();
    });

    describe('Sort Games', () => {
        it('should be able to move a game within the game plan', () => {
            const tournament = Tournament.init(scenarios[0].initialData);
            const gamePlan = leagueCreator.createGamePlan(tournament);
            const firstGameInInitialGamePlan = gamePlan.getGames()[0];
            const secondGameInInitialGamePlan = gamePlan.getGames()[1];
            const sortedGamePlan = leagueSorter.sort(gamePlan, tournament, 0, 9);
            const tenthGameInNewGamePlan = sortedGamePlan.getGames()[9];
            const firstGameInNewGamePlan = sortedGamePlan.getGames()[0];
            expect(firstGameInInitialGamePlan.getId(), "First game should now be the tenth game").toEqual(tenthGameInNewGamePlan.getId());
            expect(secondGameInInitialGamePlan.getId(), "Second game should now be the first game").toEqual(firstGameInNewGamePlan.getId());
            expect(gamePlan.getGames().length, "Game plan should have same length after sorting").toEqual(gamePlan.getGames().length);
        });
    });
});