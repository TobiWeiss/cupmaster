import { arrayMove } from "@dnd-kit/sortable";
import { IGamePlan, GamePlan } from "../../types/game-plan/GamePlan";
import { IGamePlanSorter } from "./IGamePlanSorter";
import { TournamentFormat } from "../../types/tournament/TournamentFormat";
import { IGame } from "../../types/game-plan/Game";
import { ITournament } from "../../types/tournament/Tournament";
import { GameField } from "../../types/game-plan/GameField";

export class LeagueSorter implements IGamePlanSorter {
    sort(gamePlan: IGamePlan, tournament: ITournament, oldIndex: number, newIndex: number): IGamePlan {
        const gamePlanCopy = gamePlan.clone() as IGamePlan;
        const games = gamePlanCopy.getGames();
        const newGames = arrayMove(games, oldIndex, newIndex);
        const newGamesWithDates = this._setGameDates(newGames, tournament);
        const newGamesWithFields = this._assignFields(newGamesWithDates, tournament);
        const newGamesCopied = [...newGamesWithFields];

        gamePlanCopy.setGames(newGamesCopied);

        return gamePlanCopy;
    }   

    _setGameDates(games: IGame[], tournament: ITournament): IGame[] {
        const numberOfFields = tournament.getFields().length;
        let currentCycleStartTime = new Date(tournament.getStartDate()!.getTime());
        games.forEach((game, index) => {
            game.setStartTime(new Date(currentCycleStartTime));

            if ((index + 1) % numberOfFields == 0) {
                currentCycleStartTime = new Date(currentCycleStartTime.setMinutes(currentCycleStartTime.getMinutes()
                    + tournament.getMatchBreakDuration(TournamentFormat.LEAGUE)
                    + tournament.getMatchDuration(TournamentFormat.LEAGUE)
                ));
            }
        });

        return games;
    }

    _assignFields(games: IGame[], tournament: ITournament): IGame[] {
        const fields = tournament.getFields();
        const gameFields = fields.map(field => new GameField(field.getName()));


        games.forEach((game, index) => {
            game.setField(gameFields[(index) % gameFields.length]);
        });

        return games;
    }
}
