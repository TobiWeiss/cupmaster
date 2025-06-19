export class ValidationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationException';
    }
}

export class TournamentNameTooLongException extends ValidationException {
    constructor(maxLength: number) {
        super(`Tournament name cannot be longer than ${maxLength} characters`);
        this.name = 'TournamentNameTooLongException';
    }
}

export class InvalidDateException extends ValidationException {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidDateException';
    }
}

export class InvalidNumberException extends ValidationException {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidNumberException';
    }
} 

export class TooFewFieldsException extends ValidationException {
    constructor() {
        super("Ein Turnier muss mindestens eine Feld haben.");
        this.name = 'TooFewFieldsException';
    }
}

export class ParticipantNameAlreadyExistsException extends ValidationException {
    constructor(name: string) {
        super(`Participant name ${name} already exists`);
        this.name = 'ParticipantNameAlreadyExistsException';
    }
}