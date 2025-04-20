import { IGamePlan } from "../../types/game-plan/GamePlan";
import { ITournament } from "../../types/tournament/Tournament";

export interface IGamePlanSorter {
    sort(gamePlan: IGamePlan, tournament: ITournament, oldIndex: number, newIndex: number): IGamePlan;
}