import { FC, useState } from 'react';
import { Tournament } from '../../types/tournament/Tournament';
import { IParticipant, Participant } from '../../types/tournament/Participant';
import { Card } from '../../../common/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { SmallText } from '../../../common/components/typography/Text';
import { Button } from '../../../common/components/ui/Button';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import { ParticipantForm } from './ParticipantForm';
import { useTranslation } from 'react-i18next';
import { PageInfo } from '../../../common/components/ui/PageInfo';
import { useNotify } from '../../../common/hooks/useNotify';

interface ParticipantSettingsProps {
  tournament: Tournament;
  onSave: (participants: IParticipant[]) => void;
}

export const ParticipantSettings: FC<ParticipantSettingsProps> = ({ tournament, onSave }) => {
  const { t } = useTranslation();
  const [isAddingParticipant, setIsAddingParticipant] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<IParticipant | null>(null);
  const [participants, setParticipants] = useState<IParticipant[]>(tournament.getParticipants() || []);

  const {showNotification} = useNotify();

  const handleAddParticipant = (participant: IParticipant) => {
    const newParticipants = [...participants, participant];
    setParticipants(newParticipants);
    setIsAddingParticipant(false);

    onSave(newParticipants);
  };

  const handleEditParticipant = (updatedParticipant: IParticipant) => {
    setParticipants(participants.map(p => 
      p.id === updatedParticipant.id ? updatedParticipant : p
    ));
   
    setEditingParticipant(null);

    onSave(participants);
  };

  const handleDeleteParticipant = (participantId: string) => {
    const newParticipants = participants.filter(p => p.id !== participantId);
    setParticipants(newParticipants);

    onSave(newParticipants);
  };

  return (
    <motion.div
      data-testid="participant-settings"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
      <PageInfo
        title={t('tournamentOperation.participants.title')}
        description={t('tournamentOperation.participants.description')}
        className="my-10"
      />
        <Button
          variant="outline"
          icon={Plus}
          onClick={() => setIsAddingParticipant(true)}
        >
          {t('tournamentOperation.participants.addParticipant')}
        </Button>
      </div>

      <AnimatePresence>
        {(isAddingParticipant || editingParticipant) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="mb-4">
              <ParticipantForm
                participant={editingParticipant ? Participant.fromObject(editingParticipant) : null}
                onSave={editingParticipant ? handleEditParticipant : handleAddParticipant}
                onCancel={() => {
                  setIsAddingParticipant(false);
                  setEditingParticipant(null);
                }}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {participants.map((participant, index) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {participant.logo ? (
                    <img
                      src={participant.getLogo()}
                      alt={participant.getName()}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-custom-secondary-light dark:bg-custom-secondary-dark flex items-center justify-center">
                      <Users size={20} />
                    </div>
                  )}
                  <div>
                    <SmallText className="font-bold max-w-[280px] truncate">{participant.name}</SmallText>
                    {participant.contact && (
                      <SmallText className="text-custom-secondary-light dark:text-custom-secondary-dark">
                        {participant.contact}
                      </SmallText>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Edit2}
                    onClick={() => setEditingParticipant(participant)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDeleteParticipant(participant.id!)}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 