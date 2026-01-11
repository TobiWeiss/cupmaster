import { LocalStorage } from "../../common/services/storage/LocalStorage";
import { IGamePlan } from "../types/game-plan/GamePlan";
import { ITournament } from "../types/tournament/Tournament";
import { TournamentFormat } from "../types/tournament/TournamentFormat";
import { GroupCreator } from "./game-plan-creators/GroupCreator";
import { GroupKnockoutCreator } from "./game-plan-creators/GroupKnockoutCreator";
import { KnockoutCreator } from "./game-plan-creators/KnockoutCreator";
import { LeagueCreator } from "./game-plan-creators/LeagueCreator";
import { LeagueSorter } from "./game-plan-sorters/LeagueSorter";

const gamePlanCreators = {
  [TournamentFormat.LEAGUE]: () => new LeagueCreator(),
  [TournamentFormat.GROUP_KNOCKOUT]: () => new GroupKnockoutCreator(new GroupCreator(new LocalStorage()), new KnockoutCreator(new LocalStorage())),
  [TournamentFormat.KNOCKOUT]: () => new KnockoutCreator(new LocalStorage()),
};

const gamePlanSorters = {
  [TournamentFormat.LEAGUE]: LeagueSorter,
  [TournamentFormat.GROUP_KNOCKOUT]: LeagueSorter,
  [TournamentFormat.KNOCKOUT]: LeagueSorter,
};


export class GamePlanManager {
  
  static async createGamePlan(tournament: ITournament): Promise<IGamePlan> {
    const factory = gamePlanCreators[tournament.getFormat()]();
    return await factory.createGamePlan(tournament);
  }

  static updateFieldsAndDates(gamePlan: IGamePlan, tournament: ITournament): IGamePlan {
    const factory = gamePlanCreators[tournament.getFormat()]();
    return factory.updateFieldsAndDates(gamePlan, tournament);
  }

  static reorderGames(gamePlan: IGamePlan, tournament: ITournament, oldIndex: number, newIndex: number): IGamePlan {
    const factory = new gamePlanSorters[tournament.getFormat()];

    return factory.sort(gamePlan, tournament, oldIndex, newIndex);
  }
}


