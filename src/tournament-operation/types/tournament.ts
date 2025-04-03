import { TournamentFactory } from "../../tournament-init/utils/TournamentFactory";



export enum TournamentFormat {
  LEAGUE = 'LEAGUE',
  GROUP_KNOCKOUT = 'GROUP_KNOCKOUT',
  KNOCKOUT = 'KNOCKOUT'
}

export enum MatchFormat {
  SINGLE_MATCH = 'SINGLE_MATCH',
  HOME_AWAY = 'HOME_AWAY'
}

export enum KnockoutQualification {
  POINTS = 'POINTS',
  GROUP_POSITION = 'GROUP_POSITION'
}

export enum Tiebreaker {
  GOAL_DIFFERENCE = 'GOAL_DIFFERENCE',
  HEAD_TO_HEAD = 'HEAD_TO_HEAD',
  GOALS_SCORED = 'GOALS_SCORED'
}

export enum TournamentPhase {
  GROUP_STAGE = 'GROUP_STAGE',
  KNOCKOUT_STAGE = 'KNOCKOUT_STAGE'
}

export interface TournamentConfig {
  // Basic settings
  id?: string;
  name: string;
  logoUrl?: string;
  startDate: Date;
  endDate?: Date;
  fields: number;
  numberOfParticipants: number;
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

export interface Participant {
  id?: string;
  name: string;
  contact?: string;
  logo?: string;
}

export interface ITournament {
  id?: string;
  status: TournamentStatus;
  config: TournamentConfig;
  participants: Participant[];
}

export class Tournament implements ITournament {
  id?: string;
  status!: TournamentStatus;
  config!: TournamentConfig;
  participants!: Participant[];

  constructor() {
    this.id = undefined;
    this.status = TournamentStatus.INITIALIZED;
    this.config = {
      name: '',
      startDate: new Date(),
      numberOfParticipants: 0,
      type: {
        format: TournamentFormat.LEAGUE,
        phases: [],
      },
      groupConfig: {
        numberOfGroups: 0,
        matchesAgainstEachParticipant: 0,
        matchDuration: 0,
        matchBreakDuration: 0,
        pointsForWin: 0,
        pointsForDraw: 0,
        tiebreakers: [],
        qualifiedParticipants: 0,
      },
      knockoutConfig: {
        matchesAgainstEachParticipant: 0,
        matchDuration: 0,
        matchBreakDuration: 0,
        hasThirdPlaceMatch: false,
      },
      leagueConfig: {
        matchesAgainstEachParticipant: 0,
        matchDuration: 0,
        matchBreakDuration: 0,
        pointsForWin: 0,
        pointsForDraw: 0,
        tiebreakers: [],
      },
      fields: 0,
    };
    this.participants = [];
  }

  static init(data: ITournament) {
    if (!data) return new Tournament();
    const tournament = new Tournament();
    tournament.id = data.id;
    tournament.status = data.status;
    tournament.config = data.config;
    tournament.config.startDate = new Date(data.config.startDate);
    tournament.config.endDate = data.config.endDate ? new Date(data.config.endDate) : undefined;
    tournament.participants = data.participants;

    return tournament;
  }

  toObject(): ITournament {
    return {
      id: this.id,
      status: this.status,
      config: this.config,
      participants: this.participants,
    };
  }

  _getConfigByType(type: TournamentFormat, phase?: TournamentPhase): any {
    if (type === TournamentFormat.LEAGUE) {
      return this.config.leagueConfig;
    } else if (type === TournamentFormat.GROUP_KNOCKOUT && phase === TournamentPhase.GROUP_STAGE) {
      return this.config.groupConfig;
    } else if (type === TournamentFormat.GROUP_KNOCKOUT && phase === TournamentPhase.KNOCKOUT_STAGE) {
      return this.config.knockoutConfig;
    } else if (type === TournamentFormat.KNOCKOUT) {
      return this.config.knockoutConfig;
    }
  }

  getConfig() {
    return this.config;
  }

  setConfig(config: TournamentConfig) {
    this.config = config;
  }

  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: TournamentStatus) {
    this.status = status;
  }

  setName(name: string) {
    this.config.name = name;
  }

