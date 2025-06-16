import { IGamePlan } from "../../types/game-plan/GamePlan";
import { ITournament, Tournament } from "../../types/tournament/Tournament";

export interface IGamePlanCreator {
    createGamePlan(tournament: ITournament): IGamePlan;
    updateFields(gamePlan: IGamePlan, tournament: ITournament): IGamePlan;
}
