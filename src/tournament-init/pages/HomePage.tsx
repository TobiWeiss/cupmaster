import { Boxes, Calendar, Loader, PlusCircle, UsersRound } from 'lucide-react';
import { useTournaments } from '../hooks/useTournaments';
import { useTranslation } from 'react-i18next';
import { SubHeading, LargeText, SmallText } from '../../common/components/typography/Text';
import { Card } from '../../common/components/ui/Card';
import { Icon } from '../../common/components/ui/Icon';
import { motion } from 'motion/react';
import { easeInOut } from 'motion/react';
import { Tournament } from '../../tournament-operation/types/tournament/Tournament';

export const HomePage = () => {
  const { tournaments } = useTournaments();
  const { t } = useTranslation();


  return (
    <div className="space-y-15">
      <div className="grid grid-cols-1 gap-20 max-w-7xl mx-auto my-20">
        <motion.div initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0, duration: 0.5, ease: easeInOut } }}
          exit={{ y: 200, opacity: 0, transition: { delay: 0, duration: 0.5, ease: easeInOut } }} className='flex flex-col flex-1'>
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
        <div className="mt-8 max-w-7xl mx-auto">
          <motion.div initial={{  opacity: 0 }}
            animate={{  opacity: 1, transition: { delay: 0.5 * tournaments.length, ease: easeInOut } }}
            exit={{  opacity: 0, transition: { delay: 0.5 * tournaments.length, ease: easeInOut } }}>
            <SubHeading className="mb-4" color="text-custom-secondary-dark dark:text-custom-secondary-light">{t('tournamentInit.home.tournamentList.title')}</SubHeading>
          </motion.div>
          <div className="grid gap-4">
            {tournaments.map((tournament: Tournament, index: number) => (
              <motion.div initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.5 * index, ease: easeInOut } }}
                exit={{ y: 200, opacity: 0, transition: { delay: 0.5, ease: easeInOut } }}>
                <Card
                  key={tournament.id}
                  to={`/tournament-operation/${tournament.id}`}
                >
                  <div className="flex items-center my-2">
                    {tournament.getLogoUrl() && (
                      <img src={tournament.getLogoUrl()} alt="Tournament Logo" className="w-10 h-10 rounded-full" />
                    )}
                    <SubHeading className="text-xl">{tournament.getName()}</SubHeading>
                  </div>
                  <div className="flex flex-row gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-row gap-2 items-center">
                          <Icon icon={Boxes} size="sm" />
                          <SmallText className="mt-1">{t('tournamentInit.home.tournamentList.iconLabels.format') + ': '}</SmallText>
                        </div>
                        <SmallText className="mt-1">
                          {t('tournamentInit.home.tournamentList.format.' + tournament.getFormat())}
                        </SmallText>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-row gap-2 items-center">
                          <Icon icon={Loader} size="sm" />
                          <SmallText className="mt-1">
                            {t('tournamentInit.home.tournamentList.iconLabels.status') + ': '}
                          </SmallText>
                        </div>
                        <SmallText className="mt-1">
                          {t('tournamentInit.home.tournamentList.status.' + tournament.getStatus())}
                        </SmallText>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-row gap-2 items-center">
                          <Icon icon={Calendar} size="sm" />
                          <SmallText className="mt-1">
                            {t('tournamentInit.home.tournamentList.iconLabels.beginning') + ': '}
                          </SmallText>
                        </div>
                        <SmallText className="mt-1">
                          {tournament.getStartDate().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' - ' + tournament.getStartDate().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                        </SmallText>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-row gap-2 items-center">
                          <Icon icon={UsersRound} size="sm" />
                          <SmallText className="mt-1">
                            {t('tournamentInit.home.tournamentList.iconLabels.participants') + ': '}
                          </SmallText>
                        </div>
                        <SmallText className="mt-1">
                          {tournament.getNumberOfParticipants()}
                        </SmallText>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};