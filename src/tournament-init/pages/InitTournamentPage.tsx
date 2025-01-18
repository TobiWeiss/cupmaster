import { useNavigate } from 'react-router-dom';
import { useTournamentService } from '../hooks/useTournamentService';
import { TournamentWizard } from '../components/wizard/TournamentWizard';
import { elements } from '../components/wizard/WizardConfig';


export const InitTournamentPage = () => {
  const navigate = useNavigate();
  const tournamentService = useTournamentService();

  const handleComplete = async (data: Record<string, any>) => {
    console.log(data);
    //await tournamentService.createTournament(data);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <TournamentWizard
      onComplete={handleComplete}
      onCancel={handleCancel}
      wizardFields={elements}
    />
  );
};