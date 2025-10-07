import { GamePlan, IGamePlan } from "../../types/game-plan/GamePlan";
import { ITournament } from "../../types/tournament/Tournament";
import { IGamePlanCreator } from "./IGamePlanCreator";

export class KnockoutCreator implements IGamePlanCreator {
    createGamePlan(tournament: ITournament): IGamePlan {
        return new GamePlan(tournament.getId()!);
    }

    updateFieldsAndDates(gamePlan: IGamePlan, tournament: ITournament): IGamePlan {
        return gamePlan;
    }
}