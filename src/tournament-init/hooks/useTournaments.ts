import { useState, useEffect } from 'react';
import { useTournamentService } from './useTournamentService';
import { Tournament } from '../../tournament-init/types/tournament';

export const useTournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tournamentService = useTournamentService();

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const data = await tournamentService.getAllTournaments();
       
        setTournaments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tournaments');
      } finally {
        setLoading(false);
      }
    };

    loadTournaments();
  }, [tournamentService]);

  return { tournaments, loading, error };
};