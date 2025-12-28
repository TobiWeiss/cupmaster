import { useEffect, useMemo, useState } from "react";
import { LocalStorage } from "../../common/services";
import { Group } from "../types/game-plan/Group";
import { ITournament } from "../types/tournament/Tournament";
import { GroupService } from "../services/GroupService";
import { GroupInitializer } from "../services/group-initializer/GroupInitializer";

export const useGroups = (tournament: ITournament | null) => {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const groupService = useMemo(() => new GroupService(new LocalStorage()), []);
  const groupInitializer = useMemo(() => new GroupInitializer(), []);   

  useEffect(() => {
    const loadGroups = async () => {
      if (!tournament?.getId()) return;
      try {
        setLoading(true);
        const data = await groupService.getGroups(tournament.getId()!);
        if (!data || data.length === 0) {
          const numberOfGroups = tournament.getNumberOfGroups(tournament.getFormat(), tournament.getPhases()[0]);
          const newGroups = groupInitializer.initGroups(tournament.getId()!, tournament.getParticipants(), numberOfGroups);
          console.info('newGroups', newGroups);
          await groupService.createGroups(newGroups);
        }
        const groups = await groupService.getGroups(tournament.getId()!);
        console.info('groups', groups);
        setGroups(groups.map((group: Record<string, any>) => Group.fromObject(group)));
      } catch (err) {
        console.error('Error loading groups', err);
        setError(err instanceof Error ? err.message : 'Failed to load groups');
      } finally {
        setLoading(false);
      }
    }
    loadGroups();
  }, [tournament?.getId(), groupService]);

  const createGroups = async (groups: Group[]): Promise<void> => {
    try {
      await groupService.createGroups(groups);
      setGroups(groups);
    } catch (err) {
      console.error('Error creating groups', err);
      setError(err instanceof Error ? err.message : 'Failed to create groups');
    }
  }

  return { groups, loading, error, createGroups };
};