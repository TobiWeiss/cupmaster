import { useEffect, useMemo, useState } from "react";
import { LocalStorage } from "../../common/services";
import { Group } from "../types/game-plan/Group";
import { ITournament } from "../types/tournament/Tournament";
import { GroupService } from "../services/GroupService";
import { GroupInitializer } from "../services/group-initializer/GroupInitializer";
import { TournamentPhase } from "../types/tournament/TournamentFormat";
import { IParticipant } from "../types/tournament/Participant";
import { GroupParticipant } from "../types/game-plan/GroupParticipant";

export const useGroups = (tournament: ITournament | null) => {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const groupService = useMemo(() => new GroupService(new LocalStorage()), []);
  const groupInitializer = useMemo(() => new GroupInitializer(), []);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        if (!tournament?.getId() || tournament.getPhases().includes(TournamentPhase.GROUP_STAGE)) return;
        setLoading(true);
        const groups = await groupService.getGroups(tournament.getId()!);
        setGroups(groups.map((group: Record<string, any>) => Group.fromObject(group)));
      } catch (err) {
        console.error('Error loading groups', err);
        setError(err instanceof Error ? err.message : 'Failed to load groups');
      } finally {
        setLoading(false);
      }
    }
    loadGroups();
  }, [tournament?.getId(), groupService, tournament?.getPhases()]);

  const createGroups = async (currentTournament: ITournament): Promise<void> => {
    try {
      setLoading(true);
      if (!currentTournament) return;
      const numberOfGroups = currentTournament.getNumberOfGroups(currentTournament.getFormat(), TournamentPhase.GROUP_STAGE);
      const newGroups = groupInitializer.initGroups(currentTournament.getId()!, currentTournament.getParticipants(), numberOfGroups);
      await groupService.createGroups(newGroups);

      setGroups(newGroups);
    } catch (err) {
      console.error('Error creating groups', err);
      setError(err instanceof Error ? err.message : 'Failed to create groups');
    } finally {
      setLoading(false);
    }
  }

  const addParticipantsToGroups = async (participant: IParticipant): Promise<void> => {
    try {
      setLoading(true);
      if (!groups) return;
      const newGroups = groupInitializer.addParticipantToGroup(participant, groups);
      await groupService.updateGroups(newGroups);
      setGroups(newGroups);
    } catch (err) {
      console.error('Error adding participants to groups', err);
      setError(err instanceof Error ? err.message : 'Failed to add participants to groups');
    } finally {
      setLoading(false);
    }
  }

  const removeParticipantsFromGroups = async (participant: IParticipant): Promise<void> => {
    try {
      setLoading(true);
      if (!groups) return;
      const newGroups = groupInitializer.removeParticipantFromGroup(participant, groups);
      await groupService.updateGroups(newGroups);
      setGroups(newGroups);
    } catch (err) {
      console.error('Error removing participants from groups', err);
      setError(err instanceof Error ? err.message : 'Failed to remove participants from groups');
    } finally {
      setLoading(false);
    }
  }

  const updateParticipantsInGroups = async (participant: IParticipant): Promise<void> => {
    try {
      setLoading(true);
      if (!groups) return;
      const newGroupParticipant = GroupParticipant.fromParticipant(participant);
      groups.forEach(g => g.hasParticipant(newGroupParticipant) ?? g.updateParticipant(newGroupParticipant));
      await groupService.updateGroups(groups);
      setGroups(groups);
    } catch (err) {
      console.error('Error updating participants in groups', err);
      setError(err instanceof Error ? err.message : 'Failed to update participants in groups');
    } finally {
      setLoading(false);
    }
  }

  return { groups, loading, error, createGroups, addParticipantsToGroups, removeParticipantsFromGroups, updateParticipantsInGroups };
};