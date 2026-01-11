import tournamentData from "../../__tests__/tournament.json";
import gamePlanData from "../../__tests__/game-plan.json";
import { useTournamentOperations } from "../useTournamentOperations";
import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import { LocalStorage } from "../../../common/services";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Tournament } from "../../types/tournament/Tournament";
import { Participant } from "../../types/tournament/Participant";
import { TournamentFormat } from "../../types/tournament/TournamentFormat";
import { cloneDeep } from "lodash";
import { Group } from "../../types/game-plan/Group";

vi.mock('../../../common/hooks/useNotify', () => {
    return {
        useNotify: vi.fn().mockReturnValue({
            showNotification: vi.fn(),
            showConfirmation: vi.fn().mockResolvedValue(true),
        }),
    }
});

describe('useTournamentOperations', () => {

    function TestComponent({addedParticipants, removedParticipants, updatedParticipants, changedMatchesAgainstEachParticipant, changedStartTime}: any) {
        const { tournament, gamePlan, groups, handleParticipantAdded, handleParticipantRemoved, handleParticipantUpdated, handleSettingsChange, handleGameReorder, gamePlanLoading, tournamentLoading, groupsLoading } = useTournamentOperations(tournamentData[0].id);        

        if (gamePlanLoading || tournamentLoading || groupsLoading) {
            return <div data-testid="loading">Loading...</div>
        }

        const handleChangeMatchesAgainstEachParticipant = () => {
            const updatedTournament = Tournament.fromObject(cloneDeep(tournament?.toObject() ?? {}));
            updatedTournament.setMatchesAgainstEachParticipant(changedMatchesAgainstEachParticipant, TournamentFormat.LEAGUE);
            handleSettingsChange(updatedTournament);
        }

        const handleChangeStartTime = () => {
            const updatedTournament = Tournament.fromObject(cloneDeep(tournament?.toObject() ?? {}));
            updatedTournament.setStartDate(changedStartTime);
            handleSettingsChange(updatedTournament);
        }

        const handlePutFirstGameLast = async () => {
            await handleGameReorder(0, gamePlan!.getGames()!.length - 1);
        }

        const handlePutPenultimateGameFirst = async () => {
            await handleGameReorder(gamePlan!.getGames()!.length - 2, 0);
        }
        
        return <div>
            <div data-testid="tournament">{tournament?.getName()}</div>
            <div data-testid="matches-against-each-participant">{tournament?.getMatchesAgainstEachParticipant(TournamentFormat.LEAGUE)}</div>
            <div data-testid="game-plan">{gamePlan?.getId()}</div>
            <div data-testid="amount-of-matches">{gamePlan?.getGames().length}</div>
            <div data-testid="second-game">{gamePlan?.getGames()[1].getId()}</div>
            <div data-testid="penultimate-game">{gamePlan?.getGames()[gamePlan?.getGames().length - 2].getId()}</div>
            <div data-testid="first-game">{gamePlan?.getGames()[0].getId()}</div>
            <div data-testid="last-game">{gamePlan?.getGames()[gamePlan?.getGames().length - 1].getId()}</div>
            <div data-testid="groups-count">{groups?.length ?? 0}</div>
            {groups && groups.length > 0 && (
                <div data-testid="first-group-id">{groups[0].getId()}</div>
            )}

            {groups && groups.length > 0 && (
                <div data-testid="groups">
                    {groups.map(g => (
                        <div data-testid={`group-${g.getId()}-participants-count`}>{g.getParticipants().length} participants</div>
                    ))}
                </div>
            )}

            {tournament && tournament.participants.length > 0 && (
                <div data-testid="participants-count">{tournament.participants.length}</div>
            )}

            {groupsLoading || tournamentLoading || gamePlanLoading && (
                <div data-testid="loading">Groups Loading...</div>
            )}

            <button data-testid="add-participants" onClick={() => handleParticipantAdded(addedParticipants)}>Add Participants</button>
            <button data-testid="remove-participants" onClick={() => handleParticipantRemoved(removedParticipants)}>Remove Participants</button>
            <button data-testid="update-participants" onClick={() => handleParticipantUpdated(updatedParticipants)}>Update Participants</button>
            <button data-testid="change-matches-against-each-participant" onClick={() => handleChangeMatchesAgainstEachParticipant()}>Change Matches Against Each Participant</button>
            <button data-testid="change-start-time" onClick={() => handleChangeStartTime()}>Change Start Time</button>
            <button data-testid="put first game last" onClick={() => handlePutFirstGameLast()}>Put First Game Last</button>
            <button data-testid="put penultimate game first" onClick={() => handlePutPenultimateGameFirst()}>Put Penultimate Game First</button>
        </div>
    }

    beforeEach(() => {
        localStorage.clear();
        tournamentData[0].config.leagueConfig.matchesAgainstEachParticipant = 1;
        localStorage.setItem(LocalStorage.TOURNAMENT_STORAGE_KEY, JSON.stringify(tournamentData));
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should load the tournament and game plan', async () => {
        render(<TestComponent />);
        await waitFor(() => {
            expect(screen.getByTestId('tournament')).toBeInTheDocument();
            expect(screen.getByTestId('game-plan')).toBeInTheDocument();
        });
    });

    it('should create a game plan if none has been created yet', async () => {
        localStorage.removeItem(LocalStorage.GAME_PLAN_STORAGE_KEY);
        render(<TestComponent />);

        await waitFor(() => {
            expect(screen.getByTestId('loading')).toBeInTheDocument();
        });

        await waitFor(() => {
            const amountOfMatches = screen.getByTestId('amount-of-matches');
            expect(amountOfMatches).toBeInTheDocument();
            expect(amountOfMatches.textContent).toBe('21'); // 21 matches for 7 participants
        });
    });

    it('should change the game plan if a participant is added', async () => {
        const addedParticipant = Participant.fromObject({
            id: '999',
            name: 'Test Participant 99',
            contact: "test2@test.com",
            logo: "test99.png"
        });

        render(<TestComponent addedParticipants={addedParticipant} />);

        await waitFor(() => {
            const amountOfMatches = screen.getByTestId('amount-of-matches');
            expect(amountOfMatches.textContent).toBe('21');
        });

        fireEvent.click(screen.getByTestId('add-participants'));

        await waitFor(() => {
            expect(screen.getByTestId('loading')).toBeInTheDocument();
        });

        await waitFor(() => {
            const participantsCount = screen.getByTestId('participants-count');
            expect(participantsCount.textContent).toBe('8');
        });

        await waitFor(() => {
            const amountOfMatches = screen.getByTestId('amount-of-matches');
            expect(amountOfMatches.textContent).toBe('31');
        });
    });

    it('should change the game plan if a participant is removed', async () => {
        const removedParticipant = tournamentData[0].participants[0];
        render(<TestComponent removedParticipants={removedParticipant} />);



        await waitFor(() => {
            const amountOfMatches = screen.getByTestId('amount-of-matches');
            expect(amountOfMatches.textContent).toBe('21');
        });

        fireEvent.click(screen.getByTestId('remove-participants'));

        await waitFor(() => {
            const participantsCount = screen.getByTestId('participants-count');
            expect(participantsCount.textContent).toBe('6');
        });

        await waitFor(() => {
            const amountOfMatches = screen.getByTestId('amount-of-matches');
            expect(amountOfMatches.textContent).toBe('15');
        });
    });

    it("should change the groups if a participant is added", async () => {
        
        const addedParticipant = Participant.fromObject({
            id: '999',
            name: 'Test Participant 99',
            contact: "test2@test.com",
            logo: "test99.png"
        });
        render(<TestComponent addedParticipants={addedParticipant} />);

        await waitFor(() => {
            const groupsCount = screen.getByTestId('groups-count');
            expect(groupsCount.textContent).toBe('2');
        });

        fireEvent.click(screen.getByTestId('add-participants'));

        await waitFor(() => {
            const groupsCount = screen.getByTestId('groups-count');
            expect(groupsCount.textContent).toBe('2');
        });

        await waitFor(() => {
            const groupParticipantsCount = screen.getByTestId('group-1-participants-count');
            expect(groupParticipantsCount.textContent).toBe('3 participants');
        });
    });

    it("should change the groups if a participant is removed", async () => {
        const removedParticipant = tournamentData[0].participants[0];
        render(<TestComponent removedParticipants={removedParticipant} />);
    });

    it('should change the game plan if the matches against each participant is changed', async () => {

        render(<TestComponent changedMatchesAgainstEachParticipant={2} />);

        await waitFor(() => {
            const amountOfMatches = screen.getByTestId('amount-of-matches');
            expect(amountOfMatches.textContent).toBe('21');
        });

        fireEvent.click(screen.getByTestId('change-matches-against-each-participant'));

        await waitFor(() => {
            const amountOfMatches = screen.getByTestId('amount-of-matches');
            expect(amountOfMatches.textContent).toBe('42');
        });
    });

    it('should preserve a custom order of games if the startTime of the tournament is changed', async () => {
        const currentStartDate = new Date(tournamentData[0].config.startDate);
        const changedStartTime = new Date(currentStartDate.getTime() + 1000 * 60 * 60 * 24);

        localStorage.setItem(LocalStorage.GAME_PLAN_STORAGE_KEY, JSON.stringify(gamePlanData));

        render(<TestComponent changedStartTime={changedStartTime} />);

        await waitFor(() => {
            const secondGame = screen.getByTestId('second-game');
            const penultimateGame = screen.getByTestId('penultimate-game');
            expect(secondGame.textContent).toBe(gamePlanData[0].games[1].id);
            expect(penultimateGame.textContent).toBe(gamePlanData[0].games[gamePlanData[0].games.length - 2].id);
        });

        fireEvent.click(screen.getByTestId('put first game last'));

        await waitFor(() => {
            const lastGame = screen.getByTestId('last-game');
            expect(lastGame.textContent).toBe(gamePlanData[0].games[0].id);
        });

        fireEvent.click(screen.getByTestId('put penultimate game first'));

        await waitFor(() => {
            const firstGame = screen.getByTestId('first-game');
            expect(firstGame.textContent).toBe(gamePlanData[0].games[gamePlanData[0].games.length - 1].id);
        });

        fireEvent.click(screen.getByTestId('change-start-time'));

        await waitFor(() => {
            const firstGame = screen.getByTestId('first-game');
            const secondGame = screen.getByTestId('second-game');
            const lastGame = screen.getByTestId('last-game');
            const penultimateGame = screen.getByTestId('penultimate-game');
            expect(firstGame.textContent).toBe(gamePlanData[0].games[gamePlanData[0].games.length - 1].id);
            expect(secondGame.textContent).toBe(gamePlanData[0].games[1].id);
            expect(lastGame.textContent).toBe(gamePlanData[0].games[0].id);
            expect(penultimateGame.textContent).toBe(gamePlanData[0].games[gamePlanData[0].games.length - 2].id);
        });
    });

    it('should load groups when they exist in storage', async () => {
        const tournament = Tournament.fromObject(tournamentData[0]);
        const mockGroups = [
            new Group(tournament.getId()!),
            new Group(tournament.getId()!),
        ];
        mockGroups[0].setName('Group A');
        mockGroups[1].setName('Group B');
        
        const groupsData = mockGroups.map(g => g.toObject());
        localStorage.setItem(LocalStorage.GROUPS_STORAGE_KEY, JSON.stringify(groupsData));

        render(<TestComponent />);

        await waitFor(() => {
            expect(screen.getByTestId('groups-count')).toBeInTheDocument();
        });

        await waitFor(() => {
            const groupsCount = screen.getByTestId('groups-count');
            expect(groupsCount.textContent).toBe('2');
            expect(screen.getByTestId('first-group-id')).toBeInTheDocument();
        });
    });

    it('should create groups when they do not exist in storage', async () => {
        localStorage.removeItem(LocalStorage.GROUPS_STORAGE_KEY);
        
        render(<TestComponent />);

        await waitFor(() => {
            expect(screen.getByTestId('loading')).toBeInTheDocument();
        });

        await waitFor(() => {
            const groupsCount = screen.getByTestId('groups-count');
            expect(groupsCount).toBeInTheDocument();
            
        });
    });

    it('should show loading state while groups are being loaded', async () => {
        localStorage.removeItem(LocalStorage.GROUPS_STORAGE_KEY);
        
        render(<TestComponent />);

        // Should show loading initially
        await waitFor(() => {
            expect(screen.getByTestId('loading')).toBeInTheDocument();
        });

        // Should eventually load groups
        await waitFor(() => {
            expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
            expect(screen.getByTestId('groups-count')).toBeInTheDocument();
        }, { timeout: 3000 });
    });
}); 