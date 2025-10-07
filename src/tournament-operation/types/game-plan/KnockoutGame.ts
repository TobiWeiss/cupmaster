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
    setType(type: KnockoutGameRuleType): void;
}

export interface PlacementInGroupRule extends KnockoutGameRule {
    getGroupId(): string;
    setGroupId(group: string): void;
}

export interface WinnerOfGameRule extends KnockoutGameRule {
    getGameId(): string;
    setGameId(game: string): void;
}

export interface LoserOfGameRule extends KnockoutGameRule {
    getGameId(): string;
    setGameId(game: string): void;
}

export interface IKnockoutGame extends IBaseClass, IGame {
    getRule(): KnockoutGameRule;
    setRule(rule: KnockoutGameRule): void;
    getGame(): IGame;
    setGame(game: IGame): void;
}

export class KnockoutGame implements IKnockoutGame {
    id: string;
    rule: KnockoutGameRule;
    game: IGame;

    constructor(rule: KnockoutGameRule, game: IGame) {
        this.id = uuidv4();
        this.rule = rule;
        this.game = game;
    }

    static init(rule: KnockoutGameRule, game: IGame): KnockoutGame {
        return new KnockoutGame(rule, game);
    }

    static fromObject(object: Record<string, any>): KnockoutGame {
        return new KnockoutGame(object.rule, object.game);
    }
    
    toObject(): Record<string, any> {
        return {
            id: this.id,
            rule: this.rule,
            game: this.game,
        };
    }
    
    clone(): KnockoutGame {
        return new KnockoutGame(this.rule, this.game);
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