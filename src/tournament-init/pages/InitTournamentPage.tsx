import { useNavigate } from 'react-router-dom';
import { useTournamentService } from '../hooks/useTournamentService';
import { TournamentWizard } from '../components/wizard/TournamentWizard';
import { elements } from '../components/wizard/WizardConfig';
import { t } from 'i18next';
import { SmallText, SubHeading } from '../../common/components/typography/Text';


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
    <div className="max-w-7xl mx-auto my-20">
    <SubHeading className="text-start mb-20" data-testid="wizard-title">
      {t('tournamentInit.creation.title')}
    </SubHeading>

    <SmallText className="mb-20" >
      {t('tournamentInit.creation.description')}
    </SmallText>

    <TournamentWizard
      onComplete={handleComplete}
      onCancel={handleCancel}
      wizardElements={elements}
    />
    </div>
  );
};
