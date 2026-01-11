import { describe, beforeEach, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSettings } from "../useSettings";
import { Tournament } from "../../types/tournament/Tournament";
import { TournamentFormat, TournamentPhase } from "../../types/tournament/TournamentFormat";
import { cloneDeep } from "lodash";
import tournamentData from "../../__tests__/tournament.json";

vi.mock('../../../common/hooks/useNotify', () => {
  return {
    useNotify: vi.fn().mockReturnValue({
      showNotification: vi.fn(),
      showConfirmation: vi.fn().mockResolvedValue(true),
    }),
  };
});

describe('useSettings', () => {
  let oldTournament: Tournament;
  let updateGamePlan: ReturnType<typeof vi.fn>;
  let createNewGamePlan: ReturnType<typeof vi.fn>;
  let setTournament: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    oldTournament = Tournament.init(tournamentData[0]);
    updateGamePlan = vi.fn().mockResolvedValue({});
    createNewGamePlan = vi.fn().mockResolvedValue({});
    setTournament = vi.fn();
  });

  describe('hasTheFormatOfTheTournamentChanged', () => {
    it('should require new game plan when format changes from LEAGUE to GROUP_KNOCKOUT', async () => {
      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(oldTournament.toObject()));
      newTournament.setType(TournamentFormat.GROUP_KNOCKOUT, [TournamentPhase.GROUP_STAGE, TournamentPhase.KNOCKOUT_STAGE]);

      await result.current.handleSettingsChange(
        oldTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(createNewGamePlan).toHaveBeenCalledWith(newTournament);
      expect(updateGamePlan).not.toHaveBeenCalled();
    });

    it('should require new game plan when format changes from GROUP_KNOCKOUT to LEAGUE', async () => {
      const leagueTournament = Tournament.init(tournamentData[0]);
      leagueTournament.setType(TournamentFormat.LEAGUE, []);
      const groupKnockoutTournament = Tournament.fromObject(cloneDeep(leagueTournament.toObject()));
      groupKnockoutTournament.setType(TournamentFormat.GROUP_KNOCKOUT, [TournamentPhase.GROUP_STAGE, TournamentPhase.KNOCKOUT_STAGE]);

      const { result } = renderHook(() => useSettings());

      await result.current.handleSettingsChange(
        leagueTournament,
        groupKnockoutTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(createNewGamePlan).toHaveBeenCalledWith(groupKnockoutTournament);
      expect(updateGamePlan).not.toHaveBeenCalled();
    });
  });

  describe('haveTheMatchesAgainstEachParticipantChanged', () => {
    it('should require new game plan when matches against each participant changes in LEAGUE format', async () => {
      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(oldTournament.toObject()));
      newTournament.setMatchesAgainstEachParticipant(2, TournamentFormat.LEAGUE);

      await result.current.handleSettingsChange(
        oldTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(createNewGamePlan).toHaveBeenCalledWith(newTournament);
      expect(updateGamePlan).not.toHaveBeenCalled();
    });

    it('should require new game plan when matches against each participant changes in GROUP_STAGE', async () => {
      const groupKnockoutTournament = Tournament.init(tournamentData[0]);
      groupKnockoutTournament.setType(TournamentFormat.GROUP_KNOCKOUT, [TournamentPhase.GROUP_STAGE, TournamentPhase.KNOCKOUT_STAGE]);
      groupKnockoutTournament.setMatchesAgainstEachParticipant(1, TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);

      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(groupKnockoutTournament.toObject()));
      newTournament.setMatchesAgainstEachParticipant(2, TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);

      await result.current.handleSettingsChange(
        groupKnockoutTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(createNewGamePlan).toHaveBeenCalledWith(newTournament);
      expect(updateGamePlan).not.toHaveBeenCalled();
    });

    it('should require new game plan when matches against each participant changes in KNOCKOUT_STAGE', async () => {
      const groupKnockoutTournament = Tournament.init(tournamentData[0]);
      groupKnockoutTournament.setType(TournamentFormat.GROUP_KNOCKOUT, [TournamentPhase.GROUP_STAGE, TournamentPhase.KNOCKOUT_STAGE]);
      groupKnockoutTournament.setMatchesAgainstEachParticipant(1, TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE);

      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(groupKnockoutTournament.toObject()));
      newTournament.setMatchesAgainstEachParticipant(2, TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.KNOCKOUT_STAGE);

      await result.current.handleSettingsChange(
        groupKnockoutTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(createNewGamePlan).toHaveBeenCalledWith(newTournament);
      expect(updateGamePlan).not.toHaveBeenCalled();
    });
  });

  describe('hasTheAmountOfQualifiedParticipantsChanged', () => {
    it('should require new game plan when qualified participants changes in GROUP_STAGE', async () => {
      const groupKnockoutTournament = Tournament.init(tournamentData[0]);
      groupKnockoutTournament.setType(TournamentFormat.GROUP_KNOCKOUT, [TournamentPhase.GROUP_STAGE, TournamentPhase.KNOCKOUT_STAGE]);
      groupKnockoutTournament.setQualifiedParticipants(1, TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);

      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(groupKnockoutTournament.toObject()));
      newTournament.setQualifiedParticipants(2, TournamentFormat.GROUP_KNOCKOUT, TournamentPhase.GROUP_STAGE);

      await result.current.handleSettingsChange(
        groupKnockoutTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(createNewGamePlan).toHaveBeenCalledWith(newTournament);
      expect(updateGamePlan).not.toHaveBeenCalled();
    });
  });

  describe('all other changes', () => {
    it('should update game plan when start date changes', async () => {
      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(oldTournament.toObject()));
      const newStartDate = new Date(oldTournament.getStartDate());
      newStartDate.setHours(newStartDate.getHours() + 1);
      newTournament.setStartDate(newStartDate);

      await result.current.handleSettingsChange(
        oldTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(updateGamePlan).toHaveBeenCalledWith(newTournament);
      expect(createNewGamePlan).not.toHaveBeenCalled();
    });

    it('should update game plan when match duration changes', async () => {
      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(oldTournament.toObject()));
      newTournament.setMatchDuration(20, TournamentFormat.LEAGUE);

      await result.current.handleSettingsChange(
        oldTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(updateGamePlan).toHaveBeenCalledWith(newTournament);
      expect(createNewGamePlan).not.toHaveBeenCalled();
    });

    it('should update game plan when match break duration changes', async () => {
      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(oldTournament.toObject()));
      newTournament.setMatchBreakDuration(5, TournamentFormat.LEAGUE);

      await result.current.handleSettingsChange(
        oldTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(updateGamePlan).toHaveBeenCalledWith(newTournament);
      expect(createNewGamePlan).not.toHaveBeenCalled();
    });

    it('should update game plan when points for win changes', async () => {
      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(oldTournament.toObject()));
      newTournament.setPointsForWin(2, TournamentFormat.LEAGUE);

      await result.current.handleSettingsChange(
        oldTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(updateGamePlan).toHaveBeenCalledWith(newTournament);
      expect(createNewGamePlan).not.toHaveBeenCalled();
    });

    it('should update game plan when fields change', async () => {
      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(oldTournament.toObject()));
      const fields = newTournament.getFields();
      if (fields.length > 0) {
        fields[0].setName('New Field Name');
        newTournament.setFields(fields);
      }

      await result.current.handleSettingsChange(
        oldTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(updateGamePlan).toHaveBeenCalledWith(newTournament);
      expect(createNewGamePlan).not.toHaveBeenCalled();
    });
  });

  describe('confirmation handling', () => {
    it('should not create new game plan if user cancels confirmation', async () => {
      const mockShowConfirmation = vi.fn().mockResolvedValue(false);
      const { useNotify } = await import('../../../common/hooks/useNotify');
      vi.mocked(useNotify).mockReturnValueOnce({
        showNotification: vi.fn(),
        showConfirmation: mockShowConfirmation,
      });

      const { result } = renderHook(() => useSettings());
      const newTournament = Tournament.fromObject(cloneDeep(oldTournament.toObject()));
      newTournament.setType(TournamentFormat.GROUP_KNOCKOUT, [TournamentPhase.GROUP_STAGE, TournamentPhase.KNOCKOUT_STAGE]);

      const success = await result.current.handleSettingsChange(
        oldTournament,
        newTournament,
        updateGamePlan,
        createNewGamePlan,
        setTournament
      );

      expect(success).toBe(false);
      expect(createNewGamePlan).not.toHaveBeenCalled();
      expect(updateGamePlan).not.toHaveBeenCalled();
      expect(setTournament).not.toHaveBeenCalled();
    });
  });
});

