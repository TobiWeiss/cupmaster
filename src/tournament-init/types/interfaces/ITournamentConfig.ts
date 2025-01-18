import { TournamentFormat, MatchFormat, KnockoutQualification, Tiebreaker } from '../enums';

export interface ILeagueConfig {
  matchesAgainstEachTeam: number;
  tiebreakers: Tiebreaker[];
  matchDuration: number;
}

export interface IGroupConfig {
  numberOfGroups: number;
  matchesAgainstEachTeam: number;
  qualificationMode: KnockoutQualification;
  pointsForWin: number;
  pointsForDraw: number;
  tiebreakers: Tiebreaker[];
  matchDuration: number;
  teamsQualifying: number;
}

export interface IKnockoutConfig {
  legs: MatchFormat;
  numberOfTeams: number;
  matchDuration: number;
  hasThirdPlace: boolean;
}

export interface ITournamentConfig {
  name: string;
  logoUrl?: string;
  startDate: Date;
  endDate?: Date;
  format: TournamentFormat;
  fields: number;
  numberOfTeams: number;
  matchDuration: number;
  leagueConfig?: ILeagueConfig;
  groupConfig?: IGroupConfig;
  knockoutConfig?: IKnockoutConfig;
} 