import { GameField } from "../../types/game-plan/GameField";
import { Game, IGame } from "../../types/game-plan/Game";
import { GameParticipant } from "../../types/game-plan/GameParticipant";
import { GamePlan, IGamePlan } from "../../types/game-plan/GamePlan";
import { ITournament } from "../../types/tournament/Tournament";
import { TournamentFormat } from "../../types/tournament/TournamentFormat";

export class LeagueCreator {

    constructor() {
    }

    createGamePlan(tournament: ITournament): IGamePlan {
        const gamePlan = new GamePlan(tournament.getId()!);

        let games = this._createGames(tournament);
        games = this._orderGames(games);
        games = this._addMatchesAgainstEachOther(games, tournament);
        games = this._assignFields(games, tournament);
        games = this._setGameDates(games, tournament);

        gamePlan.setGames(games);

        return gamePlan;
    }

    /**
     * Update the game plan with the new tournament settings. Only the fields and dates are updated.
     * @param gamePlan the game plan to update
     * @param tournament the tournament to update the game plan with
     * @returns the updated game plan
     */
    updateFieldsAndDates(gamePlan: IGamePlan, tournament: ITournament): IGamePlan {
        let games = gamePlan.getGames();

        games = this._assignFields(games, tournament);
        games = this._setGameDates(games, tournament);

        gamePlan.setGames(games);

        return gamePlan;
    }



    _createGames(tournament: ITournament): IGame[] {
        let games: IGame[] = [];
        const participants = tournament.getParticipants();

        const gamesOfEachParticipant: IGame[][] = [];

        for (let i = 0; i < participants.length; i++) {
            gamesOfEachParticipant[i] = [];
            const gameParticipant1 = GameParticipant.fromObject(participants[i]);
            for (let j = i + 1; j < participants.length; j++) {
                if (participants[i].getId() === participants[j].getId()) continue;
                const game: Game = new Game();
                const gameParticipant2 = GameParticipant.fromObject(participants[j]);
                game.setFirstParticipant(gameParticipant1);
                game.setSecondParticipant(gameParticipant2);    
                gamesOfEachParticipant[i].push(game);
            }
        }

        games = gamesOfEachParticipant.flatMap(games => games)

        return games;
    }

    _orderGames(games: IGame[]): IGame[] {
        let orderedGames: Array<IGame> = [];
        let teamsLastPlayed: string[] = [];

        for (let index = 0; index < games.length; index++) {
            const game = games[index];

            if (!this._haveTeamsPlayedInLastGame(game, teamsLastPlayed)) {
                teamsLastPlayed = this._addGameIfNotExists(orderedGames, game, teamsLastPlayed);
                continue;
            }

            // If we can't directly add the game, find the next game that doesn't have the same teams as teamsLastPlayed and is not already in the orderedGames
            const nextSuitableGameIndex = this._findNextSuitableGame(games, teamsLastPlayed, game, orderedGames);

            // If no suitable game is found, try to fit it in the existing games
            if (nextSuitableGameIndex === -1) {
                
                orderedGames = this._sortWithinExistingGames(orderedGames, game);
                teamsLastPlayed = this._updateTeamsLastPlayed(game.getFirstParticipant().getId()!, game.getSecondParticipant().getId()!);
                continue;
            }
            // Else add the game after the suitable game
            teamsLastPlayed = this._addGameIfNotExists(orderedGames, games[nextSuitableGameIndex], teamsLastPlayed);
            teamsLastPlayed = this._addGameIfNotExists(orderedGames, game, teamsLastPlayed);
        }

        return orderedGames;
    }

    _addMatchesAgainstEachOther(games: IGame[], tournament: ITournament): IGame[] {
        let gamesWithMatchesAgainstEachOther: IGame[] = [...games];

        if (tournament.getMatchesAgainstEachParticipant(TournamentFormat.LEAGUE) > 1) {
            for (let index = 1; index < tournament.getMatchesAgainstEachParticipant(TournamentFormat.LEAGUE); index++) {
                gamesWithMatchesAgainstEachOther = [...gamesWithMatchesAgainstEachOther, ...games.map(g => g.clone() as IGame)];
            }
        }

        return gamesWithMatchesAgainstEachOther;
    }


    _assignFields(games: IGame[], tournament: ITournament): IGame[] {
        const fields = tournament.getFields();
        const gameFields = fields.map(field => new GameField(field.getName()));


        games.forEach((game, index) => {
            game.setField(gameFields[(index) % gameFields.length]);
        });

        return games;
    }

    _setGameDates(games: IGame[], tournament: ITournament): IGame[] {
        const numberOfFields = tournament.getFields().length;
        let currentCycleStartTime = new Date(tournament.getStartDate()!.getTime());
        games.forEach((game, index) => {
            game.setStartTime(new Date(currentCycleStartTime));
            game.setEndTime(new Date(currentCycleStartTime.getTime() + tournament.getMatchDuration(TournamentFormat.LEAGUE)));

            if ((index + 1) % numberOfFields == 0) {
                currentCycleStartTime = new Date(currentCycleStartTime.setMinutes(currentCycleStartTime.getMinutes()
                    + tournament.getMatchBreakDuration(TournamentFormat.LEAGUE)
                    + tournament.getMatchDuration(TournamentFormat.LEAGUE)
                ));
            }
        });

        return games;
    }


    // HELPER FUNCTIONS

