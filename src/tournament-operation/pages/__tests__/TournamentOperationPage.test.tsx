import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { LocalStorage } from "../../../common/services";
import tournamentData from "../../__tests__/tournament.json";
import gamePlanData from "../../__tests__/game-plan.json";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TournamentOperationPage } from "../TournamentOperationPage";

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ id: 'd59da92b-f866-4dc4-b2a4-7ee35b7dd467' }),
    };
});

describe('TournamentOperationPage', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        
        // Set up test data
        localStorage.setItem(LocalStorage.TOURNAMENT_STORAGE_KEY, JSON.stringify(tournamentData));
        localStorage.setItem(LocalStorage.GAME_PLAN_STORAGE_KEY, JSON.stringify(gamePlanData));
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should render the tournament operation page', async () => {
        render(<TournamentOperationPage />);
        
        await waitFor(
            () => {
                // First, wait for the loading text to disappear
                expect(screen.queryByText('Loading tournament...')).not.toBeInTheDocument();
                const overview = screen.getByTestId('game-plan-overview');
                expect(overview).toBeInTheDocument();
            },
            {
                interval: 100,
                timeout: 4000,

            }
        );
    });

    it('should be possible to navigate between game plan, participants and settings', async () => {
        render(<TournamentOperationPage />);

        await waitFor(
            () => {
                const gamePlan = screen.getByTestId('bottom-navigation-game-plan');
                expect(gamePlan).toBeInTheDocument();
            },
        );

        const participants = screen.getByTestId('bottom-navigation-participants');
        fireEvent.click(participants);

        await waitFor(
            () => {
                const participants = screen.getByTestId('participant-settings');
                expect(participants).toBeInTheDocument();
            },
        );

        const settings = screen.getByTestId('bottom-navigation-settings');
        fireEvent.click(settings);

        await waitFor(
            () => {
                const settings = screen.getByTestId('tournament-settings');
                expect(settings).toBeInTheDocument();
            },
        );
    });
});