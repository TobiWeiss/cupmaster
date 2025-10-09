import { IGame } from "./Game";
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


export interface KnockoutGameRule {
    getType(): KnockoutGameRuleType;
}

export class PlacementInGroupRule implements KnockoutGameRule {
    groupId: string;
    place: number;

    constructor(groupId: string, place: number) {
        this.groupId = groupId;
        this.place = place;
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
    getRule(): KnockoutGameRule;
    setRule(rule: KnockoutGameRule): void;
    getGame(): IGame;
    setGame(game: IGame): void;
    setRound(round: string): void;
    getRound(): string;
}

export class KnockoutGame implements IKnockoutGame {
    id: string;
    rule: KnockoutGameRule;
    game: IGame;
    round: string;

    constructor(rule: KnockoutGameRule, game: IGame, round: string) {
        this.id = uuidv4();
        this.rule = rule;
        this.game = game;
        this.round = round;
    }

    static init(rule: KnockoutGameRule, game: IGame, round: string): KnockoutGame {
        return new KnockoutGame(rule, game, '');
    }

    static fromObject(object: Record<string, any>): KnockoutGame {
        return new KnockoutGame(object.rule, object.game, object.round);
    }
    
    toObject(): Record<string, any> {
        return {
            id: this.id,
            rule: this.rule,
            game: this.game,
        };
    }
    
    clone(): KnockoutGame {
        return new KnockoutGame(this.rule, this.game, this.round);
    }

    getRule(): KnockoutGameRule {
        return this.rule;
    }
    
    setRule(rule: KnockoutGameRule): void {
        this.rule = rule;
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