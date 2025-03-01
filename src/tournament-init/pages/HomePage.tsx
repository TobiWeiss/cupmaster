import { PlusCircle } from 'lucide-react';
import { useTournaments } from '../hooks/useTournaments';
import { useTranslation } from 'react-i18next';
import { SubHeading, LargeText, SmallText } from '../../common/components/typography/Text';
import { Card } from '../../common/components/ui/Card';
import { Icon } from '../../common/components/ui/Icon';
import { motion } from 'motion/react';
import { easeInOut } from 'motion/react';

export const HomePage = () => {
  const { tournaments } = useTournaments();
  const { t } = useTranslation();

  return (
    <div className="space-y-15">
      <div className="text-center my-20">
        <SubHeading>{t('tournamentInit.home.title')}</SubHeading>
        <LargeText className="mt-2">{t('tournamentInit.home.subtitle')}</LargeText>
      </div>

      <div className="grid grid-cols-1 gap-20 max-w-7xl mx-auto my-20">
        <motion.div initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.5, ease: easeInOut } }}
          exit={{ y: 200, opacity: 0, transition: { delay: 0.5, ease: easeInOut } }} className='flex flex-col flex-1'>
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
        </motion.div>
      </div>

      {tournaments.length > 0 && (
        <div className="mt-8">
          {/*   <SubHeading className="mb-4">{t('tournamentInit.home.tournamentList.title')}</SubHeading>
          <div className="grid gap-4">
            {tournaments.map((tournament: TournamentInitiation) => (
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
          </div> */}
        </div>
      )}
    </div>
  );
};