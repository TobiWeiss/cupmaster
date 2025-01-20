import { PlusCircle, Edit3 } from 'lucide-react';
import { useTournaments } from '../hooks/useTournaments';
import { Tournament } from '../types/tournament';
import { useTranslation } from 'react-i18next';
import { SubHeading, LargeText, SmallText } from '../../common/components/typography/Text';
import { Card } from '../../common/components/ui/Card';
import { Icon } from '../../common/components/ui/Icon';

export const HomePage = () => {
  const { tournaments } = useTournaments();
  const { t } = useTranslation();

  return (
    <div className="space-y-15">
      <div className="text-center my-20">
        <SubHeading>{t('tournamentInit.home.title')}</SubHeading>
        <LargeText className="mt-2">{t('tournamentInit.home.subtitle')}</LargeText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-7xl mx-auto my-20">
        <Card to="/tournament-init/new" className="flex flex-col items-center">
          <div className="flex-shrink-0 px-2">
            <Icon 
              icon={PlusCircle} 
              size="4xl" 
              className="text-custom-third mb-4" 
            />
          </div>
          <div className="ml-4">
            <SubHeading className="text-center">{t('tournamentInit.home.createTournament.title')}</SubHeading>
            <SmallText className="mt-1 text-center">{t('tournamentInit.home.createTournament.description')}</SmallText>
          </div>
        </Card>

        <Card 
          to={tournaments.length > 0 ? `/tournament/edit/${tournaments[0].id}` : '#'}
          disabled={tournaments.length === 0}
          className="flex items-center"
        >
          <div className="flex-shrink-0">
            <Icon 
              icon={Edit3} 
              size="4xl" 
              className="text-custom-fourth mb-4" 
            />
          </div>
          <div className="ml-4">
            <SubHeading>{t('tournamentInit.home.editTournament.title')}</SubHeading>
            <SmallText className="mt-1">
              {tournaments.length > 0
                ? t('tournamentInit.home.editTournament.description')
                : t('tournamentInit.home.editTournament.noTournaments')}
            </SmallText>
          </div>
        </Card>
      </div>

      {tournaments.length > 0 && (
        <div className="mt-8">
          <SubHeading className="mb-4">{t('tournamentInit.home.tournamentList.title')}</SubHeading>
          <div className="grid gap-4">
            {tournaments.map((tournament: Tournament) => (
              <Card
                key={tournament.id}
                to={`/tournament/edit/${tournament.id}`}
              >
                <SubHeading className="text-xl">{tournament.config.name}</SubHeading>
                <SmallText className="mt-1">
                  {t('common.tournament.format.' + tournament.config.format).replace('_', ' ')} • 
                  {t('common.tournament.status.' + tournament.status)}
                </SmallText>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};