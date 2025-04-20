import { useState } from 'react';
import { Button } from '../../../../../../common/components/ui/Button';
import { Plus, Trash2, Info, Save, X, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SmallestText } from '../../../../../../common/components/typography/Text';
import { Icon } from '../../../../../../common/components/ui/Icon';
import { AnimatePresence, easeInOut, motion } from 'framer-motion';

interface ListItem {
  name: string;
}

export interface Participant extends ListItem {
  logo?: string;
}

export interface ListComponentProps<T extends ListItem> {
  items: T[];
  onChange: (participants: T[]) => void;
  maxItems?: number;
}

export const ParticipantList = ({
  items: participants,
  onChange,
  maxItems,
}: ListComponentProps<Participant>) => {
  const { t } = useTranslation();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (newParticipant: Participant) => {
    onChange([...participants, newParticipant]);
    setIsAdding(false);
  };

  const handleDelete = (name: string) => {
    onChange(participants.filter(participant => participant.name !== name));
  };

  const ParticipantForm = ({
    participant,
    onSave,
    onCancel
  }: {
    participant: Participant | null;
    onSave: (participant: Participant) => void;
    onCancel: () => void;
  }) => {
    const [name, setName] = useState(participant?.name || '');
    const [logo, setLogo] = useState(participant?.logo || '');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ name, logo });
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.0001, ease: easeInOut } }}
        exit={{ opacity: 0, transition: { duration: 0.0001, ease: easeInOut } }}
        className="flex flex-col items-center gap-4"
      >
        <input
          type="text"
          data-testid={`wizard-participant-list-input-name`}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={t('tournamentInit.creation.participants.namePlaceholder')}
          className="w-full px-4 py-2 pr-10 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark placeholder-custom-secondary-light dark:placeholder-custom-secondary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
          autoFocus
        />
        <div className="flex items-center gap-2">
          {logo && (
            <img
              src={logo}
              alt="Preview"
              className="w-10 h-10 rounded-full object-scale-down mr-2"
            />
          )}
          <Button
            type='button'
            variant="outline"
            icon={Upload}
            onClick={() => document.getElementById('logo')?.click()}
          >
            <SmallestText>{t('common.uploadLogo')}</SmallestText>
          </Button>
          <input
            type="file"
            id="logo"
            className="hidden"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setLogo(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        <div className="flex gap-2 mt-8">
          <Button onClick={handleSubmit} icon={Save} iconPosition='right' variant="outline" size="sm" data-testid={`wizard-participant-list-button-save`}>
            <SmallestText>{t('common.save')}</SmallestText>
          </Button>
          <Button type="button" icon={X} iconPosition='right' variant="outline" size="sm" onClick={onCancel} data-testid={`wizard-participant-list-button-cancel`}>
            <SmallestText>{t('common.cancel')}</SmallestText>
          </Button>
        </div>
      </motion.div>
    );
  };

  const canAddMore = !maxItems || participants.length < maxItems;

  return (
    <div className="space-y-4">
      {participants.length > 0 ? (
        <div className={`flex max-h-64 flex-wrap gap-2 overflow-y-auto ${isAdding ? 'max-h-20' : ''}`}>
          {participants.map(participant => (
            <div
              key={participant.name}
              className="flex overflow-auto min-w-40 items-center justify-between p-3 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark "
            >

              <>
                <div className="flex items-center gap-3 flex-1">
                  {participant.logo && (
                    <img
                      src={participant.logo}
                      alt={participant.name}
                      className="w-10 h-10 rounded-full object-scale-down"
                    />
                  )}
                  <SmallestText className='mr-2'>{participant.name}</SmallestText>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDelete(participant.name)}
                  />
                </div>
              </>
            </div>
          ))}
        </div>
      ) : !isAdding && (
        <div className="text-center py-8 flex items-center justify-center gap-2">
          <Icon icon={Info} size="base" className="text-custom-secondary-light dark:text-custom-secondary-dark" />
          <SmallestText className="text-center py-8 text-custom-secondary-light dark:text-custom-secondary-dark">
            {t('tournamentInit.creation.participants.noParticipantsAdded')}
          </SmallestText>
        </div>
      )}
      <AnimatePresence>
        {isAdding ? (
          <div className="p-3 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark">
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <ParticipantForm
                participant={null}
                onSave={handleAdd}
                onCancel={() => setIsAdding(false)}
              />
            </motion.div>
          </div>
        ) : canAddMore && (
          <Button
            variant="outline"
            icon={Plus}
            iconPosition='right'
            onClick={() => setIsAdding(true)}
            className="w-full"
            data-testid={`wizard-participant-list-button-add`}
          >
            <SmallestText>{t('common.add')}</SmallestText>
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}; 