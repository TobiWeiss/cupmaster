import { TournamentFormat, TournamentPhase } from "./TournamentFormat";
import { Tiebreaker } from "./Tiebreaker";
import { IField } from "./Field";
export interface TournamentConfig {
  // Basic settings
  id?: string;
  name: string;
  logoUrl?: string;
  startDate: Date;
  endDate?: Date;
  fields: IField[];
  type: {
    format: TournamentFormat;
    phases: TournamentPhase[];
  }

  // League specific
  leagueConfig?: {
    matchesAgainstEachParticipant: number;
    matchDuration: number;
    matchBreakDuration: number;
    pointsForWin: number;
    pointsForDraw: number;
    tiebreakers: Tiebreaker[];
  };

  // Group stage specific
  groupConfig?: {
    numberOfGroups: number;
    matchesAgainstEachParticipant: number;
    matchDuration: number;
    matchBreakDuration: number;
    pointsForWin: number;
    pointsForDraw: number;
    tiebreakers: Tiebreaker[];
    qualifiedParticipants: number;
  };

  // Knockout specific
  knockoutConfig?: {
    matchesAgainstEachParticipant: number;
    matchDuration: number;
    matchBreakDuration: number;
    hasThirdPlaceMatch: boolean;
  };
} 