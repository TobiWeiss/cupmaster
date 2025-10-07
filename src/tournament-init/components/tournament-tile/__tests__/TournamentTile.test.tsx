import { describe, expect, it, vi } from "vitest";
import { TournamentTile } from "../TournamentTile";
import { Tournament } from "../../../../tournament-operation/types/tournament/Tournament";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TournamentFormat } from "../../../../tournament-operation/types/tournament/TournamentFormat";
import { TournamentStatus } from "../../../../tournament-operation/types/tournament/TournamentStatus";
import { Participant } from "../../../../tournament-operation/types/tournament/Participant";
import { useNavigate } from "react-router-dom";
import { useNotify } from "../../../../common/hooks/useNotify";

const tournament = new Tournament();
tournament.setId('1');
tournament.setName('Test Tournament');
tournament.setType(TournamentFormat.LEAGUE, []);
tournament.setStatus(TournamentStatus.INITIALIZED);
const startDateTomorrow = new Date();
startDateTomorrow.setDate(startDateTomorrow.getDate() + 1);
tournament.setStartDate(startDateTomorrow);

const participants = [new Participant('Test Participant', 'https://example.com/logo.png')];
tournament.setParticipants(participants);


// Mock translations
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            language: 'en',
            changeLanguage: vi.fn(),
        },
    }),
}));

vi.mock('../../../../common/hooks/useNotify', () => {
    return {
        useNotify: vi.fn().mockReturnValue({
            showNotification: vi.fn(),
            showConfirmation: () => { return new Promise((resolve) => { resolve(true); }) },
        }),
    }
});


vi.mock('react-router-dom', () => {

    return {
        useNavigate: vi.fn()
    }
});


describe('TournamentTile', () => {

    const onDelete = vi.fn();
    const renderTournamentTile = () => {
        return render(<TournamentTile tournament={tournament} index={0} onDelete={onDelete} />);
    };

    it('should render the tournament tile', () => {
        renderTournamentTile();
        expect(screen.getByTestId('tournament-format')).toHaveTextContent('tournamentInit.home.tournamentList.format.LEAGUE');
        expect(screen.getByTestId('tournament-status')).toHaveTextContent('tournamentInit.home.tournamentList.status.INITIALIZED');
        expect(screen.getByTestId('tournament-beginning-date')).toHaveTextContent(tournament.getStartDate().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' - ' + tournament.getStartDate().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }));
        expect(screen.getByTestId('tournament-participants')).toHaveTextContent(tournament.getParticipants().length.toString());
    });

    it('should navigate to the tournament operation page when the edit button is clicked', async () => {
        const navigate = vi.fn();
        vi.mocked(useNavigate).mockReturnValue(navigate);
        renderTournamentTile();
        const editButton = await screen.findByTestId('tournament-tile-edit-button');
        fireEvent.click(editButton);
        expect(navigate).toHaveBeenCalledWith(`/tournament-operation/${tournament.getId()}`);
    });

    it('should delete the tournament when the delete button is clicked and the deletion is confirmed', async () => {
        const showConfirmation = vi.fn().mockResolvedValue(true);
        vi.mocked(useNotify).mockReturnValue({
            showConfirmation: showConfirmation,
            showNotification: vi.fn(),
        });
        renderTournamentTile();
        const deleteButton = await screen.findByTestId('tournament-tile-delete-button');
        fireEvent.click(deleteButton);
        await waitFor(() => {
            expect(onDelete).toHaveBeenCalledWith(tournament.getId());
        });
    });

    it('should not delete the tournament when the delete button is clicked and the deletion is not confirmed', async () => {
        const showConfirmation = vi.fn().mockResolvedValue(false);
        vi.mocked(useNotify).mockReturnValue({
            showConfirmation: showConfirmation,
            showNotification: vi.fn(),
        });
        renderTournamentTile();
        const deleteButton = await screen.findByTestId('tournament-tile-delete-button');
        fireEvent.click(deleteButton);
    });
});