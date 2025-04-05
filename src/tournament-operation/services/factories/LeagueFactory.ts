import { Game, IGame } from "../../types/game-plan/Game";
import { GameParticipant } from "../../types/game-plan/GameParticipant";
import { GamePlan, IGamePlan } from "../../types/game-plan/GamePlan";
import { ITournament, Tournament } from "../../types/tournament/Tournament";
import { IGamePlanFactory } from "./IGamePlanFactory";

export class LeagueFactory implements IGamePlanFactory {

    constructor() {
    }

    createGamePlan(tournament: ITournament): IGamePlan {
        const gamePlan = new GamePlan(tournament.getId()!);
        gamePlan.setGames(this._createGames(tournament));
        console.info(tournament, gamePlan);
        return gamePlan;
    }

    _createGames(tournament: ITournament): IGame[] {
        let games: IGame[] = [];
        const participants = tournament.getParticipants();

        const gamesOfEachParticipant: IGame[][] = [];

        for (let i = 0; i < participants.length; i++) {
            gamesOfEachParticipant[i] = [];
            const gameParticipant1 = new GameParticipant();
            gameParticipant1.setId(participants[i].getId()!);
            gameParticipant1.setName(participants[i].getName());
            gameParticipant1.setLogo(participants[i].getLogo()!);
            for (let j = i + 1; j < participants.length; j++) {
                if (participants[i].getId() === participants[j].getId()) continue;
                const game: Game = new Game();
                const gameParticipant2 = new GameParticipant();
                gameParticipant2.setId(participants[j].getId()!);
                gameParticipant2.setName(participants[j].getName());
                gameParticipant2.setLogo(participants[j].getLogo()!);
                game.setFirstParticipant(gameParticipant1);
                game.setSecondParticipant(gameParticipant2);
                gamesOfEachParticipant[i].push(game);
            }
        }

        games = gamesOfEachParticipant.flatMap(games => games)
        games = this._orderGames(games);

        return games;
    }

    _orderGames(games: IGame[]): IGame[] {
        let orderedGames: Set<IGame> = new Set();
        let teamsLastPlayed: string[] = [];

        games.forEach((game, index) => {

            if(index === games.length - 1) {
                console.info('Last game', game);
                 // If so, find the next game that doesn't have the same team and is not already in the orderedGames
                 let firstSuitableGameFound = false;
                 Array.from(orderedGames).forEach((g, index) => {

                    if(index === 0 && g.getFirstParticipant().getId() != game.getFirstParticipant().getId() && g.getFirstParticipant().getId() != game.getSecondParticipant().getId() && g.getSecondParticipant().getId() != game.getFirstParticipant().getId() && g.getSecondParticipant().getId() != game.getSecondParticipant().getId()) {
                        console.info('Replacing first game');
                        const orderedGamesArray = [...orderedGames];
                        orderedGamesArray.splice(index, 0, game);
                        orderedGames = new Set(orderedGamesArray);
                        return;
                    }

                    if(firstSuitableGameFound == true && g.getFirstParticipant().getId() != game.getFirstParticipant().getId() && g.getFirstParticipant().getId() != game.getSecondParticipant().getId() && g.getSecondParticipant().getId() != game.getFirstParticipant().getId() && g.getSecondParticipant().getId() != game.getSecondParticipant().getId()) {
                        console.info('Place found!');
                        const orderedGamesArray = [...orderedGames];
                        orderedGamesArray.splice(index, 0, game);
                        orderedGames = new Set(orderedGamesArray);
                        return;
                    }

                    if(g.getFirstParticipant().getId() != game.getFirstParticipant().getId() && g.getFirstParticipant().getId() != game.getSecondParticipant().getId() && g.getSecondParticipant().getId() != game.getFirstParticipant().getId() && g.getSecondParticipant().getId() != game.getSecondParticipant().getId()) {
                        firstSuitableGameFound = true;
                        console.info('Suitable game found');
                    } else {
                        firstSuitableGameFound = false;
                    }

                });
                return;
            }

            const homeTeamId = game.getFirstParticipant().getId();
            const awayTeamId = game.getSecondParticipant().getId();

            if (!teamsLastPlayed.includes(homeTeamId) && !teamsLastPlayed.includes(awayTeamId)) {
                orderedGames.add(game);
                // Update the last played team
                teamsLastPlayed = [];
                teamsLastPlayed.push(homeTeamId);
                teamsLastPlayed.push(awayTeamId);
                return;
            }        
            // If so, find the next game that doesn't have the same team and is not already in the orderedGames
            const nextGameIndex = games.findIndex(g =>
                !teamsLastPlayed.includes(g.getFirstParticipant().getId()) &&
                !teamsLastPlayed.includes(g.getSecondParticipant().getId()) &&
                !orderedGames.has(g)
            );

            if (nextGameIndex === -1) {
                orderedGames.add(game);
                teamsLastPlayed = [];
                teamsLastPlayed.push(homeTeamId);
                teamsLastPlayed.push(awayTeamId);
                return;
            }

            teamsLastPlayed = [];
            teamsLastPlayed.push(games[nextGameIndex].getFirstParticipant().getId()!);
            teamsLastPlayed.push(games[nextGameIndex].getSecondParticipant().getId()!);


            orderedGames.add(games[nextGameIndex]);
        });

        return Array.from(orderedGames);
    }

    _assignPitches(games: Game[], tournament: ITournament): Game[] {
        return games;
    }

    _setGameDates(games: Game[], tournament: ITournament): Game[] {
        return games;
    }


}