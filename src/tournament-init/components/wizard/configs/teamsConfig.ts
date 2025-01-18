import { ListComponentProps, Team, TeamList } from '../elements/specialisations/TeamList';
import { IWizardElement } from './types';

export const teamElements: IWizardElement[] = [
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
  {
    type: 'list',
    name: 'teams',
    customComponent: (props: ListComponentProps<Team>) => TeamList(props),
    question: 'tournamentManagement.creation.questions.teams.question',
    required: false,
    validation: {
      fun: (value: Array<Record<string, string>>) => value.every(team => team.name.length > 0 && team.name.length <= 256),
      message: 'tournamentManagement.creation.questions.teams.validation'
    }
  }
]; 