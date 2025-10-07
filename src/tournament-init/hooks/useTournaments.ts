import { useState, useEffect } from 'react';
import { useTournamentService } from './useTournamentService';
import { Tournament } from '../../tournament-operation/types/tournament/Tournament';
import { useNavigate } from 'react-router-dom';

export const useTournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tournamentService = useTournamentService();
  const navigate = useNavigate();

  const createEmptyTournament = async () => {
    const tournament = new Tournament();
    const createdTournament = await tournamentService.createTournament(tournament);
    setTournaments([...tournaments, createdTournament]);
    navigate(`/tournament-operation/${createdTournament.getId()}`);
  };

  const deleteTournament = async (id: string) => {
    await tournamentService.deleteTournament(id);
    setTournaments(tournaments.filter(tournament => tournament.getId() !== id));
  };

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
  }, []);

  return { tournaments, loading, error, createEmptyTournament, deleteTournament };
};