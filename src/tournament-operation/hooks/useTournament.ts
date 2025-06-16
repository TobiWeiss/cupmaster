import { useState, useEffect, useMemo } from 'react';
import { ITournament, Tournament } from '../../tournament-operation/types/tournament/Tournament';
import { useTournamentService } from './useTournamentService';
import { LocalStorage } from '../../common/services';
import { TournamentService } from '../services/TournamentService';

export const useTournament = (id: string | undefined) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tournamentService = useMemo(() => new TournamentService(new LocalStorage()), []);

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
    console.info('Updating tournament', tournament);
    if (tournament) {
      tournamentService.updateTournament(tournament as ITournament);
    }
  }, [tournament]);
  
  return { tournament, setTournament, loading, error };
};