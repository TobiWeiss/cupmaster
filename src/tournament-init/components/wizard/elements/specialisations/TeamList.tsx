import { useState } from 'react';
import { Button } from '../../../../../common/components/ui/Button';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ListItem {
  name: string;
}

export interface Team extends ListItem {
  logo?: string;
}

export interface ListComponentProps<T extends ListItem> {
  items: T[];
  onChange: (teams:T[]) => void;
  maxItems?: number;
  editingName: string | null;
  isAdding: boolean;
  onSetEditingName: (name: string | null) => void;
  onSetIsAdding: (isAdding: boolean) => void;
}

/**
 * List component for managing teams in the tournament wizard
 */
export const TeamList = ({ 
  items: teams, 
  onChange, 
  maxItems,
  editingName,
  isAdding,
  onSetEditingName,
  onSetIsAdding
}: ListComponentProps<Team>) => {
  const { t } = useTranslation();

  const handleAdd = (newTeam: Team) => {
    onChange([...teams, newTeam]);
    onSetIsAdding(false);
  };

  const handleEdit = (updatedTeam: Team) => {
    onChange(
      teams.map(team => 
        team.name === editingName 
          ? updatedTeam
          : team
      )
    );
    onSetEditingName(null);
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
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={t('tournamentManagement.creation.teams.namePlaceholder')}
          className="flex-1 px-3 py-1 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark"
          autoFocus
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
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
        <div className="flex gap-2">
          <Button type="submit" variant="outline" size="sm">
            {t('common.save')}
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    );
  };

  const canAddMore = !maxItems || teams.length < maxItems;

  return (
    <div className="space-y-4">
      {teams.length > 0 ? (
        <div className="space-y-2">
          {teams.map(team => (
            <div 
              key={team.name} 
              className="flex items-center justify-between p-3 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark "
            >
              {editingName === team.name ? (
                <TeamForm
                  team={team}
                  onSave={handleEdit}
                  onCancel={() => onSetEditingName(null)}
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
                    <span>{team.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Edit2}
                      onClick={() => onSetEditingName(team.name)}
                    />
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
      ) : (
        <div className="text-center py-8">
          {t('tournamentManagement.creation.teams.empty')}
        </div>
      )}

      {isAdding ? (
        <div className="p-3 rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark">
          <TeamForm
            team={null}
            onSave={handleAdd}
            onCancel={() => onSetIsAdding(false)}
          />
        </div>
      ) : canAddMore && (
        <Button
          variant="outline"
          icon={Plus}
          onClick={() => onSetIsAdding(true)}
          className="w-full"
          data-testid={`wizard-team-list-button-add`}
        >
          {t('common.add')}
        </Button>
      )}
    </div>
  );
}; 