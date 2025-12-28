import { IGame } from "./Game";
import { IGroup } from "./Group";
import { v4 as uuidv4 } from 'uuid';
import { IBaseClass } from '../../../common/types/BaseClass';
import { IGameParticipant } from "./GameParticipant";
import { IScore } from "./Score";
import { IGameTime } from "./GameTime";
import { IGameField } from "./GameField";
import { GameStatus } from "./GameStatus";

export interface IGroupGame extends IBaseClass, IGame {
    getGroupId(): string;
    setGroupId(groupId: string): void;
    getGame(): IGame;
    setGame(game: IGame): void;
}

export class GroupGame implements IGroupGame {
    id: string;
    groupId: string;
    game: IGame;

    constructor(groupId: string, game: IGame) {
        this.id = uuidv4();
        this.groupId = groupId;
        this.game = game;
    }
    
    static init(groupId: string, game: IGame): GroupGame {
        return new GroupGame(groupId, game);
    }
    
    static fromObject(object: Record<string, any>): GroupGame {
        return new GroupGame(object.groupId, object.game);
    }
    
    toObject(): Record<string, any> {
        return {
            id: this.id,
            groupId: this.groupId,
            game: this.game,
        };
    }

    clone(): GroupGame {
        return new GroupGame(this.groupId, this.game.clone() as IGame);
    }

    getGroupId(): string {
        return this.groupId;
    }

    setGroupId(groupId: string): void {
        this.groupId = groupId;
    }

    getId(): string {
        return this.id;
    }
    
    setId(id: string): void {
        this.id = id;
    }

    getGame(): IGame {
        return this.game;
    }
    
    setGame(game: IGame): void {
        this.game = game;
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
    
    
    getSecondParticipantScore(): number {
        return this.game.getSecondParticipantScore();
    }
    
    setSecondParticipantScore(score: number): void {
        this.game.setSecondParticipantScore(score);
    }
    
    
    getSecondParticipant(): IGameParticipant {
        return this.game.getSecondParticipant();
    }
    
    setSecondParticipant(participant: IGameParticipant): void {
        this.game.setSecondParticipant(participant);
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