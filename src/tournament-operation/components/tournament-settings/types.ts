import { FC } from 'react';
import { TournamentFormat } from '../../types/tournament/TournamentFormat';
import { Field } from '../../types/tournament/Field';
import { TextInputProps } from './inputs/TextInput';
import { SelectInputProps } from './inputs/SelectInput';
import { FieldListProps } from './inputs/FieldList';
import { DateTimeInputProps } from './inputs/DateTimeInput';
import { NumberInputProps } from './inputs/NumberInput';
import { TiebreakerListProps } from './inputs/TiebreakerList';
import { Tournament } from '../../types/tournament/Tournament';

export type SettingComponent = FC<TextInputProps | SelectInputProps | FieldListProps | DateTimeInputProps | NumberInputProps | TiebreakerListProps>;

export interface SettingOption {
  value: string | number;
  label: string;
}

export interface BaseSetting {
  id: string;
  label: string;
  icon?: any;
  editable: boolean;
  component?: SettingComponent;
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
  min?: number;
  max?: number;
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