  getName() {
    return this.config.name;
  }

  getLogoUrl() {
    return this.config.logoUrl;
  }

  setLogoUrl(logoUrl: string) {
    this.config.logoUrl = logoUrl;
  }

  setStartDate(startDate: Date) {
    this.config.startDate = startDate;
  }

  getStartDate() {
    return this.config.startDate;
  }

  setEndDate(endDate: Date) {
    this.config.endDate = endDate;
  }

  getEndDate() {
    return this.config.endDate;
  }

  setType(type: TournamentFormat, phases: TournamentPhase[]) {
    this.config.type = {
      format: type,
      phases: phases,
    };
  }

  getType() {
    return this.config.type;
  }

  getFormat() {
    return this.config.type.format;
  }

  getPhases() {
    return this.config.type.phases;
  }

  setFields(fields: number) {
    this.config.fields = fields;
  }

  getFields() {
    return this.config.fields;
  }

  setNumberOfParticipants(numberOfParticipants: number) {
    this.config.numberOfParticipants = numberOfParticipants;
  }

  getNumberOfParticipants() {
    return this.config.numberOfParticipants;
  }

  addParticipant(participant: Participant) {
    this.participants.push(participant);
  }

  removeParticipant(participant: Participant) {
    this.participants = this.participants.filter(p => p.id !== participant.id);
  }

  getParticipants() {
    return this.participants;
  }

  setParticipants(participants: Participant[]) {
    this.participants = participants;
  }

  getNumberOfGroups(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).numberOfGroups;
  }

  setNumberOfGroups(numberOfGroups: number, type: TournamentFormat, phase?: TournamentPhase) {
    this._getConfigByType(type, phase).numberOfGroups = numberOfGroups;
  }

  getMatchesAgainstEachParticipant(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).matchesAgainstEachParticipant;
  }

  setMatchesAgainstEachParticipant(matches: number, type: TournamentFormat, phase?: TournamentPhase) {
    this._getConfigByType(type, phase).matchesAgainstEachParticipant = matches;
  }

  getMatchDuration(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).matchDuration;
  }

  setMatchDuration(duration: number, type: TournamentFormat, phase?: TournamentPhase) {
    this._getConfigByType(type, phase).matchDuration = duration;
  }

  getMatchBreakDuration(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).matchBreakDuration;
  }

  setMatchBreakDuration(duration: number, type: TournamentFormat, phase?: TournamentPhase) {
    this._getConfigByType(type, phase).matchBreakDuration = duration;
  }

  getPointsForWin(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).pointsForWin;
  }

  setPointsForWin(points: number, type: TournamentFormat, phase?: TournamentPhase) {
    this._getConfigByType(type, phase).pointsForWin = points;
  }

  getPointsForDraw(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).pointsForDraw;
  }

  setPointsForDraw(points: number, type: TournamentFormat, phase?: TournamentPhase) {
    this._getConfigByType(type, phase).pointsForDraw = points;
  }

  getTiebreakers(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).tiebreakers;
  }

  setTiebreakers(tiebreakers: Tiebreaker[], type: TournamentFormat, phase?: TournamentPhase) {
    this._getConfigByType(type, phase).tiebreakers = tiebreakers;
  }

  getHasThirdPlaceMatch(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).hasThirdPlaceMatch;
  }

  setHasThirdPlaceMatch(hasThirdPlaceMatch: boolean, type: TournamentFormat, phase?: TournamentPhase) {
    this._getConfigByType(type, phase).hasThirdPlaceMatch = hasThirdPlaceMatch;
  }

  getLegs(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).legs;
  }

  setLegs(legs: MatchFormat, type: TournamentFormat, phase?: TournamentPhase) {
    this._getConfigByType(type, phase).legs = legs;
  }

  getQualifiedParticipants(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).qualifiedParticipants;
  }

  setQualifiedParticipants(participants: number, type: TournamentFormat, phase?: TournamentPhase) {
    this._getConfigByType(type, phase).qualifiedParticipants = participants;
  }

  static fromFormData(formData: Record<string, any>) {
    return TournamentFactory.fromFormData(formData);
  }
}

export enum TournamentStatus {
  INITIALIZED = 'INITIALIZED',
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}
