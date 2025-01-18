import { TournamentFormat } from '../../../types/enums';
import { IWizardElement } from './types';

export const basicInformationElements: IWizardElement[] = [
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
  }
]; 