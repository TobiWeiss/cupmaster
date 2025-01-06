import { PlusCircle, Edit3 } from 'lucide-react';
import { useTournaments } from '../hooks/useTournaments';
import { Tournament } from '../types/tournament';
import { useTranslation } from 'react-i18next';
import { MainHeading, SubHeading, LargeText, SmallText } from '../../common/components/typography/Text';
import { Card } from '../../common/components/ui/Card';
import { Icon } from '../../common/components/ui/Icon';

export const HomePage = () => {
  const { tournaments } = useTournaments();
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <MainHeading>{t('tournamentManagement.home.title')}</MainHeading>
        <LargeText className="mt-2">{t('tournamentManagement.home.subtitle')}</LargeText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card to="/tournament-management/new" className="flex items-center">
          <div className="flex-shrink-0">
            <Icon 
              icon={PlusCircle} 
              size="xl" 
              className="text-custom-third" 
            />
          </div>
          <div className="ml-4">
            <SubHeading>{t('tournamentManagement.home.createTournament.title')}</SubHeading>
            <SmallText className="mt-1">{t('tournamentManagement.home.createTournament.description')}</SmallText>
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
              size="xl" 
              className="text-custom-fourth" 
            />
          </div>
          <div className="ml-4">
            <SubHeading>{t('tournamentManagement.home.editTournament.title')}</SubHeading>
            <SmallText className="mt-1">
              {tournaments.length > 0
                ? t('tournamentManagement.home.editTournament.description')
                : t('tournamentManagement.home.editTournament.noTournaments')}
            </SmallText>
          </div>
        </Card>
      </div>

      {tournaments.length > 0 && (
        <div className="mt-8">
          <SubHeading className="mb-4">{t('tournamentManagement.home.tournamentList.title')}</SubHeading>
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