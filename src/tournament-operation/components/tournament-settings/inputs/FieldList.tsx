import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../../common/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Save, Plus, Trash2, Edit } from 'lucide-react';
import { SmallText } from '../../../../common/components/typography/Text';
import { IField, Field } from '../../../types/tournament/Field';
import { v4 as uuidv4 } from 'uuid';

interface FieldListProps {
  id: string;
  value: IField[];
  onChange: (value: IField[]) => void;
  onSave: () => void;
}

export const FieldList: FC<FieldListProps> = ({ value, onChange, onSave }) => {
  const { t } = useTranslation();
  const [fields, setFields] = useState<IField[]>(value);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newFieldName, setNewFieldName] = useState('');

  const handleAddField = () => {
    if (newFieldName.trim()) {
      const newField = new Field(uuidv4(), newFieldName);
      setFields([...fields, newField]);
      setNewFieldName('');
    }
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter(field => field.getId() !== id));
  };

  const handleEditField = (id: string, newName: string) => {
    setFields(fields.map(field => 
      field.getId() === id 
        ? { ...field, name: newName, getName: () => newName, setName: (n: string) => {} } 
        : field
    ));
    setEditingField(null);
  };

  const handleSave = () => {
    onChange(fields);
    onSave();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="max-h-60 overflow-y-auto space-y-2">
        {fields.map(field => (
          <motion.div
            key={field.getId()}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between p-2 rounded-md border border-custom-secondary-light/20 dark:border-custom-secondary-dark/20"
          >
            {editingField === field.getId() ? (
              <input
                type="text"
                value={field.getName()}
                onChange={(e) => handleEditField(field.getId(), e.target.value)}
                className="flex-1 px-2 py-1 text-sm rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
                autoFocus
                onBlur={() => setEditingField(null)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
              />
            ) : (
              <SmallText>{field.getName()}</SmallText>
            )}
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingField(field.getId())}
                icon={Edit}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveField(field.getId())}
                icon={Trash2}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
          placeholder={t('tournamentOperation.settings.addField')}
          className="flex-1 px-4 py-2 text-sm rounded-md border border-custom-secondary-light dark:border-custom-secondary-dark bg-custom-primary-light dark:bg-custom-primary-dark text-custom-secondary-light dark:text-custom-secondary-dark"
          onKeyDown={(e) => e.key === 'Enter' && handleAddField()}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddField}
          icon={Plus}
        />
      </div>

      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSave}
          icon={Save}
        >
          {t('common.save')}
        </Button>
      </div>
    </motion.div>
  );
}; 