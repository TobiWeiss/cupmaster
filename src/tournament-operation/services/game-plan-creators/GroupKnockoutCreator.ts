import { GameField } from "../../types/game-plan/GameField";
import { IGame } from "../../types/game-plan/Game";
import { GamePlan, IGamePlan } from "../../types/game-plan/GamePlan";
import { ITournament } from "../../types/tournament/Tournament";
import { TournamentFormat } from "../../types/tournament/TournamentFormat";
import { GroupCreator } from "./GroupCreator";
import { KnockoutCreator } from "./KnockoutCreator";

export class GroupKnockoutCreator {
    private groupCreator: GroupCreator;
    private knockoutCreator: KnockoutCreator;

    constructor(groupCreator: GroupCreator, knockoutCreator: KnockoutCreator) {
        this.groupCreator = groupCreator;
        this.knockoutCreator = knockoutCreator;
    }

    async createGamePlan(tournament: ITournament): Promise<IGamePlan> {
        console.info('createGamePlan', tournament);
        const gamePlan = new GamePlan(tournament.getId()!);

        let gamePlanForGroups = await this.groupCreator.createGamePlan(tournament);
        let knockoutGames = await this.knockoutCreator.createGamePlanAfterGroupGames(tournament);

        let games = [...gamePlanForGroups.getGames(), ...knockoutGames.getGames()];
        games = this._assignFields(games, tournament);
        games = this._setGameDates(games, tournament);

        gamePlan.setGames(games);

        console.info('gamePlan', gamePlan);

        return gamePlan;
    }

    /**
     * Update the game plan with the new tournament settings. Only the fields and dates are updated.
     * @param gamePlan the game plan to update
     * @param tournament the tournament to update the game plan with
     * @returns the updated game plan
     */
    updateFieldsAndDates(gamePlan: IGamePlan, tournament: ITournament): IGamePlan {
        let games = gamePlan.getGames();

        games = this._assignFields(games, tournament);
        games = this._setGameDates(games, tournament);

        gamePlan.setGames(games);

        return gamePlan;
    }


    _assignFields(games: IGame[], tournament: ITournament): IGame[] {
        const fields = tournament.getFields();
        const gameFields = fields.map(field => new GameField(field.getName()));


        games.forEach((game, index) => {
            game.setField(gameFields[(index) % gameFields.length]);
        });

        return games;
    }

    _setGameDates(games: IGame[], tournament: ITournament): IGame[] {
        const numberOfFields = tournament.getFields().length;
        let currentCycleStartTime = new Date(tournament.getStartDate()!.getTime());
        games.forEach((game, index) => {
            game.setStartTime(new Date(currentCycleStartTime));
            game.setEndTime(new Date(currentCycleStartTime.getTime() + tournament.getMatchDuration(TournamentFormat.LEAGUE)));

            if ((index + 1) % numberOfFields == 0) {
                currentCycleStartTime = new Date(currentCycleStartTime.setMinutes(currentCycleStartTime.getMinutes()
                    + tournament.getMatchBreakDuration(TournamentFormat.LEAGUE)
                    + tournament.getMatchDuration(TournamentFormat.LEAGUE)
                ));
            }
        });

        return games;
    }

}