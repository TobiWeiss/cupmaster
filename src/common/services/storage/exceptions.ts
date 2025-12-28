export class StorageException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotFindTournamentsException extends StorageException {
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotFindTournamentException extends StorageException {
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotFindGamePlansException extends StorageException {
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotFindGamePlanException extends StorageException {
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotSaveTournamentException extends StorageException {
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotSaveGamePlanException extends StorageException {
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotDeleteTournamentException extends StorageException {  
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotDeleteGamePlanException extends StorageException {
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotSaveGroupsException extends StorageException {
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotDeleteGroupsException extends StorageException {
  constructor(message: string) {
    super(message);
  }
}

export class CouldNotFindGroupsException extends StorageException {
  constructor(message: string) {
    super(message);
  }
}