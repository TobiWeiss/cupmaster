import { TournamentFactory } from "../../../tournament-init/services/TournamentFactory";
import { TournamentConfig } from "./TournamentConfig";
import { IParticipant, Participant } from "./Participant";
import { TournamentStatus } from "./TournamentStatus";
import { MatchFormat, TournamentFormat, TournamentPhase } from "./TournamentFormat";
import { Tiebreaker } from "./Tiebreaker";
import { v4 as uuidv4 } from 'uuid';

export interface ITournament {
  getId(): string;
  setId(id: string): void;
  getStatus(): TournamentStatus;
  setStatus(status: TournamentStatus): void;
  getConfig(): TournamentConfig;
  setConfig(config: TournamentConfig): void;
  getParticipants(): IParticipant[];
  setParticipants(participants: IParticipant[]): void;
  getNumberOfParticipants(): number;
  setNumberOfParticipants(numberOfParticipants: number): void;
  addParticipant(participant: IParticipant): void;
  removeParticipant(participant: IParticipant): void;
  getLogoUrl(): string | undefined;
  setLogoUrl(logoUrl: string): void;
  getStartDate(): Date;
  setStartDate(startDate: Date): void;
  getEndDate(): Date | undefined;
  setEndDate(endDate: Date): void;
  getFormat(): TournamentFormat;
  getPhases(): TournamentPhase[];
  setFields(fields: number): void;
  getFields(): number;
  getNumberOfGroups(type: TournamentFormat, phase?: TournamentPhase): number;
  setNumberOfGroups(numberOfGroups: number, type: TournamentFormat, phase?: TournamentPhase): void;
  getMatchesAgainstEachParticipant(type: TournamentFormat, phase?: TournamentPhase): number;
  setMatchesAgainstEachParticipant(matches: number, type: TournamentFormat, phase?: TournamentPhase): void;
  getMatchDuration(type: TournamentFormat, phase?: TournamentPhase): number;
  setMatchDuration(duration: number, type: TournamentFormat, phase?: TournamentPhase): void;
  getMatchBreakDuration(type: TournamentFormat, phase?: TournamentPhase): number;
  setMatchBreakDuration(duration: number, type: TournamentFormat, phase?: TournamentPhase): void;
  getPointsForWin(type: TournamentFormat, phase?: TournamentPhase): number;
  setPointsForWin(points: number, type: TournamentFormat, phase?: TournamentPhase): void;
  getPointsForDraw(type: TournamentFormat, phase?: TournamentPhase): number;
  setPointsForDraw(points: number, type: TournamentFormat, phase?: TournamentPhase): void;
  getTiebreakers(type: TournamentFormat, phase?: TournamentPhase): Tiebreaker[];
  setTiebreakers(tiebreakers: Tiebreaker[], type: TournamentFormat, phase?: TournamentPhase): void;
  getHasThirdPlaceMatch(type: TournamentFormat, phase?: TournamentPhase): boolean;
  setHasThirdPlaceMatch(hasThirdPlaceMatch: boolean, type: TournamentFormat, phase?: TournamentPhase): void;
  getLegs(type: TournamentFormat, phase?: TournamentPhase): MatchFormat;
  setLegs(legs: MatchFormat, type: TournamentFormat, phase?: TournamentPhase): void;
  getQualifiedParticipants(type: TournamentFormat, phase?: TournamentPhase): number;
  setQualifiedParticipants(participants: number, type: TournamentFormat, phase?: TournamentPhase): void;
}

export class Tournament implements ITournament {
  id: string;
  status!: TournamentStatus;
  config!: TournamentConfig;
  participants!: IParticipant[];

  constructor() {
    this.id = uuidv4();
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

  static init(data: Record<string, any>) {
    if (!data) return new Tournament();
    const tournament = new Tournament();
    tournament.id = data.id;
    tournament.status = data.status;
    tournament.config = data.config;
    tournament.config.startDate = new Date(data.config.startDate);
    tournament.config.endDate = data.config.endDate ? new Date(data.config.endDate) : undefined;
    tournament.participants = data.participants.map((participant: Record<string, any>) => Participant.init(participant));

    return tournament;
  }

  static fromObject(data: Record<string, any>) {
    const tournament = new Tournament();
    tournament.id = data.id;
    tournament.status = data.status;
    tournament.config = data.config;
    tournament.participants = data.participants.map((participant: Record<string, any>) => Participant.init(participant));
    return tournament;
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      status: this.status,
      config: this.config,
      participants: this.participants.map(participant => (participant as Participant).toObject()),
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

  setParticipants(participants: IParticipant[]) {
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
