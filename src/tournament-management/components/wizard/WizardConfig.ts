import { TournamentFormat, MatchFormat } from '../../types/enums';

export interface IWizardField {
  type: 'text' | 'number' | 'date' | 'select' | 'image' | 'checkbox';
  name: string;
  question: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    fun: (value: any) => boolean;
    message?: string;
  };
  showIf?: (data: any) => boolean;
  explanation?: string;
}

export const wizardFields: IWizardField[] = [
  // Basic Information
  {
    type: 'text',
    name: 'name',
    question: 'tournamentManagement.creation.questions.name.question',
    explanation: 'tournamentManagement.creation.questions.name.explanation',
    required: true,
    validation: {
      fun: (value: string) => value.length > 0 && value.length <= 256,
      message: 'tournamentManagement.creation.questions.name.validation'
    }
  },
  {
    type: 'image',
    name: 'logoUrl',
    question: 'tournamentManagement.creation.questions.logo.question',
    validation: {
      fun: (value: string) => !value || value.startsWith('data:image/'),
      message: 'tournamentManagement.creation.questions.logo.validation'
    }
  },
  {
    type: 'select',
    name: 'format',
    question: 'tournamentManagement.creation.questions.format.question',
    required: true,
    options: [
      { value: TournamentFormat.LEAGUE, label: 'tournamentManagement.creation.basicInformation.formats.league' },
      { value: TournamentFormat.GROUP_KNOCKOUT, label: 'tournamentManagement.creation.basicInformation.formats.groupKnockout' },
      { value: TournamentFormat.KNOCKOUT, label: 'tournamentManagement.creation.basicInformation.formats.knockout' }
    ],
    validation: {
      fun: (value: string) => value.length > 0,
      message: 'tournamentManagement.creation.questions.format.validation'
    }
  },

  // Dates
  {
    type: 'date',
    name: 'startDate',
    question: 'tournamentManagement.creation.questions.startDate.question',
    required: true,
    validation: {
      fun: (value: string) => value.length > 0,
      message: 'tournamentManagement.creation.questions.startDate.validation'
    }
  },
  {
    type: 'date',
    name: 'endDate',
    question: 'tournamentManagement.creation.questions.endDate.question',
    validation: {
      fun: (value: string) => value.length > 0,
      message: 'tournamentManagement.creation.questions.endDate.validation'
    }
  },

  // Teams
  {
    type: 'number',
    name: 'numberOfTeams',
    question: 'tournamentManagement.creation.questions.numberOfTeams.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 2 && value <= 64,
      message: 'tournamentManagement.creation.questions.numberOfTeams.validation'
    }
  },

  // League specific
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
  },

  // Group specific
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
  },

  // Knockout specific
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
    type: 'checkbox',
    name: 'knockoutConfig.hasThirdPlace',
    question: 'tournamentManagement.creation.questions.hasThirdPlace.question',
    showIf: (data) => [TournamentFormat.KNOCKOUT, TournamentFormat.GROUP_KNOCKOUT].includes(data.format)
  }
]; 