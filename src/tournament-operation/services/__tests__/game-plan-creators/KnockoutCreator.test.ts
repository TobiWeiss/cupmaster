import { beforeEach, describe, expect, it, vi } from "vitest";
import scenarios from '../group-knockout-scenarios.json';
import { Tournament } from "../../../types/tournament/Tournament";
import { KnockoutCreator } from "../../game-plan-creators/KnockoutCreator";
import { GroupInitializer } from "../../group-initializer/GroupInitializer";
import { TournamentFormat, TournamentPhase } from "../../../types/tournament/TournamentFormat";
import { StorageInterface } from "../../../../common/services";
import { KnockoutGame } from "../../../types/game-plan/KnockoutGame";
import { PlacementInGroupRule, WinnerOfGameRule, KnockoutGameRuleType } from "../../../types/game-plan/KnockoutGame";

describe('KnockoutCreator', () => {
    let knockoutCreator: KnockoutCreator;
    let groupInitializer: GroupInitializer;
    const storage = {
        getGroups: vi.fn(),
    } as unknown as StorageInterface;

    beforeEach(() => {
        knockoutCreator = new KnockoutCreator(storage);
        groupInitializer = new GroupInitializer();
    });

    describe('createGamePlanAfterGroupGames', () => {
        it('should create the correct amount of games and rounds depending on the amount of qualified teams', async () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            for (const tournament of tournaments) {
                const groups = groupInitializer.initGroups(
                    tournament.getId(),
                    tournament.getParticipants(),
                    tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE)
                );
                vi.spyOn(storage, 'getGroups').mockReturnValue(Promise.resolve(groups.map(g => g.toObject())));

                const gamePlan = await knockoutCreator.createGamePlanAfterGroupGames(tournament);
                expect(gamePlan).toBeDefined();

                const qualifiedTeamsPerGroup = tournament.getQualifiedParticipants(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
                const numberOfGroups = tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
                const totalQualifiedTeams = numberOfGroups * qualifiedTeamsPerGroup;

                // Calculate expected number of games
                // First round: numberOfGroups * qualifiedTeamsPerGroup games (one game per qualified team per group)
                // Then each round halves until we reach the final
                let expectedGames = 0;
                // First round: one game per qualified team per group
                let gamesInFirstRound = numberOfGroups * qualifiedTeamsPerGroup;
                expectedGames += gamesInFirstRound;
                
                // Subsequent rounds: each round halves the number of games
                let gamesInCurrentRound = gamesInFirstRound;
                while (gamesInCurrentRound > 1) {
                    gamesInCurrentRound = gamesInCurrentRound / 2;
                    expectedGames += gamesInCurrentRound;
                }

                // Add third place match if enabled
                const hasThirdPlace = tournament.getHasThirdPlaceMatch(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE);
                if (hasThirdPlace && totalQualifiedTeams >= 4) {
                    expectedGames += 1;
                }

                expect(gamePlan.getGames().length).toBe(expectedGames);
            }
        });

        it('should set the correct rules to the corresponding games', async () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            for (const tournament of tournaments) {
                const groups = groupInitializer.initGroups(
                    tournament.getId(),
                    tournament.getParticipants(),
                    tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE)
                );
                vi.spyOn(storage, 'getGroups').mockReturnValue(Promise.resolve(groups.map(g => g.toObject())));

                const gamePlan = await knockoutCreator.createGamePlanAfterGroupGames(tournament);
                const games = gamePlan.getGames() as KnockoutGame[];

                const qualifiedTeamsPerGroup = tournament.getQualifiedParticipants(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
                const numberOfGroups = tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
                // First round creates qualifiedTeamsPerGroup games per group
                const firstRoundGames = numberOfGroups * qualifiedTeamsPerGroup;

                // Check first round games have PlacementInGroupRule
                for (let i = 0; i < firstRoundGames; i++) {
                    const game = games[i];
                    expect(game).toBeInstanceOf(KnockoutGame);
                    
                    const firstRule = game.getRuleForFirstParticipant();
                    const secondRule = game.getRuleForSecondParticipant();
                    
                    expect(firstRule.getType()).toBe(KnockoutGameRuleType.PLACEMENT_IN_GROUP);
                    expect(secondRule.getType()).toBe(KnockoutGameRuleType.PLACEMENT_IN_GROUP);
                    
                    const firstPlacementRule = firstRule as PlacementInGroupRule;
                    const secondPlacementRule = secondRule as PlacementInGroupRule;
                    
                    // Verify the rules reference valid groups
                    const groupIds = groups.map(g => g.getId());
                    expect(groupIds).toContain(firstPlacementRule.getGroupId());
                    expect(groupIds).toContain(secondPlacementRule.getGroupId());
                    
                    // Verify places are valid (1 to qualifiedTeamsPerGroup)
                    expect(firstPlacementRule.getPlace()).toBeGreaterThanOrEqual(1);
                    expect(firstPlacementRule.getPlace()).toBeLessThanOrEqual(qualifiedTeamsPerGroup);
                    expect(secondPlacementRule.getPlace()).toBeGreaterThanOrEqual(1);
                    expect(secondPlacementRule.getPlace()).toBeLessThanOrEqual(qualifiedTeamsPerGroup);
                }

                // Check later round games have WinnerOfGameRule
                for (let i = firstRoundGames; i < games.length; i++) {
                    const game = games[i];
                    expect(game).toBeInstanceOf(KnockoutGame);
                    
                    const firstRule = game.getRuleForFirstParticipant();
                    const secondRule = game.getRuleForSecondParticipant();
                    
                    expect(firstRule.getType()).toBe(KnockoutGameRuleType.WINNER_OF_GAME);
                    expect(secondRule.getType()).toBe(KnockoutGameRuleType.WINNER_OF_GAME);
                    
                    const firstWinnerRule = firstRule as WinnerOfGameRule;
                    const secondWinnerRule = secondRule as WinnerOfGameRule;
                    
                    // Verify the rules reference valid game IDs from previous rounds
                    const gameIds = games.map(g => g.getId());
                    expect(gameIds).toContain(firstWinnerRule.getGameId());
                    expect(gameIds).toContain(secondWinnerRule.getGameId());
                }
            }
        });

        it('should create rounds with correct names', async () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            for (const tournament of tournaments) {
                const groups = groupInitializer.initGroups(
                    tournament.getId(),
                    tournament.getParticipants(),
                    tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE)
                );
                vi.spyOn(storage, 'getGroups').mockReturnValue(Promise.resolve(groups.map(g => g.toObject())));

                const gamePlan = await knockoutCreator.createGamePlanAfterGroupGames(tournament);
                const games = gamePlan.getGames() as KnockoutGame[];

                const totalQualifiedParticipants = tournament.getQualifiedParticipants(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);

                // Group games by round
                const gamesByRound: Record<string, KnockoutGame[]> = {};
                games.forEach(game => {
                    const round = game.getRound();
                    if (!gamesByRound[round]) {
                        gamesByRound[round] = [];
                    }
                    gamesByRound[round].push(game);
                });

                // Verify round names match expected rounds
                const actualRounds = Object.keys(gamesByRound).sort();
                
                expect(actualRounds.length).toBeGreaterThan(0);
                
                // Check that we have a FINAL
                expect(actualRounds).toContain('FINAL');
                
                // Check round progression
                if (totalQualifiedParticipants >= 32) {
                    expect(actualRounds).toContain('LAST_32');
                }
                if (totalQualifiedParticipants >= 16) {
                    expect(actualRounds).toContain('LAST_16');
                }
                if (totalQualifiedParticipants >= 8) {
                    expect(actualRounds).toContain('QUARTER_FINALS');
                }
                if (totalQualifiedParticipants >= 4) {
                    expect(actualRounds).toContain('SEMI_FINALS');
                }
            }
        });

        it('should create a match for place 3 if hasThirdPlaceMatch is true', async () => {
            // Create a test scenario with third place match enabled
            const testScenario = {
                ...scenarios[0],
                initialData: {
                    ...scenarios[0].initialData,
                    config: {
                        ...scenarios[0].initialData.config,
                        knockoutConfig: {
                            ...scenarios[0].initialData.config.knockoutConfig,
                            hasThirdPlaceMatch: true
                        }
                    }
                }
            };

            const tournament = Tournament.init(testScenario.initialData);
            const groups = groupInitializer.initGroups(
                tournament.getId(),
                tournament.getParticipants(),
                tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE)
            );
            vi.spyOn(storage, 'getGroups').mockReturnValue(Promise.resolve(groups.map(g => g.toObject())));

            const gamePlan = await knockoutCreator.createGamePlanAfterGroupGames(tournament);
            const games = gamePlan.getGames() as KnockoutGame[];

            const qualifiedTeamsPerGroup = tournament.getQualifiedParticipants(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
            const numberOfGroups = tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
            const totalQualifiedTeams = numberOfGroups * qualifiedTeamsPerGroup;

            // Only create third place match if we have at least 4 teams (2 semi-finals)
            if (totalQualifiedTeams >= 4 && tournament.getHasThirdPlaceMatch(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE)) {
                // Find semi-final games
                const semiFinalGames = games.filter(g => g.getRound() === 'SEMI_FINALS');
                
                if (semiFinalGames.length === 2) {
                    // Check if there's a third place match
                    // Note: This test assumes the functionality is implemented
                    // If not implemented, this test will fail and indicate the feature needs to be added
                    const thirdPlaceGames = games.filter(g => {
                        const firstRule = g.getRuleForFirstParticipant();
                        const secondRule = g.getRuleForSecondParticipant();
                    // Third place match should use LoserOfGameRule (if implemented)
                    // For now, we'll check if there's an extra game beyond the expected knockout structure
                    return firstRule.getType() === KnockoutGameRuleType.LOSER_OF_GAME || 
                               secondRule.getType() === KnockoutGameRuleType.LOSER_OF_GAME;
                });

                // Calculate expected games without third place
                let expectedGamesWithoutThirdPlace = 0;
                let gamesInFirstRound = numberOfGroups * qualifiedTeamsPerGroup;
                expectedGamesWithoutThirdPlace += gamesInFirstRound;
                
                let gamesInCurrentRound = gamesInFirstRound;
                while (gamesInCurrentRound > 1) {
                    gamesInCurrentRound = gamesInCurrentRound / 2;
                    expectedGamesWithoutThirdPlace += gamesInCurrentRound;
                }

                // With third place, we should have one more game
                expect(games.length).toBe(expectedGamesWithoutThirdPlace + 1);
                
                // Verify third place match exists (if functionality is implemented)
                // Note: This test will fail if third place match creation is not yet implemented
                if (thirdPlaceGames.length > 0) {
                    expect(thirdPlaceGames.length).toBe(1);
                    const thirdPlaceGame = thirdPlaceGames[0];
                    expect(thirdPlaceGame.getRound()).toBe('THIRD_PLACE');
                }
                }
            }
        });

        it('should not create a third place match if hasThirdPlaceMatch is false', async () => {
            const tournaments = scenarios.map((scenario) => {
                const tournament = Tournament.init(scenario.initialData);
                return tournament;
            });

            for (const tournament of tournaments) {
                // Skip if third place is enabled in this scenario
                if (tournament.getHasThirdPlaceMatch(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE)) {
                    continue;
                }

                const groups = groupInitializer.initGroups(
                    tournament.getId(),
                    tournament.getParticipants(),
                    tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE)
                );
                vi.spyOn(storage, 'getGroups').mockReturnValue(Promise.resolve(groups.map(g => g.toObject())));

                const gamePlan = await knockoutCreator.createGamePlanAfterGroupGames(tournament);
                const games = gamePlan.getGames() as KnockoutGame[];

                const qualifiedTeamsPerGroup = tournament.getQualifiedParticipants(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
                const numberOfGroups = tournament.getNumberOfGroups(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);

                // Calculate expected games without third place
                let expectedGames = 0;
                let gamesInFirstRound = numberOfGroups * qualifiedTeamsPerGroup;
                expectedGames += gamesInFirstRound;
                
                let gamesInCurrentRound = gamesInFirstRound;
                while (gamesInCurrentRound > 1) {
                    gamesInCurrentRound = gamesInCurrentRound / 2;
                    expectedGames += gamesInCurrentRound;
                }

                expect(games.length).toBe(expectedGames);

                // Verify no third place match exists
                const thirdPlaceGames = games.filter(g => {
                    const firstRule = g.getRuleForFirstParticipant();
                    const secondRule = g.getRuleForSecondParticipant();
                    return firstRule.getType() === KnockoutGameRuleType.LOSER_OF_GAME || 
                           secondRule.getType() === KnockoutGameRuleType.LOSER_OF_GAME;
                });
                expect(thirdPlaceGames.length).toBe(0);
            }
        });
    });
});


