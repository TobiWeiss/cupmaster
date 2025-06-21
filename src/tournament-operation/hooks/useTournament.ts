import { useState, useEffect, useMemo } from 'react';
import { ITournament, Tournament } from '../../tournament-operation/types/tournament/Tournament';
import { LocalStorage } from '../../common/services';
import { TournamentService } from '../services/TournamentService';

export const useTournament = (id: string | undefined) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tournamentService = useMemo(() => new TournamentService(new LocalStorage()), []);

  useEffect(() => {
    const loadTournament = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        
        const data = await tournamentService.getTournament(id);
        
        setTournament(data ? Tournament.init(data) : null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tournament');
      }
    };

    loadTournament();
  }, [id, tournamentService]);

  useEffect(() => {
    if (tournament) {
      try {
        tournamentService.updateTournament(tournament as ITournament);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update tournament');
      } finally {
        setLoading(false);
      }
    }
  }, [tournament]);
  
  return { tournament, setTournament, loading, error };
};