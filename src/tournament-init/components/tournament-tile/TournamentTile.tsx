import { Boxes, Calendar, Loader, UsersRound, Trash2, Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { easeInOut } from 'motion/react';
import { Tournament } from '../../../tournament-operation/types/tournament/Tournament';
import { SubHeading, SmallText } from '../../../common/components/typography/Text';
import { Card } from '../../../common/components/ui/Card';
import { Icon } from '../../../common/components/ui/Icon';
import { Button } from '../../../common/components/ui/Button';
import { useNotify } from '../../../common/hooks/useNotify';
import { useNavigate } from 'react-router-dom';
import { NotificationType } from '../../../common/types/NotifficationTypes';

interface TournamentTileProps {
    tournament: Tournament;
    index: number;
    onDelete: (id: string) => Promise<void>;
}

export const TournamentTile = ({ tournament, index, onDelete }: TournamentTileProps) => {
    const { t } = useTranslation();
    const { showConfirmation, showNotification } = useNotify();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmed = await showConfirmation(t('tournamentInit.home.tournamentList.deleteConfirmation'));
        if (confirmed) {
            try {
                await onDelete(tournament.getId());
                showNotification(t('tournamentInit.home.tournamentList.deleteSuccess'), NotificationType.SUCCESS);
            } catch (error) {
                showNotification(t('tournamentInit.home.tournamentList.deleteError'), NotificationType.ERROR);
            }
        }
    };

    const handleEdit = () => {
        navigate(`/tournament-operation/${tournament.getId()}`);
    };

    return (
        <Card
            key={tournament.id}
        >
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <div className="flex items-center my-2">
                        {tournament.getLogoUrl() && (
                            <img src={tournament.getLogoUrl()} alt="Tournament Logo" className="w-10 h-10 rounded-full mr-2" />
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
                                <SmallText className="mt-1" dataTestId="tournament-format">
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
                                <SmallText className="mt-1" dataTestId="tournament-status">
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
                                <SmallText className="mt-1" dataTestId="tournament-beginning-date">
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
                                <SmallText className="mt-1" dataTestId="tournament-participants">
                                    {tournament.getNumberOfParticipants()}
                                </SmallText>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                    <motion.div
                        initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, transition: { delay: 0.8 * (index + 1), ease: easeInOut } }}
                        exit={{ y: 200, opacity: 0, transition: { delay: 0.5, ease: easeInOut } }}
                    >
                        <Button
                            variant="outline"
                            size="base"
                            onClick={handleEdit}
                            className="flex items-center gap-2"
                            data-testid="tournament-tile-edit-button"
                        >
                            <Icon icon={Edit} size="sm" />
                        </Button>
                    </motion.div>
                    <motion.div
                        initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, transition: { delay: 0.9 * (index + 1), ease: easeInOut } }}
                        exit={{ y: 200, opacity: 0, transition: { delay: 0.5, ease: easeInOut } }}
                    >
                        <Button
                            variant="outline"
                            size="base"
                            onClick={handleDelete}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            data-testid="tournament-tile-delete-button"
                        >
                            <Icon icon={Trash2} size="sm" color="red" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </Card>
    );
};
