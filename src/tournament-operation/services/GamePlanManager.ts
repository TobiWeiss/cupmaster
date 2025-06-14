import { IGamePlan } from "../types/game-plan/GamePlan";
import { ITournament } from "../types/tournament/Tournament";
import { LeagueCreator } from "./game-plan-creators/LeagueCreator";
import { LeagueSorter } from "./game-plan-sorters/LeagueSorter";

export class GamePlanManager {
  static createGamePlan(tournament: ITournament): IGamePlan {
    const factory = new LeagueCreator();
    return factory.createGamePlan(tournament);
  }

  static updateGamePlan(gamePlan: IGamePlan, tournament: ITournament): IGamePlan {
    const factory = new LeagueCreator();
    return factory.updateGamePlan(gamePlan, tournament);
  }

  static reorderGames(gamePlan: IGamePlan, tournament: ITournament, oldIndex: number, newIndex: number): IGamePlan {
    const factory = new LeagueSorter();


    return factory.sort(gamePlan, tournament, oldIndex, newIndex);
  }
}


