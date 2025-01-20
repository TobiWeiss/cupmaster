import { useState } from 'react';
import { Button } from '../../../../../../common/components/ui/Button';
import { Plus, Trash2, Edit2, Info, Save, X, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SmallestText } from '../../../../../../common/components/typography/Text';
import { Icon } from '../../../../../../common/components/ui/Icon';
import { easeInOut, motion } from 'framer-motion';

interface ListItem {
  name: string;
}

export interface Team extends ListItem {
  logo?: string;
}

export interface ListComponentProps<T extends ListItem> {
  items: T[];
  onChange: (teams: T[]) => void;
  maxItems?: number;
}

/**
 * List component for managing teams in the tournament wizard
 */
export const TeamList = ({
  items: teams,
  onChange,
  maxItems,
}: ListComponentProps<Team>) => {
  const { t } = useTranslation();
  const [isAdding, setIsAdding] = useState(false);
  const [editingName, setEditingName] = useState<string | null>(null);



  const handleAdd = (newTeam: Team) => {
    onChange([...teams, newTeam]);
  };

  const handleEdit = (updatedTeam: Team) => {
    onChange(
      teams.map(team =>
        team.name === editingName
          ? updatedTeam
          : team
      )
    );
    setEditingName(null);
  };

  const handleDelete = (name: string) => {
    onChange(teams.filter(team => team.name !== name));
  };

  const TeamForm = ({
    team,
    onSave,
    onCancel
  }: {
    team: Team | null;
    onSave: (team: Team) => void;
    onCancel: () => void;
  }) => {
    const [name, setName] = useState(team?.name || '');
    const [logo, setLogo] = useState(team?.logo || '');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ name, logo });
    };

    return (
      <motion.div   initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: easeInOut } }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: easeInOut } }} className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={t('tournamentInit.creation.teams.namePlaceholder')}
          className="w-full px-4 py-2 pr-10 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark placeholder-custom-secondary-light dark:placeholder-custom-secondary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
          autoFocus
        />
        <div className="flex items-center gap-2">
          {logo && (
            <img
              src={logo}
              alt="Preview"
              className="w-8 h-8 rounded-full object-cover mr-2"
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
          <Button onClick={handleSubmit} icon={Save} iconPosition='right' variant="outline" size="sm">
            <SmallestText>{t('common.save')}</SmallestText>
          </Button>
          <Button type="button" icon={X} iconPosition='right' variant="outline" size="sm" onClick={onCancel}>
            <SmallestText>{t('common.cancel')}</SmallestText>
          </Button>
        </div>
      </motion.div>
    );
  };

  const canAddMore = !maxItems || teams.length < maxItems;

  return (
    <div className="space-y-4">
      {teams.length > 0 ? (
        <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto">
          {teams.map(team => (
            <div
              key={team.name}
              className="flex min-w-80 items-center justify-between p-3 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark "
            >
              {editingName === team.name ? (
                <TeamForm
                  team={team}
                  onSave={handleEdit}
                  onCancel={() => setEditingName(null)}
                />
              ) : (
                <>
                  <div className="flex items-center gap-3 flex-1">
                    {team.logo && (
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <SmallestText className='mr-2'>{team.name}</SmallestText>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Trash2}
                      onClick={() => handleDelete(team.name)}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : !isAdding && (
        <div className="text-center py-8 flex items-center justify-center gap-2">
          <Icon icon={Info} size="base" className="text-custom-secondary-light dark:text-custom-secondary-dark" />
          <SmallestText className="text-center py-8 text-custom-secondary-light dark:text-custom-secondary-dark">
            {t('tournamentInit.creation.teams.noTeamsAdded')}
          </SmallestText>
        </div>
      )}

      {isAdding ? (
        <div className="p-3 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark">
          <TeamForm
            team={null}
            onSave={handleAdd}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      ) : canAddMore && (
        <Button
          variant="outline"
          icon={Plus}
          iconPosition='right'
          onClick={() => setIsAdding(true)}
          className="w-full"
          data-testid={`wizard-team-list-button-add`}
        >
          <SmallestText>{t('common.add')}</SmallestText>
        </Button>
      )}
    </div>
  );
}; 