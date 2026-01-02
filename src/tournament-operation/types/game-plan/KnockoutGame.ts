import { Game, IGame } from "./Game";
import { v4 as uuidv4 } from 'uuid';
import { IGameParticipant } from "./GameParticipant";
import { IScore } from "./Score";
import { IGameTime } from "./GameTime";
import { IGameField } from "./GameField";
import { GameStatus } from "./GameStatus";
import { IBaseClass } from "../../../common/types/BaseClass";

export enum KnockoutGameRuleType {
    PLACEMENT_IN_GROUP = 'PLACEMENT_IN_GROUP',
    WINNER_OF_GAME = 'WINNER_OF_GAME',
    LOSER_OF_GAME = 'LOSER_OF_GAME',
}

function ruleFromObject(object: Record<string, any>): KnockoutGameRule {
    switch (object.type) {
        case KnockoutGameRuleType.PLACEMENT_IN_GROUP:
            return PlacementInGroupRule.fromObject(object);
        case KnockoutGameRuleType.WINNER_OF_GAME:
            return WinnerOfGameRule.fromObject(object);
        case KnockoutGameRuleType.LOSER_OF_GAME:
            return LoserOfGameRule.fromObject(object);
        default:
            throw new Error(`Unknown rule type: ${object.type}`);
    }
}

export interface KnockoutGameRule extends IBaseClass {
    getType(): KnockoutGameRuleType;
}

export class PlacementInGroupRule implements KnockoutGameRule {
    groupId: string;
    place: number;

    constructor(groupId: string, place: number) {
        this.groupId = groupId;
        this.place = place;
    }

    static fromObject(object: Record<string, any>): PlacementInGroupRule {
        return new PlacementInGroupRule(object.groupId, object.place);
    }

    clone(): PlacementInGroupRule {
        return new PlacementInGroupRule(this.groupId, this.place);
    }

    toObject(): Record<string, any> {
        return { type: KnockoutGameRuleType.PLACEMENT_IN_GROUP, groupId: this.groupId, place: this.place };
    }

    getGroupId(): string {
        return this.groupId;
    }

    setGroupId(group: string): void {
        this.groupId = group;
    }

    getType(): KnockoutGameRuleType {
        return KnockoutGameRuleType.PLACEMENT_IN_GROUP;
    }

    getPlace(): number {
        return this.place;
    }

    setPlace(place: number): void {
        this.place = place;
    }

}

export class WinnerOfGameRule implements KnockoutGameRule {
    gameId: string;

    constructor(gameId: string) {
        this.gameId = gameId;
    }

    static fromObject(object: Record<string, any>): WinnerOfGameRule {
        return new WinnerOfGameRule(object.gameId);
    }

    clone(): WinnerOfGameRule {
        return new WinnerOfGameRule(this.gameId);
    }

    toObject(): Record<string, any> {
        return { type: KnockoutGameRuleType.WINNER_OF_GAME, gameId: this.gameId };
    }

    getGameId(): string {
        return this.gameId;
    }

    setGameId(game: string): void {
        this.gameId = game;
    }

    getType(): KnockoutGameRuleType {
        return KnockoutGameRuleType.WINNER_OF_GAME;
    }
}

export class LoserOfGameRule implements KnockoutGameRule {
    gameId: string;

    constructor(gameId: string) {
        this.gameId = gameId;
    }

    static fromObject(object: Record<string, any>): LoserOfGameRule {
        return new LoserOfGameRule(object.gameId);
    }

    clone(): LoserOfGameRule {
        return new LoserOfGameRule(this.gameId);
    }

    toObject(): Record<string, any> {
        return { type: KnockoutGameRuleType.LOSER_OF_GAME, gameId: this.gameId };
    }

    getGameId(): string {
        return this.gameId;
    }

    setGameId(game: string): void {
        this.gameId = game;
    }

    getType(): KnockoutGameRuleType {
        return KnockoutGameRuleType.LOSER_OF_GAME;
    }
}

export interface IKnockoutGame extends IBaseClass, IGame {
    getRuleForFirstParticipant(): KnockoutGameRule;
    getRuleForSecondParticipant(): KnockoutGameRule;
    setRuleForFirstParticipant(rule: KnockoutGameRule): void;
    setRuleForSecondParticipant(rule: KnockoutGameRule): void;
    getGame(): IGame;
    setGame(game: IGame): void;
    setRound(round: string): void;
    getRound(): string;
}

export class KnockoutGame implements IKnockoutGame {
    id: string;
    ruleForFirstParticipant: KnockoutGameRule;
    ruleForSecondParticipant: KnockoutGameRule;
    game: IGame;
    round: string;

    constructor(ruleForFirstParticipant: KnockoutGameRule, ruleForSecondParticipant: KnockoutGameRule, game: IGame, round: string) {
        this.id = uuidv4();
        this.ruleForFirstParticipant = ruleForFirstParticipant;
        this.ruleForSecondParticipant = ruleForSecondParticipant;
        this.game = game;
        this.round = round;
    }

    static init(ruleForFirstParticipant: KnockoutGameRule, ruleForSecondParticipant: KnockoutGameRule, game: IGame, round: string): KnockoutGame {
        return new KnockoutGame(ruleForFirstParticipant, ruleForSecondParticipant, game, round);
    }

