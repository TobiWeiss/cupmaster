import { FC, useState } from 'react';
import { Participant } from '../../../tournament-init/types/tournament';
import { Button } from '../../../common/components/ui/Button';
import { Save, X, Upload } from 'lucide-react';
import { SmallText } from '../../../common/components/typography/Text';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ParticipantFormProps {
  participant?: Participant | null;
  onSave: (participant: Participant) => void;
  onCancel: () => void;
}

export const ParticipantForm: FC<ParticipantFormProps> = ({
  participant,
  onSave,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState(participant?.name || '');
  const [contact, setContact] = useState(participant?.contact || '');
  const [logo, setLogo] = useState(participant?.logo || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: participant?.id || crypto.randomUUID(),
      name,
      contact,
      logo,
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="space-y-4">
        <div>
          <SmallText>{t('tournamentOperation.participants.form.name')}</SmallText>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark"
            required
          />
        </div>

        <div>
          <SmallText>{t('tournamentOperation.participants.form.contact')}</SmallText>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark"
          />
        </div>

        <div>
          <SmallText>{t('tournamentOperation.participants.form.logo')}</SmallText>
          <div className="flex items-center gap-4">
            {logo && (
              <img
                src={logo}
                alt="Preview"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <Button
              type="button"
              variant="outline"
              icon={Upload}
              onClick={() => document.getElementById('logo')?.click()}
            >
              {t('tournamentOperation.participants.form.uploadLogo')}
            </Button>
            <input
              type="file"
              id="logo"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
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
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" icon={X} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="outline" icon={Save}>
          Save
        </Button>
      </div>
    </motion.form>
  );
}; 