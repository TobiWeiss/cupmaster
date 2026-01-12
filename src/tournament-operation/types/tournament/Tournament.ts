import { TournamentCreator } from "../../../tournament-init/services/TournamentCreator";
import { TournamentConfig } from "./TournamentConfig";
import { IParticipant, Participant } from "./Participant";
import { TournamentStatus } from "./TournamentStatus";
import { MatchFormat, TournamentFormat, TournamentPhase } from "./TournamentFormat";
import { Tiebreaker } from "./Tiebreaker";
import { v4 as uuidv4 } from 'uuid';
import { Field, IField } from "./Field";
import { IGamePlan } from "../game-plan/GamePlan";
import { TournamentNameTooLongException, InvalidDateException, InvalidNumberException, TooFewFieldsException, ParticipantNameAlreadyExistsException } from "./exceptions";

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
  setFields(fields: IField[]): void;
  getFields(): IField[];
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
  hasGroups(): boolean;
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
      name: '-',
      startDate: new Date(),
      type: {
        format: TournamentFormat.LEAGUE,
        phases: []
      },
      groupConfig: {
        numberOfGroups: 2,
        matchesAgainstEachParticipant: 1,
        matchDuration: 10,
        matchBreakDuration: 2,
        pointsForWin: 3,
        pointsForDraw: 1,
        tiebreakers: [Tiebreaker.GOAL_DIFFERENCE, Tiebreaker.HEAD_TO_HEAD, Tiebreaker.GOALS_SCORED],
        qualifiedParticipants: 2,
      },
      knockoutConfig: {
        matchesAgainstEachParticipant: 1,
        matchDuration: 10,
        matchBreakDuration: 2,
        hasThirdPlaceMatch: true,
      },
      leagueConfig: {
        matchesAgainstEachParticipant: 2,
        matchDuration: 10,
        matchBreakDuration: 2,
        pointsForWin: 3,
        pointsForDraw: 1,
        tiebreakers: [Tiebreaker.GOAL_DIFFERENCE, Tiebreaker.HEAD_TO_HEAD, Tiebreaker.GOALS_SCORED],
      },
      fields: [],
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
    tournament.participants = data.participants.map((participant: Record<string, any>) => Participant.fromObject(participant));
    tournament.config.fields = data.config.fields.map((field: Record<string, any>) => Field.fromObject(field));

    return tournament;
  }

  static fromObject(data: Record<string, any>) {
    const tournament = new Tournament();
    tournament.id = data.id;
    tournament.status = data.status;
    tournament.config = data.config;
    tournament.config.startDate = new Date(data.config.startDate);
    tournament.config.endDate = data.config.endDate ? new Date(data.config.endDate) : undefined;
    tournament.participants = data.participants.map((participant: Record<string, any>) => Participant.fromObject(participant));
    tournament.config.fields = data.config.fields.map((field: Record<string, any>) => Field.fromObject(field));
    tournament.config.type = {
      format: data.config.type.format,
      phases: data.config.type.phases,
    };
    return tournament;
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      status: this.status,
      config: this.config,
      participants: this.participants.map(participant => (participant as Participant).toObject()),
      fields: this.config.fields.map(field => (field as Field).toObject()),
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
    if (name.length > 100) {
      throw new TournamentNameTooLongException(100);
    }
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
    if (startDate < new Date()) {
      throw new InvalidDateException('Start date must be in the future');
    }
    this.config.startDate = startDate;
  }

  getStartDate() {
    return this.config.startDate;
  }

  setEndDate(endDate: Date) {
    if (endDate < this.config.startDate) {
      throw new InvalidDateException('End date must be after start date');
    }
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

  setFields(fields: IField[]) {
    if (fields.length < 1) {
      throw new TooFewFieldsException();
    }
    this.config.fields = fields;
  }

  getFields() {
    return this.config.fields;
  }

  addField(field: IField) {
    this.config.fields.push(field);
  }

  getNumberOfParticipants() {
    return this.participants.length;
  }

  addParticipant(participant: IParticipant) {
    if (this.participants.find(p => p.name === participant.name)) {
      throw new ParticipantNameAlreadyExistsException(participant.name);
    }
    this.participants.push(participant);
  }

  removeParticipant(participant: IParticipant) {
    this.participants = this.participants.filter(p => p.id !== participant.id);
  }

  updateParticipant(participant: IParticipant) {
    this.participants = this.participants.map(p => p.id === participant.id ? participant : p);
  }

  getParticipants() {
    return this.participants;
  }

  setParticipants(participants: IParticipant[]) {
    this.participants = participants;
  }

  getNumberOfGroups(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase)?.numberOfGroups ?? 0;
  }

  setNumberOfGroups(numberOfGroups: number, type: TournamentFormat, phase?: TournamentPhase) {
    if (numberOfGroups < 1) {
      throw new InvalidNumberException('Number of groups must be at least 1');
    }
    this._getConfigByType(type, phase)!.numberOfGroups = numberOfGroups;
  }

  getMatchesAgainstEachParticipant(type: TournamentFormat, phase?: TournamentPhase) {
    console.log('getMatchesAgainstEachParticipant', type, phase);
    return this._getConfigByType(type, phase)?.matchesAgainstEachParticipant ?? 0;
  }

  setMatchesAgainstEachParticipant(matches: number, type: TournamentFormat, phase?: TournamentPhase) {
    if (matches < 1 || matches > 4) {
      throw new InvalidNumberException('Matches against each participant must be between 1 and 4');
    }
    this._getConfigByType(type, phase)!.matchesAgainstEachParticipant = matches;
  }

  getMatchDuration(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase)!.matchDuration;
  }

  setMatchDuration(duration: number, type: TournamentFormat, phase?: TournamentPhase) {
    if (duration < 5 || duration > 90) {
      throw new InvalidNumberException('Match duration must be between 5 and 90 minutes');
    }
    this._getConfigByType(type, phase)!.matchDuration = duration;
  }

  getMatchBreakDuration(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase)!.matchBreakDuration;
  }

  setMatchBreakDuration(duration: number, type: TournamentFormat, phase?: TournamentPhase) {
    if (duration < 0 || duration > 30) {
      throw new InvalidNumberException('Match break duration must be between 0 and 30 minutes');
    }
    this._getConfigByType(type, phase)!.matchBreakDuration = duration;
  }

  getPointsForWin(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase)!.pointsForWin;
  }

  setPointsForWin(points: number, type: TournamentFormat, phase?: TournamentPhase) {
    if (points < 1 || points > 5) {
      throw new InvalidNumberException('Points for win must be between 1 and 5');
    }
    this._getConfigByType(type, phase).pointsForWin = points;
  }

  getPointsForDraw(type: TournamentFormat, phase?: TournamentPhase) {
    return this._getConfigByType(type, phase).pointsForDraw;
  }

  setPointsForDraw(points: number, type: TournamentFormat, phase?: TournamentPhase) {
    if (points < 0 || points > 3) {
      throw new InvalidNumberException('Points for draw must be between 0 and 3');
    }
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
    if (participants < 1) {
      throw new InvalidNumberException('Number of qualified participants must be at least 1');
    }
    this._getConfigByType(type, phase).qualifiedParticipants = participants;
  }

  updateEndDate(gamePlan: IGamePlan) {
    const lastGame = gamePlan.getLastGame();
    
    if (lastGame) {
      this.setEndDate(lastGame.getTime().getEndTime()!);
    }
  }

  static fromFormData(formData: Record<string, any>) {
    return TournamentCreator.fromFormData(formData);
  }

    hasGroups() {
      return this.getPhases().includes(TournamentPhase.GROUP_STAGE);
  }
}
