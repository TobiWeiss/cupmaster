import { GameField } from "../../types/game-plan/GameField";
import { Game, IGame } from "../../types/game-plan/Game";
import { GameParticipant } from "../../types/game-plan/GameParticipant";
import { GamePlan, IGamePlan } from "../../types/game-plan/GamePlan";
import { ITournament } from "../../types/tournament/Tournament";
import { TournamentFormat, TournamentPhase } from "../../types/tournament/TournamentFormat";
import { IGroup } from "../../types/game-plan/Group";
import { GroupGame, IGroupGame } from "../../types/game-plan/GroupGame";

export class GroupCreator {

    constructor() { }

    createGamePlan(tournament: ITournament, groups: IGroup[]): IGamePlan {
        const gamePlan = new GamePlan(tournament.getId()!);

        let groupGames = this._createGames(groups);
        groupGames = this._orderGames(groupGames, groups);
        groupGames = this._addMatchesAgainstEachOther(groupGames, tournament);
        groupGames = this._assignFields(groupGames, tournament);
        groupGames = this._setGameDates(groupGames, tournament);

        gamePlan.setGames(groupGames);

        return gamePlan;
    }

    /**
     * Update the game plan with the new tournament settings. Only the fields and dates are updated.
     * @param gamePlan the game plan to update
     * @param tournament the tournament to update the game plan with
     * @returns the updated game plan
     */
    updateFieldsAndDates(gamePlan: IGamePlan, tournament: ITournament): IGamePlan {
        let games = gamePlan.getGames() as IGroupGame[];

        games = this._assignFields(games, tournament);
        games = this._setGameDates(games, tournament);

        gamePlan.setGames(games);

        return gamePlan;
    }

    _createGames(groups: IGroup[]): IGroupGame[] {
        let games: IGroupGame[] = [];

        const gamesOfEachGroup: IGroupGame[][] = [...groups.map(() => [])];


        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            const groupParticipants = group.getParticipants();
            for (let j = 0; j < groupParticipants.length; j++) {
                const gameParticipant1 = GameParticipant.fromObject(groupParticipants[j]);
                // create games against all remaining participants in the group
                for (let k = j + 1; k < groupParticipants.length; k++) {
                    const gameParticipant2 = GameParticipant.fromObject(groupParticipants[k]);
                    const game = new Game();
                    game.setFirstParticipant(gameParticipant1);
                    game.setSecondParticipant(gameParticipant2);
                    const groupGame = new GroupGame(group.getId(), game);
                    gamesOfEachGroup[i].push(groupGame);
                }
            }
        }

        games = gamesOfEachGroup.flatMap(games => games)

        return games;
    }

    /**
     * Games are ordered so that matches rotate over the groups. I.e. if we have 3 groups A, B and C, 
     * the games are ordered so that the first game is from group A, the second from group B, the third from group C, 
     * the fourth from group A, the fifth from group B, the sixth from group C, etc.
     * Games are ordered to avoid a team playing twice within two consecutive cycles of a group if possible.
     * @param games the games to order
     * @param groups the groups to order the games for
     * @returns the ordered games
     */
    _orderGames(games: IGroupGame[], groups: IGroup[]): IGroupGame[] {
        let orderedGames: Array<IGroupGame> = [];

        while (orderedGames.length < games.length) {
            let gamesAdded = 0;
            groups.forEach(group => {
                const notYetOrderedGames = games.filter(game => !orderedGames.some(og => og.getId() == game.getId()));

                const nextSuitablGame = this._findNextSuitableGame(orderedGames,notYetOrderedGames, group.getId());
                if(nextSuitablGame) {
                    orderedGames.push(nextSuitablGame);
                    gamesAdded++;
                }
            });
            if(gamesAdded == 0) {
                throw new Error("Error ordering games. No suitable game found.");
            }
        }

        return orderedGames;
    }

    _addMatchesAgainstEachOther(games: IGroupGame[], tournament: ITournament): IGroupGame[] {
        let gamesWithMatchesAgainstEachOther: IGroupGame[] = [...games];

        if (tournament.getMatchesAgainstEachParticipant(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE) > 1) {
            for (let index = 1; index < tournament.getMatchesAgainstEachParticipant(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE); index++) {
                gamesWithMatchesAgainstEachOther = [...gamesWithMatchesAgainstEachOther, ...games.map(g => g.clone() as IGroupGame)];
            }
        }

        return gamesWithMatchesAgainstEachOther;
    }


    _assignFields(games: IGroupGame[], tournament: ITournament): IGroupGame[] {
        const fields = tournament.getFields();
        const gameFields = fields.map(field => new GameField(field.getName()));


        games.forEach((game, index) => {
            game.setField(gameFields[(index) % gameFields.length]);
        });

        return games;
    }

    _setGameDates(games: IGroupGame[], tournament: ITournament): IGroupGame[] {
        const numberOfFields = tournament.getFields().length;
        let currentCycleStartTime = new Date(tournament.getStartDate()!.getTime());
        games.forEach((game, index) => {
            game.setStartTime(new Date(currentCycleStartTime));
            const matchDurationInMinutes = tournament.getMatchDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);
            
            game.setEndTime(new Date(currentCycleStartTime.getTime() + matchDurationInMinutes * 60000));

            if ((index + 1) % numberOfFields == 0) {
                currentCycleStartTime = new Date(currentCycleStartTime.setMinutes(currentCycleStartTime.getMinutes()
                    + tournament.getMatchBreakDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE)
                    + tournament.getMatchDuration(TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE)
                ));
            }
        });

        return games;
    }


    // HELPER FUNCTIONS

    /**
     * Finds the next suitable game for the group. It will avoid a team playing twice in a row within two consecutive cycles of a group.
     * If no suitable game is found, it returns the first game of the group found.
     * @param games a list of not yet ordered games (i.e. already ordered games are not included)
     * @param groupId the group id
     * @returns 
     */
    _findNextSuitableGame(orderedGames: IGroupGame[], nonAssignedGames: IGroupGame[], groupId: string) {
        const participantsOfLastGameOfGroup = orderedGames.filter(game => game.getGroupId() == groupId).reduce((acc: string[], game) => {
            acc[0] = game.getFirstParticipant().getId();
            acc[1] =game.getSecondParticipant().getId();
            return acc;
        }, []);

        // if the group has no games yet, return the first game of the group found
        if(participantsOfLastGameOfGroup.length == 0) {
            return nonAssignedGames.find(game => game.getGroupId() == groupId);
        }

        const nextSuitableGame = nonAssignedGames.find(game => (!participantsOfLastGameOfGroup.includes(game.getFirstParticipant().getId()!) && !participantsOfLastGameOfGroup.includes(game.getSecondParticipant().getId()!)) && game.getGroupId() == groupId);

        if (nextSuitableGame) {
            return nextSuitableGame;
        }

        return nonAssignedGames.find(game => game.getGroupId() == groupId);
    }

    _hasAmountOfMatchesAgainstEachOtherChanged(tournament: ITournament, gamePlan: IGamePlan): boolean {
        const amountOfMatchesAgainstEachOther = tournament.getMatchesAgainstEachParticipant(TournamentFormat.LEAGUE);
        const games = gamePlan.getGames();
        const amountOfMatchesAgainstEachOtherInGamePlan = games.filter(g => g.getFirstParticipant().getId() == g.getSecondParticipant().getId()).length;
        return amountOfMatchesAgainstEachOther !== amountOfMatchesAgainstEachOtherInGamePlan;
    }
}