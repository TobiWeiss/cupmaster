import { useState, useEffect } from 'react';
import { ITournament, Tournament } from '../../tournament-operation/types/tournament/Tournament';
import { useTournamentService } from './useTournamentService';
import { LocalStorage } from '../../common/services';

export const useTournament = (id: string | undefined) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tournamentService = useTournamentService(new LocalStorage());

  useEffect(() => {
    const loadTournament = async () => {
    console.info('Loading tournament', id);
    if (!id) return;
      try {
        const data = await tournamentService.getTournament(id);
        setTournament(data ? Tournament.init(data) : null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tournament');
      } finally {
        setLoading(false);
      }
    };

    loadTournament();
  }, []);

  useEffect(() => {
    if (tournament) {
      tournamentService.updateTournament(tournament as ITournament);
    }
  }, [tournament]);
  
  return { tournament: Tournament.init(tournament!), setTournament, loading, error };
};