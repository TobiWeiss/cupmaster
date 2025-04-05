import { useState, useEffect } from 'react';
import { useTournamentService } from './useTournamentService';
import { Tournament } from '../../tournament-operation/types/tournament/Tournament';

export const useTournament = (id: string) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tournamentService = useTournamentService();

  useEffect(() => {
    const loadTournament = async () => {
      try {
        const data = await tournamentService.getTournament(id);
        setTournament(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tournament');
      } finally {
        setLoading(false);
      }
    };

    loadTournament();
  }, [id, tournamentService]);

  return { tournament, loading, error };
};