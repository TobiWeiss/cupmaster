import { beforeEach, describe, it } from "vitest";
import { GamePlanOverview } from "../GamePlanOverview";
import { render } from "@testing-library/react";
import { GamePlan } from "../../../types/game-plan/GamePlan";

describe('GamePlanOverview', () => {
    let gamePlan: GamePlan;
    beforeEach(() => {
        gamePlan = new GamePlan("someID");
    });

    it('should render the game plan overview for a game plan with no games', () => {
        render(<GamePlanOverview gamePlan={gamePlan} onReorderGames={() => {}} />);
    });
});