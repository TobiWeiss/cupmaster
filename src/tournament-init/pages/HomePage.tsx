import { PlusCircle, Workflow } from 'lucide-react';
import { useTournaments } from '../hooks/useTournaments';
import { useTranslation } from 'react-i18next';
import { SubHeading, SmallText } from '../../common/components/typography/Text';
import { Card } from '../../common/components/ui/Card';
import { Icon } from '../../common/components/ui/Icon';
import { motion } from 'motion/react';
import { easeInOut } from 'motion/react';
import { TournamentTile } from '../components/tournament-tile/TournamentTile';

export const HomePage = () => {
  const { tournaments, createEmptyTournament, deleteTournament } = useTournaments();
  const { t } = useTranslation();

  const handleCreateEmptyTournament = async () => {
    await createEmptyTournament();
  };

  return (
    <div className="space-y-15">
      <div className="grid grid-cols-2 gap-20 max-w-7xl mx-auto my-20">
        <motion.div initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0, duration: 0.5, ease: easeInOut } }}
          exit={{ y: 200, opacity: 0, transition: { delay: 0, duration: 0.5, ease: easeInOut } }} className='flex flex-col flex-1'>
          <Card click={handleCreateEmptyTournament} className="flex flex-col items-center min-h-64">
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
        <motion.div initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0, duration: 0.5, ease: easeInOut } }}
          exit={{ y: 200, opacity: 0, transition: { delay: 0, duration: 0.5, ease: easeInOut } }} className='flex flex-col flex-1'>
          <Card to="/tournament-init/new" className="flex flex-col items-center min-h-64">
            <div className="flex-shrink-0 px-2">
              <Icon
                icon={Workflow}
                size="4xl"
                className="text-custom-third mb-4"
              />
            </div>
            <div className="ml-4">
              <SubHeading className="text-center">{t('tournamentInit.home.createTournamentWithWizard.title')}</SubHeading>
              <SmallText className="mt-1 text-center">{t('tournamentInit.home.createTournamentWithWizard.description')}</SmallText>
            </div>
          </Card>
        </motion.div>
      </div>

      {tournaments.length > 0 && (
        <div className="mt-8 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 * tournaments.length, ease: easeInOut } }}
            exit={{ opacity: 0, transition: { delay: 0.5 * tournaments.length, ease: easeInOut } }}>
            <SubHeading className="mb-4" color="text-custom-secondary-light">{t('tournamentInit.home.tournamentList.title')}</SubHeading>
          </motion.div>
          <div className="grid gap-4">
            {tournaments.map((tournament, index) => (
              <motion.div
                initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.5 * (index + 1), ease: easeInOut } }}
                exit={{ y: 200, opacity: 0, transition: { delay: 0.5, ease: easeInOut } }}
              >
                <TournamentTile
                  key={tournament.id}
                  tournament={tournament}
                  index={index}
                  onDelete={deleteTournament}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};