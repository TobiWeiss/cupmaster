import { IGamePlan } from "../types/game-plan/GamePlan";
import { IGroup } from "../types/game-plan/Group";
import { ITournament } from "../types/tournament/Tournament";
import { TournamentFormat } from "../types/tournament/TournamentFormat";
import { GroupKnockoutCreator } from "./game-plan-creators/GroupKnockoutCreator";
import { KnockoutCreator } from "./game-plan-creators/KnockoutCreator";
import { LeagueCreator } from "./game-plan-creators/LeagueCreator";
import { LeagueSorter } from "./game-plan-sorters/LeagueSorter";

const gamePlanCreators = {
  [TournamentFormat.LEAGUE]: LeagueCreator,
  [TournamentFormat.GROUP_KNOCKOUT]: GroupKnockoutCreator,
  [TournamentFormat.KNOCKOUT]: KnockoutCreator,
};

const gamePlanSorters = {
  [TournamentFormat.LEAGUE]: LeagueSorter,
  [TournamentFormat.GROUP_KNOCKOUT]: LeagueSorter,
  [TournamentFormat.KNOCKOUT]: LeagueSorter,
};


export class GamePlanManager {
  static createGamePlan(tournament: ITournament, groups: IGroup[]): IGamePlan {
    const factory = new gamePlanCreators[tournament.getFormat()];
    if(factory instanceof GroupKnockoutCreator) {
      return factory.createGamePlan(tournament, groups);
    }
    return factory.createGamePlan(tournament);
  }

  static updateFieldsAndDates(gamePlan: IGamePlan, tournament: ITournament): IGamePlan {
    const factory = new gamePlanCreators[tournament.getFormat()];
    return factory.updateFieldsAndDates(gamePlan, tournament);
  }

  static reorderGames(gamePlan: IGamePlan, tournament: ITournament, oldIndex: number, newIndex: number): IGamePlan {
    const factory = new gamePlanSorters[tournament.getFormat()];

    return factory.sort(gamePlan, tournament, oldIndex, newIndex);
  }
}


