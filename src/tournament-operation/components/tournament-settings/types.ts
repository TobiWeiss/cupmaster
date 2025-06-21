import { FC } from 'react';
import { TextInputProps } from './inputs/TextInput';
import { FieldListProps } from './inputs/FieldList';
import { TiebreakerListProps } from './inputs/TiebreakerList';
import { Tournament } from '../../types/tournament/Tournament';

// Define interfaces locally since they're not exported from their respective files
interface SelectInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  options: { value: string; label: string; }[];
}

interface NumberInputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  onCancel: () => void;
  onSave: () => void;
  min?: number;
  max?: number;
  unit?: string;
}

interface DateTimeInputProps {
  id: string;
  value: Date;
  onChange: (value: Date) => void;
  onCancel: () => void;
  onSave: () => void;
}

// New interface for the element renderer pattern
export interface ISettingsElement {
  id: string;
  type: 'text' | 'number' | 'select' | 'datetime' | 'fieldList' | 'tiebreakerList';
  label: string;
  icon?: any;
  editable: boolean;
  getDisplayValue?: (value: any) => string;
  onChange: (tournament: Tournament, value: any) => void;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  unit?: string;
}

export interface BaseSetting {
  id: string;
  label: string;
  icon?: any;
  editable: boolean;
  getDisplayValue: (value: any) => string;
  onChange: (tournament: Tournament, value: any) => void;
  component: FC<TextInputProps | SelectInputProps | NumberInputProps | DateTimeInputProps | FieldListProps | TiebreakerListProps>;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  unit?: string;
}

export interface SettingsCategory {
  id: string;
  title: string;
  settings: BaseSetting[];
} 