import { StorageInterface } from "../../../common/services";
import { Game, IGame } from "../../types/game-plan/Game";
import { GamePlan, IGamePlan } from "../../types/game-plan/GamePlan";
import { Group, IGroup } from "../../types/game-plan/Group";
import { KnockoutGame, LoserOfGameRule, PlacementInGroupRule, WinnerOfGameRule } from "../../types/game-plan/KnockoutGame";
import { ITournament } from "../../types/tournament/Tournament";
import { TournamentPhase } from "../../types/tournament/TournamentFormat";

const amountOfGamesToRound = {
    "32": "LAST_32",
    "16": "LAST_16",
    "8": "QUARTER_FINALS",
    "4": "SEMI_FINALS",
    "2": "FINAL",
}

export class KnockoutCreator {

    private storage: StorageInterface;

    constructor(storage: StorageInterface) { 
        this.storage = storage;
    }
    
    createGamePlan(tournament: ITournament): IGamePlan {
        return new GamePlan(tournament.getId()!);
    }

    async createGamePlanAfterGroupGames(tournament: ITournament): Promise<IGamePlan> {
        const groups = await this._getGroups(tournament.getId()!);
        const qualifiedTeamsPerGroup = tournament.getQualifiedParticipants(tournament.getFormat(), TournamentPhase.GROUP_STAGE);

        const gamesOfFirstKnockoutRound: KnockoutGame[] = this._createGamesOfFirstKnockoutRoundAfterGroupGames(groups, qualifiedTeamsPerGroup);

        const gamesOfRoundsAfterFirstRound = this._createGamesForRoundsAfterFirstRound(gamesOfFirstKnockoutRound, tournament);
        const gamePlan = new GamePlan(tournament.getId()!);
        gamePlan.setGames([...gamesOfFirstKnockoutRound, ...gamesOfRoundsAfterFirstRound]);
        return gamePlan;
    }

    private _createGamesOfFirstKnockoutRoundAfterGroupGames(groups: IGroup[], qualifiedTeamsPerGroup: number) {
        const gamesOfFirstKnockoutRound: KnockoutGame[] = [];
        groups.forEach(group => {
            for (let i = 0; i < qualifiedTeamsPerGroup; i++) {
                const game = new Game();
                //TODO: this has to work for more or less than two qualified teams per group
                const ruleForFirstParticipant = new PlacementInGroupRule(group.getId(), i + 1);
                const ruleForSecondParticipant = new PlacementInGroupRule(group.getId(), qualifiedTeamsPerGroup - i);
                const knockOutGame = new KnockoutGame(ruleForFirstParticipant, ruleForSecondParticipant, game, this._getRound(qualifiedTeamsPerGroup));
                gamesOfFirstKnockoutRound.push(knockOutGame);
            }
        });
        return gamesOfFirstKnockoutRound;
    }

    private _createGamesForRoundsAfterFirstRound(gamesOfFirstKnockoutRound: KnockoutGame[], tournament: ITournament): IGame[] {
        const games = [];
        let numberOfGamesInLastRound = gamesOfFirstKnockoutRound.length;
        let previousRound = "1";
        let gamesOfPreviousRound = gamesOfFirstKnockoutRound;

        while (numberOfGamesInLastRound > 1) {
            if (numberOfGamesInLastRound === 2 && tournament.getHasThirdPlaceMatch(tournament.getFormat(), TournamentPhase.KNOCKOUT_STAGE)) {
                this._addGameForThirdPlace(gamesOfPreviousRound, games);
            }
            const gamesOfCurrentRound = [];
            let currentRound;
            for (let i = 0; i < numberOfGamesInLastRound / 2; i++) {
                currentRound = this._getRound(numberOfGamesInLastRound, previousRound);
                const game = new Game();
                const [prerequisiteGame1, prerequisiteGame2] = this._findPrerequisiteGames(gamesOfPreviousRound, i);
                const ruleForFirstParticipant = new WinnerOfGameRule(prerequisiteGame1.getId());
                const ruleForSecondParticipant = new WinnerOfGameRule(prerequisiteGame2.getId());
                const knockOutGame = new KnockoutGame(ruleForFirstParticipant, ruleForSecondParticipant, game, currentRound);
                gamesOfCurrentRound.push(knockOutGame);
            }
            numberOfGamesInLastRound = gamesOfCurrentRound.length;
            games.push(...gamesOfCurrentRound);
            previousRound = currentRound!;
            gamesOfPreviousRound = gamesOfCurrentRound;
        }
        return games;
    }

    private _addGameForThirdPlace(gamesOfPreviousRound: KnockoutGame[], games: any[]) {
        const game = new Game();
        const [prerequisiteGame1, prerequisiteGame2] = this._findPrerequisiteGames(gamesOfPreviousRound, 0);
        const ruleForFirstParticipant = new LoserOfGameRule(prerequisiteGame1.getId());
        const ruleForSecondParticipant = new LoserOfGameRule(prerequisiteGame2.getId());
        const knockOutGame = new KnockoutGame(ruleForFirstParticipant, ruleForSecondParticipant, game, "THIRD_PLACE");
        games.push(knockOutGame);
    }

    _getRound(amountOfGames: number, previousRound?: string): string {
        const explicitRound: string | undefined = amountOfGamesToRound[amountOfGames.toString() as keyof typeof amountOfGamesToRound];
        if (!explicitRound) {
           return previousRound || "1";
        }
        return explicitRound;
    }

    /**
     * Find the prerequisite games for a given game.
     * The prerequisite games are the games that are required to be played before the given game.
     * For example, if we have the following rounds:
     * 1. Game 1, Game 2, Game 3, Game 4
     * 2. Game 5, Game 6
     * 
     * The prerequisite games for Game 5 are Game 1 and Game 2.
     * The prerequisite games for Game 6 are Game 3 and Game 4.
     * @param gamesOfPreviousRound the games of the previous round
     * @param indexOfCorrespondingGame 
     * @returns the prerequisite games
     */
    _findPrerequisiteGames(gamesOfPreviousRound: KnockoutGame[], indexOfCorrespondingGame: number): KnockoutGame[] {
            const game1 = gamesOfPreviousRound[indexOfCorrespondingGame * 2];
            const game2 = gamesOfPreviousRound[indexOfCorrespondingGame * 2 + 1];
    
        return [game1, game2];
    }

    updateFieldsAndDates(gamePlan: IGamePlan, tournament: ITournament): IGamePlan {
        return gamePlan;
    }
    
    private async _getGroups(tournamentId: string): Promise<IGroup[]> {
        const groups = await this.storage.getGroups(tournamentId);
        return groups.map(group => Group.fromObject(group));
    }
}