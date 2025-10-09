import { Game, IGame } from "../../types/game-plan/Game";
import { GamePlan, IGamePlan } from "../../types/game-plan/GamePlan";
import { IGroup } from "../../types/game-plan/Group";
import { KnockoutGame, PlacementInGroupRule, WinnerOfGameRule } from "../../types/game-plan/KnockoutGame";
import { ITournament } from "../../types/tournament/Tournament";

const amountOfGamesToRound = {
    "32": "LAST_32",
    "16": "LAST_16",
    "8": "QUARTER_FINALS",
    "4": "SEMI_FINALS",
    "2": "FINAL",
}

export class KnockoutCreator {
    createGamePlan(tournament: ITournament): IGamePlan {
        return new GamePlan(tournament.getId()!);
    }

    createGamePlanAfterGroupGames(tournament: ITournament, groups: IGroup[]): IGamePlan {
        const qualifiedTeamsPerGroup = tournament.getQualifiedParticipants(tournament.getFormat());

        const gamesOfFirstKnockoutRound: KnockoutGame[] = this._createGamesOfFirstKnockoutRoundAfterGroupGames(groups, qualifiedTeamsPerGroup);

        const gamesOfRoundsAfterFirstRound = this._createGamesForRoundsAfterFirstRound(gamesOfFirstKnockoutRound);
        const gamePlan = new GamePlan(tournament.getId()!);
        gamePlan.setGames([...gamesOfFirstKnockoutRound, ...gamesOfRoundsAfterFirstRound]);
        return gamePlan;
    }

    private _createGamesOfFirstKnockoutRoundAfterGroupGames(groups: IGroup[], qualifiedTeamsPerGroup: number) {
        const gamesOfFirstKnockoutRound: KnockoutGame[] = [];
        groups.forEach(group => {
            for (let i = 0; i < qualifiedTeamsPerGroup; i++) {
                const game = new Game();
                const rule = new PlacementInGroupRule(group.getId(), i + 1);
                const knockOutGame = new KnockoutGame(rule, game, this._getRound(qualifiedTeamsPerGroup));
                gamesOfFirstKnockoutRound.push(knockOutGame);
            }
        });
        return gamesOfFirstKnockoutRound;
    }

    private _createGamesForRoundsAfterFirstRound(gamesOfFirstKnockoutRound: KnockoutGame[]): IGame[] {
        const games = [];
        let numberOfGamesInLastRound = gamesOfFirstKnockoutRound.length;
        let previousRound = "1";

        while (numberOfGamesInLastRound > 1) {
            const gamesOfCurrentRound = [];
            let currentRound;
            for (let i = 0; i < numberOfGamesInLastRound / 2; i++) {
                currentRound = this._getRound(numberOfGamesInLastRound, previousRound);
                const game = new Game();
                const rule = new WinnerOfGameRule(gamesOfFirstKnockoutRound[i].getId());
                const knockOutGame = new KnockoutGame(rule, game, currentRound);
                gamesOfCurrentRound.push(knockOutGame);
            }
            numberOfGamesInLastRound = gamesOfCurrentRound.length;
            games.push(...gamesOfCurrentRound);
            previousRound = currentRound!;
          
        }
        return games;
    }

    _getRound(amountOfGames: number, previousRound?: string): string {
        const explicitRound: string | undefined = amountOfGamesToRound[amountOfGames.toString() as keyof typeof amountOfGamesToRound];
        if (!explicitRound) {
           return previousRound || "1";
        }
        return explicitRound;
    }

    updateFieldsAndDates(gamePlan: IGamePlan, tournament: ITournament): IGamePlan {
        return gamePlan;
    }
}