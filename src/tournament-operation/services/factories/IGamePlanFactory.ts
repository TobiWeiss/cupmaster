import { IGamePlan } from "../../types/game-plan/GamePlan";
import { ITournament, Tournament } from "../../types/tournament/Tournament";

export interface IGamePlanFactory {
    createGamePlan(tournament: ITournament): IGamePlan;
}
