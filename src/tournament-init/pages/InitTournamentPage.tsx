import { useNavigate } from 'react-router-dom';
import { TournamentWizard } from '../components/wizard/TournamentWizard';
import { elements } from '../components/wizard/WizardConfig';
import { t } from 'i18next';
import { PageInfo } from '../../common/components/ui/PageInfo';
import { Tournament } from '../types/tournament';

export const InitTournamentPage = () => {
  const navigate = useNavigate();

  const handleComplete = async (data: Record<string, any>) => {
    const tournament = Tournament.fromFormData(data);
    console.log(tournament);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto my-5">
      <PageInfo
        title={t('tournamentInit.creation.title')}
        description={t('tournamentInit.creation.description')}
        className="my-10"
      />

      <TournamentWizard
        onComplete={handleComplete}
        onCancel={handleCancel}
        wizardElements={elements}
      />
    </div>
  );
};
