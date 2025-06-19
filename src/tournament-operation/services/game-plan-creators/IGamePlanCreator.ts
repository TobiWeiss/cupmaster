import { IGamePlan } from "../../types/game-plan/GamePlan";
import { ITournament } from "../../types/tournament/Tournament";

export interface IGamePlanCreator {
    createGamePlan(tournament: ITournament): IGamePlan;
    updateFieldsAndDates(gamePlan: IGamePlan, tournament: ITournament): IGamePlan;
}
