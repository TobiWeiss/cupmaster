import { TournamentFormat, MatchFormat } from '../../../types/enums';
import { IWizardElement } from './types';

export const leagueElements: IWizardElement[] = [
  {
    type: 'number',
    name: 'leagueConfig.matchesAgainstEachTeam',
    question: 'tournamentManagement.creation.questions.matchesAgainstEachTeam.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 1 && value <= 4,
      message: 'tournamentManagement.creation.questions.matchesAgainstEachTeam.validation'
    },
    showIf: (data) => data.format === TournamentFormat.LEAGUE
  },
  {
    type: 'number',
    name: 'leagueConfig.matchDuration',
    question: 'tournamentManagement.creation.questions.matchDuration.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 10 && value <= 120,
      message: 'tournamentManagement.creation.questions.matchDuration.validation'
    },
    showIf: (data) => data.format === TournamentFormat.LEAGUE
  }
];

export const groupElements: IWizardElement[] = [
  {
    type: 'number',
    name: 'groupConfig.numberOfGroups',
    question: 'tournamentManagement.creation.questions.numberOfGroups.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 2 && value <= 8,
      message: 'tournamentManagement.creation.questions.numberOfGroups.validation'
    },
    showIf: (data) => data.format === TournamentFormat.GROUP_KNOCKOUT
  },
  {
    type: 'number',
    name: 'groupConfig.teamsQualifying',
    question: 'tournamentManagement.creation.questions.teamsQualifying.question',
    required: true,
    showIf: (data) => data.format === TournamentFormat.GROUP_KNOCKOUT
  },
  {
    type: 'number',
    name: 'groupConfig.matchDuration',
    question: 'tournamentManagement.creation.questions.matchDuration.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 10 && value <= 120,
      message: 'tournamentManagement.creation.questions.matchDuration.validation'
    },
    showIf: (data) => data.format === TournamentFormat.GROUP_KNOCKOUT
  }
];

export const knockoutElements: IWizardElement[] = [
  {
    type: 'select',
    name: 'knockoutConfig.legs',
    question: 'tournamentManagement.creation.questions.knockoutFormat.question',
    required: true,
    options: [
      { value: MatchFormat.SINGLE_MATCH, label: 'tournamentManagement.creation.knockout.format.singleMatch' },
      { value: MatchFormat.HOME_AWAY, label: 'tournamentManagement.creation.knockout.format.homeAndAway' }
    ],
    showIf: (data) => [TournamentFormat.KNOCKOUT, TournamentFormat.GROUP_KNOCKOUT].includes(data.format)
  },
  {
    type: 'number',
    name: 'knockoutConfig.matchDuration',
    question: 'tournamentManagement.creation.questions.matchDuration.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 10 && value <= 120,
      message: 'tournamentManagement.creation.questions.matchDuration.validation'
    },
    showIf: (data) => [TournamentFormat.KNOCKOUT, TournamentFormat.GROUP_KNOCKOUT].includes(data.format)
  },
  {
    type: 'bool',
    name: 'knockoutConfig.hasThirdPlace',
    question: 'tournamentManagement.creation.questions.hasThirdPlace.question',
    showIf: (data) => [TournamentFormat.KNOCKOUT, TournamentFormat.GROUP_KNOCKOUT].includes(data.format)
  }
]; 