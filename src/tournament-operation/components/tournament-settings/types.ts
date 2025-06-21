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

interface DateTimeInputProps {
  id: string;
  value: Date;
  onSave: (value: Date) => void;
  onCancel: () => void;
}

interface NumberInputProps {
  id: string;
  value: number;
  onSave: (value: number) => void;
  onCancel: () => void;
  unit?: string;
}

export interface SettingOption {
  value: string | number;
  label: string;
}

export interface BaseSetting {
  id: string;
  label: string;
  icon?: any;
  editable: boolean;
  getDisplayValue: (value: any) => string;
  onChange: (tournament: Tournament, value: any) => void;
}

export interface TextSetting extends BaseSetting {
  component: FC<TextInputProps>;
}

export interface SelectSetting extends BaseSetting {
  component: FC<SelectInputProps>;
  options: SettingOption[];
}

export interface NumberSetting extends BaseSetting {
  component: FC<NumberInputProps>;
  unit?: string;
}

export interface FieldListSetting extends BaseSetting {
  component: FC<FieldListProps>;
}

export interface DateTimeSetting extends BaseSetting {
  component: FC<DateTimeInputProps>;
}

export interface TiebreakerListSetting extends BaseSetting {
  component: FC<TiebreakerListProps>;
}

export type Setting = TextSetting | SelectSetting | NumberSetting | FieldListSetting | DateTimeSetting | TiebreakerListSetting;

export interface SettingsCategory {
  id: string;
  title: string;
  settings: Setting[];
} 