    // make this reuse the uuid from the object
    static fromObject(object: Record<string, any>): KnockoutGame {
        const knockoutGame = new KnockoutGame(ruleFromObject(object.ruleForFirstParticipant), ruleFromObject(object.ruleForSecondParticipant), Game.fromObject(object.game), object.round);
        knockoutGame.id = object.id;
        return knockoutGame;
    }

    static isKnockoutGame(object: Record<string, any>): boolean {
        return object.ruleForFirstParticipant && object.ruleForSecondParticipant && object.game && object.round;
    }
    
    toObject(): Record<string, any> {
        return {
            id: this.id,
            ruleForFirstParticipant: this.ruleForFirstParticipant.toObject(),
            ruleForSecondParticipant: this.ruleForSecondParticipant.toObject(),
            round: this.round,
            game: this.game.toObject(),
        };
    }
    
    clone(): KnockoutGame {
        return new KnockoutGame(this.ruleForFirstParticipant, this.ruleForSecondParticipant, this.game, this.round);
    }

    getRuleForFirstParticipant(): KnockoutGameRule {
        return this.ruleForFirstParticipant;
    }
    
    setRuleForFirstParticipant(rule: KnockoutGameRule): void {
        this.ruleForFirstParticipant = rule;
    }

    getRuleForSecondParticipant(): KnockoutGameRule {
        return this.ruleForSecondParticipant;
    }
    
    setRuleForSecondParticipant(rule: KnockoutGameRule): void {
        this.ruleForSecondParticipant = rule;
    }

    getGame(): IGame {
        return this.game;
    }
    
    setGame(game: IGame): void {
        this.game = game;
    }

    /**
     * @returns the round of the game, e.g "Quarter-finals", "Semi-finals", "Final"
     */
    getRound(): string {
        return this.round;
    }

    setRound(round: string): void {
        this.round = round;
    }

    getId(): string {
        return this.id;
    }
    
    setId(id: string): void {
        this.id = id;
    }

    getFirstParticipant(): IGameParticipant {
        return this.game.getFirstParticipant();
    }
    
    setFirstParticipant(participant: IGameParticipant): void {
        this.game.setFirstParticipant(participant);
    }

    getFirstParticipantScore(): number {
        return this.game.getFirstParticipantScore();
    }
    
    setFirstParticipantScore(score: number): void {
        this.game.setFirstParticipantScore(score);
    }

    getFirstParticipantLogo(): string | undefined {
        return this.game.getFirstParticipantLogo();
    }
    
    setFirstParticipantLogo(logo: string): void {
        this.game.setFirstParticipantLogo(logo);
    }

    getFirstParticipantName(): string {
        return this.game.getFirstParticipantName();
    }
    
    setFirstParticipantName(name: string): void {
        this.game.setFirstParticipantName(name);
    }

    getSecondParticipant(): IGameParticipant {
        return this.game.getSecondParticipant();
    }
    
    setSecondParticipant(participant: IGameParticipant): void {
        this.game.setSecondParticipant(participant);
    }

    getSecondParticipantScore(): number {
        return this.game.getSecondParticipantScore();
    }
    
    setSecondParticipantScore(score: number): void {
        this.game.setSecondParticipantScore(score);
    }

    getSecondParticipantLogo(): string | undefined {
        return this.game.getSecondParticipantLogo();
    }
    
    setSecondParticipantLogo(logo: string): void {
        this.game.setSecondParticipantLogo(logo);
    }

    getSecondParticipantName(): string {
        return this.game.getSecondParticipantName();
    }
    
    setSecondParticipantName(name: string): void {
        this.game.setSecondParticipantName(name);
    }

    getScore(): IScore {
        return this.game.getScore();
    }
    
    setScore(score: IScore): void {
        this.game.setScore(score);
    }

    getTime(): IGameTime {
        return this.game.getTime();
    }
    
    setTime(time: IGameTime): void {
        this.game.setTime(time);
    }

    getStartTime(): Date {
        return this.game.getStartTime();
    }
    
    setStartTime(startTime: Date): void {
        this.game.setStartTime(startTime);
    }

    getEndTime(): Date | undefined {
        return this.game.getEndTime();
    }
    
    setEndTime(endTime: Date): void {
        this.game.setEndTime(endTime);
    }

    getDuration(): number {
        return this.game.getDuration();
    }
    
    setDuration(duration: number): void {
        this.game.setDuration(duration);
    }

    getField(): IGameField {
        return this.game.getField();
    }
    
    setField(field: IGameField): void {
        this.game.setField(field);
    }

    getFieldId(): string {
        return this.game.getFieldId();
    }
    
    setFieldId(fieldId: string): void {
        this.game.setFieldId(fieldId);
    }

    getFieldName(): string {
        return this.game.getFieldName();
    }
    
    setFieldName(fieldName: string): void {
        this.game.setFieldName(fieldName);
    }

    getStatus(): GameStatus {
        return this.game.getStatus();
    }
    
    setStatus(status: GameStatus): void {
        this.game.setStatus(status);
    }

    getWinner(): IGameParticipant {
        return this.game.getWinner();
    }
    
    getLoser(): IGameParticipant {
        return this.game.getLoser();
    }
}