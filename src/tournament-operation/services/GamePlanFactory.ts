import { IGamePlan } from "../types/game-plan/GamePlan";
import { Tournament } from "../types/tournament/Tournament";
import { LeagueFactory } from "./factories/LeagueFactory";

export class GamePlanFactory {
  static createGamePlan(tournament: Tournament): IGamePlan {
    const factory = new LeagueFactory();
    return factory.createGamePlan(tournament);
  }
}


