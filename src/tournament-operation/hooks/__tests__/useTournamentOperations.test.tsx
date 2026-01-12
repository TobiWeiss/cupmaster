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
import { LeagueCreator } from "../../services/game-plan-creators/LeagueCreator";

// Helper function to get tournament by type
const getTournamentByType = (type: "LEAGUE" | "GROUP_KNOCKOUT" | "KNOCKOUT") => {
    return tournamentData.find((t: any) => t.tournamentType === type) || tournamentData[0];
};

vi.mock('../../../common/hooks/useNotify', () => {
    return {
        useNotify: vi.fn().mockReturnValue({
            showNotification: vi.fn(),
            showConfirmation: vi.fn().mockResolvedValue(true),
        }),
    }
});

describe('useTournamentOperations', () => {

    function TestComponent({tournamentId, addedParticipants = [], removedParticipants = [], updatedParticipants = [], changedMatchesAgainstEachParticipant, changedStartTime}: any) {
        const { tournament, gamePlan, groups, handleParticipantAdded, handleParticipantRemoved, handleParticipantUpdated, handleSettingsChange, handleGameReorder, gamePlanLoading, tournamentLoading, groupsLoading, initialized } = useTournamentOperations(tournamentId);        

        if (gamePlanLoading || tournamentLoading || groupsLoading || !initialized) {
            console.log('Loading...', gamePlanLoading, tournamentLoading, groupsLoading);
            return <div data-testid="loading">Loading...</div>
        }

        console.log("Not loading...", );

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
                    {groups.map((g, index) => (
                        <div data-testid={`group-${index+1}-participants-count`}>{g.getParticipants().length} participants</div>
                    ))}
                </div>
            )}

            {tournament && tournament.participants.length > 0 && (
                <div data-testid="participants-count">{tournament.participants.length}</div>
            )}

            <button data-testid="add-participants" onClick={() => {
                 addedParticipants.forEach((p: any) => handleParticipantAdded(Participant.fromObject(p)));
            }}>Add Participants</button>
            <button data-testid="remove-participants" onClick={() => {
                removedParticipants.forEach((p: any) => handleParticipantRemoved(Participant.fromObject(p)));
            }}>Remove Participants</button>
            <button data-testid="update-participants" onClick={() => {
                updatedParticipants.forEach((p: any) => handleParticipantUpdated(Participant.fromObject(p)));
            }}>Update Participants</button>
            <button data-testid="change-matches-against-each-participant" onClick={() => handleChangeMatchesAgainstEachParticipant()}>Change Matches Against Each Participant</button>
            <button data-testid="change-start-time" onClick={() => handleChangeStartTime()}>Change Start Time</button>
            <button data-testid="put first game last" onClick={() => handlePutFirstGameLast()}>Put First Game Last</button>
            <button data-testid="put penultimate game first" onClick={() => handlePutPenultimateGameFirst()}>Put Penultimate Game First</button>
        </div>
    }

    beforeEach(() => {
        localStorage.clear();
        const allTournaments = tournamentData.map(t => Tournament.fromObject(t));
        localStorage.setItem(LocalStorage.TOURNAMENT_STORAGE_KEY, JSON.stringify(allTournaments));
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should load the tournament and game plan for a league tournament', async () => {
        const leagueTournament = getTournamentByType("LEAGUE");
        render(<TestComponent tournamentId={leagueTournament.id} />);
        await waitFor(() => {
            expect(screen.getByTestId('tournament')).toBeInTheDocument();
            expect(screen.getByTestId('game-plan')).toBeInTheDocument();
        });
    });

    it('should create a game plan if none has been created yet for a league tournament', async () => {
        const leagueTournament = getTournamentByType("LEAGUE");
        localStorage.removeItem(LocalStorage.GAME_PLAN_STORAGE_KEY);
        render(<TestComponent tournamentId={leagueTournament.id} />);

        await waitFor(() => {
            expect(screen.getByTestId('loading')).toBeInTheDocument();
        });

        await waitFor(() => {
            const amountOfMatches = screen.getByTestId('amount-of-matches');
            expect(amountOfMatches).toBeInTheDocument();
            expect(amountOfMatches.textContent).toBe('21'); // 21 matches for 7 participants
        });
    });

    it('should change the game plan if a participant is added for a league tournament', async () => {
        const leagueTournament = getTournamentByType("LEAGUE");
        const addedParticipant = Participant.fromObject({
            id: '999',
            name: 'Test Participant 99',
            contact: "test2@test.com",
            logo: "test99.png"
        });

        render(<TestComponent tournamentId={leagueTournament.id} addedParticipants={[addedParticipant]} />);

        await waitFor(() => {
            expect(screen.getByTestId('loading')).toBeInTheDocument();
        });


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

    it('should change the game plan if a participant is removed for a league tournament', async () => {
        const leagueTournament = getTournamentByType("LEAGUE");
        const removedParticipant = leagueTournament.participants[0];
        render(<TestComponent tournamentId={leagueTournament.id} removedParticipants={[removedParticipant]} />);



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

    it('should load the groups for a group knockout tournament', async () => {
        const groupKnockoutTournament = getTournamentByType("GROUP_KNOCKOUT");
        render(<TestComponent tournamentId={groupKnockoutTournament.id} />);
        await waitFor(() => {
            expect(screen.getByTestId('groups-count')).toBeInTheDocument();
        });
        await waitFor(() => {
            const groupsCount = screen.getByTestId('groups-count');
            expect(groupsCount.textContent).toBe('2');
            expect(screen.getByTestId('first-group-id')).toBeInTheDocument();
        });
    });

    it("should change the groups if a participant is added for a group knockout tournament", async () => {
        const groupKnockoutTournament = getTournamentByType("GROUP_KNOCKOUT");
        const addedParticipant = Participant.fromObject({
            id: '999',
            name: 'Test Participant 99',
            contact: "test2@test.com",
            logo: "test99.png"
        });
        render(<TestComponent tournamentId={groupKnockoutTournament.id} addedParticipants={[addedParticipant]} />);

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
            expect(groupParticipantsCount.textContent).toBe('5 participants');
        });
    });

    it("should change the groups if a participant is removed for a group knockout tournament", async () => {
        const groupKnockoutTournament = getTournamentByType("GROUP_KNOCKOUT");
        const removedParticipant = groupKnockoutTournament.participants[0];
        render(<TestComponent tournamentId={groupKnockoutTournament.id} removedParticipants={[removedParticipant]} />);

        await waitFor(() => {
            const groupsCount = screen.getByTestId('groups-count');
            expect(groupsCount.textContent).toBe('2');
        });

        fireEvent.click(screen.getByTestId('remove-participants'));

        await waitFor(() => {
            const groupsCount = screen.getByTestId('groups-count');
            expect(groupsCount.textContent).toBe('2');
        });

        await waitFor(() => {
            const groupParticipantsCount = screen.getByTestId('group-1-participants-count');
            expect(groupParticipantsCount.textContent).toBe('3 participants');
        });
    });

    it('should change the game plan if the matches against each participant is changed for a league tournament', async () => {
        const leagueTournament = getTournamentByType("LEAGUE");
        render(<TestComponent tournamentId={leagueTournament.id} changedMatchesAgainstEachParticipant={2} />);

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

  
    it('should load groups when they exist in storage for a group knockout tournament', async () => {
        const groupKnockoutTournament = getTournamentByType("GROUP_KNOCKOUT");
        const tournament = Tournament.fromObject(groupKnockoutTournament);
        const mockGroups = [
            new Group(tournament.getId()!),
            new Group(tournament.getId()!),
        ];
        mockGroups[0].setName('Group A');
        mockGroups[1].setName('Group B');
        
        const groupsData = mockGroups.map(g => g.toObject());
        localStorage.setItem(LocalStorage.GROUPS_STORAGE_KEY, JSON.stringify(groupsData));

        render(<TestComponent tournamentId={groupKnockoutTournament.id} />);

        await waitFor(() => {
            expect(screen.getByTestId('groups-count')).toBeInTheDocument();
        });

        await waitFor(() => {
            const groupsCount = screen.getByTestId('groups-count');
            expect(groupsCount.textContent).toBe('2');
            expect(screen.getByTestId('first-group-id')).toBeInTheDocument();
        });
    });

    it('should show loading state while groups are being loaded for a group knockout tournament', async () => {
        const groupKnockoutTournament = getTournamentByType("GROUP_KNOCKOUT");
        localStorage.removeItem(LocalStorage.GROUPS_STORAGE_KEY);
        
        render(<TestComponent tournamentId={groupKnockoutTournament.id} />);

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