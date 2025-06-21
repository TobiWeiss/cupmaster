import { beforeEach, describe, expect, it, vi } from "vitest";
import { GamePlanOverview } from "../GamePlanOverview";
import { render, screen } from "@testing-library/react";
import { GamePlan } from "../../../types/game-plan/GamePlan";
import { Game } from "../../../types/game-plan/Game";
import gamePlanData from './game-plan.json'

// Mock translations
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));


describe('GamePlanOverview', () => {
    let gamePlan: GamePlan;
    beforeEach(() => {
        gamePlan = new GamePlan("someID");
    });

    it('should render the game plan overview for a game plan with no games', async () => {
        render(<GamePlanOverview gamePlan={gamePlan} onReorderGames={() => {}} />);
        expect(await screen.findByTestId('no-matches-text')).toBeInTheDocument();
    });

    it('should render the game plan overview for a game plan with games', async () => {
        gamePlan = GamePlan.fromObject(gamePlanData);
        render(<GamePlanOverview gamePlan={gamePlan} onReorderGames={() => {}} />);
        gamePlan.getGames().forEach((game) => {
            expect(screen.getByTestId(`game-time-${game.getId()}`)).toBeInTheDocument();
            expect(screen.getByTestId(`field-name-${game.getId()}`)).toBeInTheDocument();
            expect(screen.getByTestId(`first-participant-name-${game.getId()}`)).toBeInTheDocument();
            expect(screen.getByTestId(`second-participant-name-${game.getId()}`)).toBeInTheDocument();
            expect(screen.getByTestId(`first-participant-logo-${game.getId()}`)).toBeInTheDocument();
            expect(screen.getByTestId(`second-participant-logo-${game.getId()}`)).toBeInTheDocument();
        });

        const firstGame = gamePlan.getGames()[0];

        expect(screen.getByTestId(`first-participant-name-${firstGame.getId()}`)).toHaveTextContent(firstGame.getFirstParticipantName());
        expect(screen.getByTestId(`second-participant-name-${firstGame.getId()}`)).toHaveTextContent(firstGame.getSecondParticipantName());
        expect(screen.getByTestId(`first-participant-logo-${firstGame.getId()}`)).toHaveAttribute('src', firstGame.getFirstParticipantLogo());
        expect(screen.getByTestId(`second-participant-logo-${firstGame.getId()}`)).toHaveAttribute('src', firstGame.getSecondParticipantLogo());
        expect(screen.getByTestId(`game-time-${firstGame.getId()}`)).toHaveTextContent("22.06., 14:30");
        expect(screen.getByTestId(`field-name-${firstGame.getId()}`)).toHaveTextContent("Field 1");
    });
});