import { ALargeSmall, Network, Map, Clock, Binary, ListOrdered } from 'lucide-react';
import { TournamentFormat, TournamentPhase } from '../../types/tournament/TournamentFormat';
import { TextInput } from './inputs/TextInput';
import { SelectInput } from './inputs/SelectInput';
import { FieldList } from './inputs/FieldList';
import { DateTimeInput } from './inputs/DateTimeInput';
import { NumberInput } from './inputs/NumberInput';
import { TiebreakerList } from './inputs/TiebreakerList';
import { SettingsCategory } from './types';
import { Field } from '../../types/tournament/Field';
import { Tournament } from '../../types/tournament/Tournament';
import { Tiebreaker } from '../../types/tournament/Tiebreaker';
import { TournamentNameTooLongException, InvalidDateException, InvalidNumberException, TooFewFieldsException } from './exceptions';

const formatUTCDate = (date: Date) => {
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return `${localDate.toLocaleDateString()} ${localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

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
          maxLength: 50,
          minLength: 3,
          getDisplayValue: (value: string) => value,
          onChange: (tournament: Tournament, value: string) => {
            if (value.length > 50) {
              throw new TournamentNameTooLongException(50);
            }
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
            if (value.length < 1) {
              throw new TooFewFieldsException();
            }
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
            if (value < new Date()) {
              throw new InvalidDateException('Start date must be in the future');
            }
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
            if (value < tournament.getStartDate()!) {
              throw new InvalidDateException('End date must be after start date');
            }
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
      min: 1,
      max: 4,
      getDisplayValue: (value: number) => value.toString(),
      onChange: (tournament: Tournament, value: number) => {
        if (value < 1 || value > 4) {
          throw new InvalidNumberException('Matches against each participant must be between 1 and 4');
        }
        tournament.setMatchesAgainstEachParticipant(value, tournament.getFormat(), tournament.getPhases()[0]);
      }
    },
    {
      id: 'matchDuration',
      label: t('tournamentOperation.settings.categories.format.matchDuration'),
      icon: Clock,
      editable: true,
      component: NumberInput,
      min: 5,
      max: 90,
      unit: t('common.minutes'),
      getDisplayValue: (value: number) => `${value} ${t('common.minutes')}`,
      onChange: (tournament: Tournament, value: number) => {
        if (value < 5 || value > 90) {
          throw new InvalidNumberException('Match duration must be between 5 and 90 minutes');
        }
        tournament.setMatchDuration(value, tournament.getFormat(), tournament.getPhases()[0]);
      }
    },
    {
      id: 'matchBreakDuration',
      label: t('tournamentOperation.settings.categories.format.matchBreakDuration'),
      icon: Clock,
      editable: true,
      component: NumberInput,
      min: 0,
      max: 30,
      unit: t('common.minutes'),
      getDisplayValue: (value: number) => `${value} ${t('common.minutes')}`,
      onChange: (tournament: Tournament, value: number) => {
        if (value < 0 || value > 30) {
          throw new InvalidNumberException('Match break duration must be between 0 and 30 minutes');
        }
        tournament.setMatchBreakDuration(value, tournament.getFormat(), tournament.getPhases()[0]);
      }
    },
    {
      id: 'pointsForWin',
      label: t('tournamentOperation.settings.categories.format.pointsForWin'),
      icon: Binary,
      editable: true,
      component: NumberInput,
      min: 1,
      max: 5,
      getDisplayValue: (value: number) => value.toString(),
      onChange: (tournament: Tournament, value: number) => {
        if (value < 1 || value > 5) {
          throw new InvalidNumberException('Points for win must be between 1 and 5');
        }
        tournament.setPointsForWin(value, tournament.getFormat(), tournament.getPhases()[0]);
      }
    },
    {
      id: 'pointsForDraw',
      label: t('tournamentOperation.settings.categories.format.pointsForDraw'),
      icon: Binary,
      editable: true,
      component: NumberInput,
      min: 0,
      max: 3,
      getDisplayValue: (value: number) => value.toString(),
      onChange: (tournament: Tournament, value: number) => {
        if (value < 0 || value > 3) {
          throw new InvalidNumberException('Points for draw must be between 0 and 3');
        }
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
