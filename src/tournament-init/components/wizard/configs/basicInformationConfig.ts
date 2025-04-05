import { TournamentFormat } from '../../../../tournament-operation/types/tournament/TournamentFormat';
import { IWizardElement } from '../WizardConfig';

export const basicInformationElements: IWizardElement[] = [
  {
    type: 'text',
    name: 'name',
    category: 'basicInformation',
    question: 'tournamentInit.creation.questions.name.question',
    explanation: 'tournamentInit.creation.questions.name.explanation',
    required: true,
    validation: {
      fun: (value: string) => value.length > 0 && value.length <= 256,
      message: 'tournamentInit.creation.questions.name.validation'
    }
  },
  {
    type: 'image',
    name: 'logoUrl',
    category: 'basicInformation',
    question: 'tournamentInit.creation.questions.logo.question',
    validation: {
      fun: (value: string) => !value || value.startsWith('data:image/'),
      message: 'tournamentInit.creation.questions.logo.validation'
    }
  },
  {
    type: 'select',
    name: 'format',
    category: 'basicInformation',
    question: 'tournamentInit.creation.questions.format.question',
    required: true,
    options: [
      { value: TournamentFormat.LEAGUE, label: 'tournamentInit.creation.basicInformation.formats.league' },
      { value: TournamentFormat.GROUP_KNOCKOUT, label: 'tournamentInit.creation.basicInformation.formats.groupKnockout' },
      { value: TournamentFormat.KNOCKOUT, label: 'tournamentInit.creation.basicInformation.formats.knockout' }
    ],
    validation: {
      fun: (value: string) => value.length > 0,
      message: 'tournamentInit.creation.questions.format.validation'
    }
  },
  {
    type: 'number', 
    name: 'fields',
    category: 'basicInformation',
    question: 'tournamentInit.creation.questions.fields.question',
    required: false,
    validation: {
      fun: (value: number) => value > 0,
      message: 'tournamentInit.creation.questions.fields.validation'
    }
  }
]; 