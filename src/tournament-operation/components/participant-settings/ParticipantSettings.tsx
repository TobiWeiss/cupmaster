import { FC, useState } from 'react';
import { Tournament, Participant } from '../../../tournament-init/types/tournament';
import { Card } from '../../../common/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { LargeText, SmallText } from '../../../common/components/typography/Text';
import { Button } from '../../../common/components/ui/Button';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import { ParticipantForm } from './ParticipantForm';
import { useTranslation } from 'react-i18next';

interface ParticipantSettingsProps {
  tournament: Tournament;
}

export const ParticipantSettings: FC<ParticipantSettingsProps> = ({ tournament }) => {
  const { t } = useTranslation();
  const [isAddingParticipant, setIsAddingParticipant] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [participants, setParticipants] = useState<Participant[]>(tournament.getParticipants());

  const handleAddParticipant = (participant: Participant) => {
    setParticipants([...participants, participant]);
    setIsAddingParticipant(false);
  };

  const handleEditParticipant = (updatedParticipant: Participant) => {
    setParticipants(participants.map(p => 
      p.id === updatedParticipant.id ? updatedParticipant : p
    ));
    setEditingParticipant(null);
  };

  const handleDeleteParticipant = (participantId: string) => {
    setParticipants(participants.filter(p => p.id !== participantId));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <LargeText>{t('tournamentOperation.participants.title')}</LargeText>
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
                participant={editingParticipant}
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
                      src={participant.logo}
                      alt={participant.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-custom-secondary-light dark:bg-custom-secondary-dark flex items-center justify-center">
                      <Users size={20} />
                    </div>
                  )}
                  <div>
                    <SmallText className="font-bold">{participant.name}</SmallText>
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