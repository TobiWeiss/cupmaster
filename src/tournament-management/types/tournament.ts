// Tournament format types
export type TournamentFormat = 'LEAGUE' | 'GROUP_KNOCKOUT' | 'KNOCKOUT';
export type MatchFormat = 'SINGLE_MATCH' | 'HOME_AWAY';
export type KnockoutQualification = 'POINTS' | 'GROUP_POSITION';
export type Tiebreaker = 'GOAL_DIFFERENCE' | 'HEAD_TO_HEAD' | 'GOALS_SCORED';

export interface TournamentConfig {
  // Basic settings
  name: string;
  startDate: Date;
  endDate?: Date;
  format: TournamentFormat;
  fields: number;
  
  // League specific
  leagueConfig?: {
    matchesAgainstEachTeam: number;
    tiebreakers: Tiebreaker[];
  };
  
  // Group stage specific
  groupConfig?: {
    numberOfGroups: number;
    matchesAgainstEachTeam: number;
    qualificationMode: KnockoutQualification;
    pointsForWin: number;
    pointsForDraw: number;
    tiebreakers: Tiebreaker[];
  };
  
  // Knockout specific
  knockoutConfig?: {
    legs: MatchFormat;
    numberOfTeams: number;	
  };
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  number: string;
  birthDate: Date;
}

export interface Tournament {
  id: string;
  config: TournamentConfig;
  teams: Team[];
  status: TournamentStatus;
}

export type TournamentStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
