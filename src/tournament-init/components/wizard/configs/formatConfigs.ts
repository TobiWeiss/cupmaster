import { MatchFormat } from '../../../../tournament-operation/types/tournament/MatchFormat';
import { TournamentFormat } from '../../../../tournament-operation/types/tournament/TournamentFormat';
import { IWizardElement } from '../WizardConfig';


export const leagueElements: IWizardElement[] = [
  {
    type: 'number',
    name: 'leagueConfig.matchesAgainstEachParticipant',
    category: 'mode',
    question: 'tournamentInit.creation.questions.matchesAgainstEachParticipantLeague.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 1 && value <= 4,
      message: 'tournamentInit.creation.questions.matchesAgainstEachParticipantLeague.validation'
    },
    showIf: (data) => data.format === TournamentFormat.LEAGUE
  },
  {
    type: 'number',
    name: 'leagueConfig.matchDuration',
    category: 'mode',
    question: 'tournamentInit.creation.questions.matchDurationLeague.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 10 && value <= 120,
      message: 'tournamentInit.creation.questions.matchDurationLeague.validation'
    },
    showIf: (data) => data.format === TournamentFormat.LEAGUE
  },
  {
    type: 'number',
    name: 'leagueConfig.matchBreak',
    category: 'mode',
    question: 'tournamentInit.creation.questions.matchBreakLeague.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 0 && value <= 10,
      message: 'tournamentInit.creation.questions.matchBreakLeague.validation'
    },
    showIf: (data) => data.format === TournamentFormat.LEAGUE
  }
];

export const groupElements: IWizardElement[] = [
  {
    type: 'number',
    name: 'groupConfig.numberOfGroups',
    category: 'mode',
    question: 'tournamentInit.creation.questions.numberOfGroups.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 2 && value <= 8,
      message: 'tournamentInit.creation.questions.numberOfGroups.validation'
    },
    showIf: (data) => data.format === TournamentFormat.GROUP_KNOCKOUT
  },
  {
    type: 'number',
    name: 'groupConfig.teamsQualifying',
    category: 'mode',
    question: 'tournamentInit.creation.questions.teamsQualifying.question',
    required: true,
    showIf: (data) => data.format === TournamentFormat.GROUP_KNOCKOUT
  },
  {
    type: 'number',
    name: 'groupConfig.matchDuration',
    category: 'mode',
    question: 'tournamentInit.creation.questions.matchDurationGroup.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 5 && value <= 120,
      message: 'tournamentInit.creation.questions.matchDuration.validation'
    },
    showIf: (data) => data.format === TournamentFormat.GROUP_KNOCKOUT
  },
  {
    type: 'number',
    name: 'groupConfig.matchBreak',
    category: 'mode',
    question: 'tournamentInit.creation.questions.matchBreakGroup.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 0 && value <= 10,
      message: 'tournamentInit.creation.questions.matchBreak.validation'
    },
    showIf: (data) => data.format === TournamentFormat.GROUP_KNOCKOUT
  }
];

export const knockoutElements: IWizardElement[] = [
  {
    type: 'select',
    name: 'knockoutConfig.legs',
    category: 'mode',
    question: 'tournamentInit.creation.questions.knockoutFormat.question',
    required: true,
    options: [
      { value: MatchFormat.SINGLE_MATCH, label: 'tournamentInit.creation.knockout.format.singleMatch' },
      { value: MatchFormat.HOME_AWAY, label: 'tournamentInit.creation.knockout.format.homeAndAway' }
    ],
    showIf: (data) => [TournamentFormat.KNOCKOUT, TournamentFormat.GROUP_KNOCKOUT].includes(data.format)
  },
  {
    type: 'number',
    name: 'knockoutConfig.matchDuration',
    category: 'mode',
    question: 'tournamentInit.creation.questions.matchDurationKnockout.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 5 && value <= 120,
      message: 'tournamentInit.creation.questions.matchDuration.validation'
    },
    showIf: (data) => [TournamentFormat.KNOCKOUT, TournamentFormat.GROUP_KNOCKOUT].includes(data.format)
  },
  {
    type: 'number',
    name: 'knockoutConfig.matchBreak',
    category: 'mode',
    question: 'tournamentInit.creation.questions.matchBreakKnockout.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 0 && value <= 10,
      message: 'tournamentInit.creation.questions.matchBreak.validation'
    },
    showIf: (data) => [TournamentFormat.KNOCKOUT, TournamentFormat.GROUP_KNOCKOUT].includes(data.format)
  },
  {
    type: 'bool',
    name: 'knockoutConfig.hasThirdPlace',
    category: 'mode',
    question: 'tournamentInit.creation.questions.hasThirdPlace.question',
    showIf: (data) => [TournamentFormat.KNOCKOUT, TournamentFormat.GROUP_KNOCKOUT].includes(data.format)
  }
]; 