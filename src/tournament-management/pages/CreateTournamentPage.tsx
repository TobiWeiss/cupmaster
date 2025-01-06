import { useNavigate } from 'react-router-dom';
import { useTournamentService } from '../hooks/useTournamentService';
import { TournamentWizard } from '../components/wizard/TournamentWizard';

export const CreateTournamentPage = () => {
  const navigate = useNavigate();
  const tournamentService = useTournamentService();

  const handleComplete = async (data: any) => {
    await tournamentService.createTournament(data);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <TournamentWizard
      onComplete={handleComplete}
      onCancel={handleCancel}
    />
  );
};