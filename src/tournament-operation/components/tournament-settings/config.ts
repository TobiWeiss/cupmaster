import { ALargeSmall, Network, Map, Clock, Binary, ListOrdered } from 'lucide-react';
import { TournamentFormat, TournamentPhase } from '../../types/tournament/TournamentFormat';
import { TextInput } from './inputs/TextInput';
import { SelectInput } from './inputs/SelectInput';
import { FieldList } from './inputs/FieldList';
import { DateTimeInput } from './inputs/DateTimeInput';
import { NumberInput } from './inputs/NumberInput';
import { TiebreakerList } from './inputs/TiebreakerList';
import { SettingsCategory, ISettingsElement } from './types';
import { Field } from '../../types/tournament/Field';
import { Tournament } from '../../types/tournament/Tournament';
import { Tiebreaker } from '../../types/tournament/Tiebreaker';

const formatUTCDate = (date: Date) => {
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return `${localDate.toLocaleDateString()} ${localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

// New function for element renderer pattern
export const createSettingsElements = (t: (key: string) => string): ISettingsElement[] => {
  const formatOptions = [
    { value: TournamentFormat.LEAGUE, label: t('tournamentOperation.settings.categories.basic.formats.league') },
    { value: TournamentFormat.KNOCKOUT, label: t('tournamentOperation.settings.categories.basic.formats.knockout') },
    { value: TournamentFormat.GROUP_KNOCKOUT, label: t('tournamentOperation.settings.categories.basic.formats.groupKnockout') }
  ];

  const elements: ISettingsElement[] = [
    // Basic settings
    {
      id: 'name',
      type: 'text',
      label: t('tournamentOperation.settings.categories.basic.tournamentName'),
      icon: ALargeSmall,
      editable: true,
      getDisplayValue: (value: string) => value,
      onChange: (tournament: Tournament, value: string) => {
        tournament.setName(value);
      }
    },
    {
      id: 'format',
      type: 'select',
      label: t('tournamentOperation.settings.categories.basic.format'),
      icon: Network,
      editable: true,
      options: formatOptions,
      getDisplayValue: (value: TournamentFormat) => formatOptions.find(opt => opt.value === value)?.label || '',
      onChange: (tournament: Tournament, value: TournamentFormat) => {
        setTournamentTypeAndPhases(tournament, value);
      }
    },
    {
      id: 'fields',
      type: 'fieldList',
      label: t('tournamentOperation.settings.categories.basic.numberOfFields'),
      icon: Map,
      editable: true,
      getDisplayValue: (value: Field[]) => value.map(field => field.getName()).join(', '),
      onChange: (tournament: Tournament, value: Field[]) => {
        tournament.setFields(value);
      }
    },
    // Date settings
    {
      id: 'startDate',
      type: 'datetime',
      label: t('tournamentOperation.settings.categories.dates.startDate'),
      icon: Clock,
      editable: true,
      getDisplayValue: formatUTCDate,
      onChange: (tournament: Tournament, value: Date) => {
        tournament.setStartDate(value);
      }
    },
    {
      id: 'endDate',
      type: 'datetime',
      label: t('tournamentOperation.settings.categories.dates.endDate'),
      icon: Clock,
      editable: false,
      getDisplayValue: formatUTCDate,
      onChange: (tournament: Tournament, value: Date) => {
        tournament.setEndDate(value);
      }
    }
  ];

  return elements;
};

export const createLeagueFormatElements = (t: (key: string) => string): ISettingsElement[] => [
  {
    id: 'matchesAgainstEachParticipant',
    type: 'number',
    label: t('tournamentOperation.settings.categories.format.matchesAgainstEachParticipant'),
    icon: Binary,
    editable: true,
    unit: t('common.games'),
    min: 1,
    max: 4,
    getDisplayValue: (value: number) => `${value} ${t('common.games')}`,
    onChange: (tournament: Tournament, value: number) => {
      tournament.setMatchesAgainstEachParticipant(value, tournament.getFormat(), tournament.getPhases()[0]);
    }
  },
  {
    id: 'matchDuration',
    type: 'number',
    label: t('tournamentOperation.settings.categories.format.matchDuration'),
    icon: Clock,
    editable: true,
    unit: t('common.minutes'),
    min: 5,
    max: 90,
    getDisplayValue: (value: number) => `${value} ${t('common.minutes')}`,
    onChange: (tournament: Tournament, value: number) => {
      tournament.setMatchDuration(value, tournament.getFormat(), tournament.getPhases()[0]);
    }
  },
  {
    id: 'matchBreakDuration',
    type: 'number',
    label: t('tournamentOperation.settings.categories.format.matchBreakDuration'),
    icon: Clock,
    editable: true,
    unit: t('common.minutes'),
    min: 0,
    max: 10,
    getDisplayValue: (value: number) => `${value} ${t('common.minutes')}`,
    onChange: (tournament: Tournament, value: number) => {
      tournament.setMatchBreakDuration(value, tournament.getFormat(), tournament.getPhases()[0]);
    }
  },
  {
    id: 'pointsForWin',
    type: 'number',
    label: t('tournamentOperation.settings.categories.format.pointsForWin'),
    icon: Binary,
    editable: true,
    unit: t('common.points'),
    min: 1,
    max: 10,
    getDisplayValue: (value: number) => `${value} ${t('common.points')}`,
    onChange: (tournament: Tournament, value: number) => {
      tournament.setPointsForWin(value, tournament.getFormat(), tournament.getPhases()[0]);
    }
  },
  {
    id: 'pointsForDraw',
    type: 'number',
    label: t('tournamentOperation.settings.categories.format.pointsForDraw'),
    icon: Binary,
    editable: true,
    unit: t('common.points'),
    min: 0,
    max: 5,
    getDisplayValue: (value: number) => `${value} ${t('common.points')}`,
    onChange: (tournament: Tournament, value: number) => {
      tournament.setPointsForDraw(value, tournament.getFormat(), tournament.getPhases()[0]);
    }
  },
  {
    id: 'tiebreakers',
    type: 'tiebreakerList',
    label: t('tournamentOperation.settings.categories.format.tiebreakers'),
    icon: ListOrdered,
    editable: true,
    getDisplayValue: (value: string[]) => value.map(val => t('tournamentOperation.settings.tiebreakers.' + val)).join(', '),
    onChange: (tournament: Tournament, value: string[]) => {
      tournament.setTiebreakers(value.map(val => Tiebreaker[val as keyof typeof Tiebreaker]), tournament.getFormat(), tournament.getPhases()[0]);
    }
  }
];

// Keep the old functions for backward compatibility
export const createSettingsConfig = (t: (key: string) => string) => {
  const formatOptions = [
    { value: TournamentFormat.LEAGUE, label: t('tournamentOperation.settings.categories.basic.formats.league') },
    { value: TournamentFormat.KNOCKOUT, label: t('tournamentOperation.settings.categories.basic.formats.knockout') },
    { value: TournamentFormat.GROUP_KNOCKOUT, label: t('tournamentOperation.settings.categories.basic.formats.groupKnockout') }
  ];

  const categories: SettingsCategory[] = [
    {
      id: 'basic',
      title: t('tournamentOperation.settings.categories.basic.title'),
      settings: [
        {
          id: 'name',
          icon: ALargeSmall,
          label: t('tournamentOperation.settings.categories.basic.tournamentName'),
          editable: true,
          component: TextInput,
          getDisplayValue: (value: string) => value,
          onChange: (tournament: Tournament, value: string) => {
            tournament.setName(value);
          }
        },
        {
          id: 'format',
          icon: Network,
          label: t('tournamentOperation.settings.categories.basic.format'),
          editable: true,
          component: SelectInput,
          options: formatOptions,
          getDisplayValue: (value: TournamentFormat) => formatOptions.find(opt => opt.value === value)?.label || '',
          onChange: (tournament: Tournament, value: TournamentFormat) => {
            setTournamentTypeAndPhases(tournament, value);
          }
        },
        {
          id: 'fields',
          icon: Map,
          label: t('tournamentOperation.settings.categories.basic.numberOfFields'),
          editable: true,
          component: FieldList,
          getDisplayValue: (value: Field[]) => value.map(field => field.getName()).join(', '),
          onChange: (tournament: Tournament, value: Field[]) => {
            tournament.setFields(value);
          }
        }
      ]
    },
    {
      id: 'dates',
      title: t('tournamentOperation.settings.categories.dates.title'),
      settings: [
        {
          id: 'startDate',
          icon: Clock,
          label: t('tournamentOperation.settings.categories.dates.startDate'),
          editable: true,
          component: DateTimeInput,
          getDisplayValue: formatUTCDate,
          onChange: (tournament: Tournament, value: Date) => {
            tournament.setStartDate(value);
          }
        },
        {
          id: 'endDate',
          icon: Clock,
          label: t('tournamentOperation.settings.categories.dates.endDate'),
          component: DateTimeInput,
          editable: false,
          getDisplayValue: formatUTCDate,
          onChange: (tournament: Tournament, value: Date) => {
            tournament.setEndDate(value);
          }
        }
      ]
    }
  ];

  return categories;
};

export const createLeagueFormatSettings = (t: (key: string) => string): SettingsCategory => ({
  id: 'leagueFormat',
  title: t('tournamentOperation.settings.categories.format.title'),
  settings: [
    {
      id: 'matchesAgainstEachParticipant',
      label: t('tournamentOperation.settings.categories.format.matchesAgainstEachParticipant'),
      icon: Binary,
      editable: true,
      component: NumberInput,
      unit: t('common.games'),
      getDisplayValue: (value: number) => `${value} ${t('common.games')}`,
      onChange: (tournament: Tournament, value: number) => {
        tournament.setMatchesAgainstEachParticipant(value, tournament.getFormat(), tournament.getPhases()[0]);
      }
    },
    {
      id: 'matchDuration',
      label: t('tournamentOperation.settings.categories.format.matchDuration'),
      icon: Clock,
      editable: true,
      component: NumberInput,
      unit: t('common.minutes'),
      getDisplayValue: (value: number) => `${value} ${t('common.minutes')}`,
      onChange: (tournament: Tournament, value: number) => {
        tournament.setMatchDuration(value, tournament.getFormat(), tournament.getPhases()[0]);
      }
    },
    {
      id: 'matchBreakDuration',
      label: t('tournamentOperation.settings.categories.format.matchBreakDuration'),
      icon: Clock,
      editable: true,
      component: NumberInput,
      unit: t('common.minutes'),
      getDisplayValue: (value: number) => `${value} ${t('common.minutes')}`,
      onChange: (tournament: Tournament, value: number) => {
        tournament.setMatchBreakDuration(value, tournament.getFormat(), tournament.getPhases()[0]);
      }
    },
    {
      id: 'pointsForWin',
      label: t('tournamentOperation.settings.categories.format.pointsForWin'),
      icon: Binary,
      editable: true,
      component: NumberInput,
      unit: t('common.points'),
      getDisplayValue: (value: number) => `${value} ${t('common.points')}`,
      onChange: (tournament: Tournament, value: number) => {
        tournament.setPointsForWin(value, tournament.getFormat(), tournament.getPhases()[0]);
      }
    },
    {
      id: 'pointsForDraw',
      label: t('tournamentOperation.settings.categories.format.pointsForDraw'),
      icon: Binary,
      editable: true,
      component: NumberInput,
      unit: t('common.points'),
      getDisplayValue: (value: number) => `${value} ${t('common.points')}`,
      onChange: (tournament: Tournament, value: number) => {
        tournament.setPointsForDraw(value, tournament.getFormat(), tournament.getPhases()[0]);
      }
    },
    {
      id: 'tiebreakers',
      label: t('tournamentOperation.settings.categories.format.tiebreakers'),
      icon: ListOrdered,
      editable: true,
      component: TiebreakerList,
      getDisplayValue: (value: string[]) => value.map(val => t('tournamentOperation.settings.tiebreakers.' + val)).join(', '),
      onChange: (tournament: Tournament, value: string[]) => {
        tournament.setTiebreakers(value.map(val => Tiebreaker[val as keyof typeof Tiebreaker]), tournament.getFormat(), tournament.getPhases()[0]);
      }
    }
  ]
}); 

/**
   * Sets tournament type and phases based on format
   */
const setTournamentTypeAndPhases = (tournament: Tournament, format: TournamentFormat): void  => {
  let phases: TournamentPhase[] = [];

  switch (format) {
    case TournamentFormat.LEAGUE:
      phases = [];
      break;
    case TournamentFormat.KNOCKOUT:
      phases = [TournamentPhase.KNOCKOUT_STAGE];
      break;
    case TournamentFormat.GROUP_KNOCKOUT:
      phases = [TournamentPhase.GROUP_STAGE, TournamentPhase.KNOCKOUT_STAGE];
      break;
  }

  tournament.setType(format, phases);
}