    _sortWithinExistingGames(orderedGames: IGame[], game: IGame): IGame[] {
        orderedGames = this._tryToAddWhileAvoidingATeamPlayingTwiceInARow(orderedGames, game);

        // if the games was added, we're done
        if (orderedGames.some(g => g.getId() == game.getId())) {
            return orderedGames;
        }

        orderedGames = this._tryToAddWhileAvoidingATeamPlayingThreeTimesInARow(orderedGames, game);

        // add the game if it wasn't possible to add it while avoiding a team playing three times in a row
        if (!orderedGames.some(g => g.getId() == game.getId())) {
            orderedGames.push(game);
        }

        return orderedGames;
    }

    _tryToAddWhileAvoidingATeamPlayingTwiceInARow(orderedGames: IGame[], game: IGame): IGame[] {
        let firstSuitableGameFound = false;
        let secondSuitableGameFound = false;

        for (let index = 0; index < orderedGames.length; index++) {
            const g = orderedGames[index];

            if (index === 0 && !this._doTeamsBetweenGamesOverlap([game, g])) {
                
                orderedGames.splice(index, 0, game);
                return orderedGames;
            }

            if (firstSuitableGameFound == true && !this._doTeamsBetweenGamesOverlap([game, g])) {
                
                const removed = orderedGames.splice(index, 0, game);
                
                secondSuitableGameFound = true;
                return orderedGames;
            }

            if (!this._doTeamsBetweenGamesOverlap([game, g])) {
                firstSuitableGameFound = true;
                
            } else {
                firstSuitableGameFound = false;
            }

            if (firstSuitableGameFound && secondSuitableGameFound) {
                break;
            }
        }

        return orderedGames;
    }

    _tryToAddWhileAvoidingATeamPlayingThreeTimesInARow(orderedGames: IGame[], game: IGame): IGame[] {
        let isGameAdded = false;
        for (let index = 0; index < orderedGames.length; index++) {


            if (index === 0 || index == 1) {
                continue;
            }

            const g0 = orderedGames[index];
            const g1 = orderedGames[index - 1];


            if (!this._doTeamsBetweenGamesOverlap([game, g0, g1])) {
                orderedGames.splice(index, 0, game);
                isGameAdded = true;
                return orderedGames;
            }

            if (isGameAdded) {
                break;
            }
        }

        return orderedGames;
    }

    /**
     * Returns true if at least one team is in all of the games passed
     * @param games 
     * @returns 
     */
    _doTeamsBetweenGamesOverlap(games: IGame[]): boolean {
        let doTeamsOverlap = false;

        const participants = games.reduce((acc: string[], g) => {
            acc.push(g.getFirstParticipant().getId()!);
            acc.push(g.getSecondParticipant().getId()!);
            return acc;
        }, []);

        const uniqueParticipants = [...new Set(participants)];

        uniqueParticipants.forEach(p => {
            if (games.every(g => g.getFirstParticipant().getId() == p || g.getSecondParticipant().getId() == p)) {
                doTeamsOverlap = true;
            }
        });

        return doTeamsOverlap;
    }

    _haveTeamsPlayedInLastGame(game: IGame, teamsLastPlayed: string[]): boolean {
        return teamsLastPlayed.includes(game.getFirstParticipant().getId()!) || teamsLastPlayed.includes(game.getSecondParticipant().getId()!);
    }

    _findNextSuitableGame(games: IGame[], teamsLastPlayed: string[], gameToAdd: IGame, orderedGames: IGame[]) {
        return games.findIndex(g =>
            orderedGames.filter(og => og.getId() == g.getId()).length == 0 &&
            !teamsLastPlayed.includes(g.getFirstParticipant().getId()) &&
            !teamsLastPlayed.includes(g.getSecondParticipant().getId()) &&
            (!(g.getFirstParticipant().getId() == gameToAdd.getFirstParticipant().getId() ||
                g.getFirstParticipant().getId() == gameToAdd.getSecondParticipant().getId()) &&
                !(g.getSecondParticipant().getId() == gameToAdd.getSecondParticipant().getId() ||
                    g.getSecondParticipant().getId() == gameToAdd.getFirstParticipant().getId()))
        );
    }

    _addGameIfNotExists(orderedGames: IGame[], game: IGame, teamsLastPlayed: string[]): string[] {
        if (orderedGames.filter(g => g.getId() == game.getId()).length == 0) {
            orderedGames.push(game);
            teamsLastPlayed = this._updateTeamsLastPlayed(game.getFirstParticipant().getId()!, game.getSecondParticipant().getId()!);
        }

        return teamsLastPlayed;
    }

    private _updateTeamsLastPlayed(homeTeamId: string, awayTeamId: string) {
        const teamsLastPlayed = [];
        teamsLastPlayed.push(homeTeamId);
        teamsLastPlayed.push(awayTeamId);
        return teamsLastPlayed;
    }

    _hasAmountOfMatchesAgainstEachOtherChanged(tournament: ITournament, gamePlan: IGamePlan): boolean {
        const amountOfMatchesAgainstEachOther = tournament.getMatchesAgainstEachParticipant(TournamentFormat.LEAGUE);
        const games = gamePlan.getGames();
        const amountOfMatchesAgainstEachOtherInGamePlan = games.filter(g => g.getFirstParticipant().getId() == g.getSecondParticipant().getId()).length;
        return amountOfMatchesAgainstEachOther !== amountOfMatchesAgainstEachOtherInGamePlan;
    }
}