import { ListComponentProps, Team, TeamList } from '../element-renderer/elements/specialisations/TeamList';
import { IWizardElement } from './types';

export const teamElements: IWizardElement[] = [
  {
    type: 'number',
    name: 'numberOfTeams',
    category: 'teams',
    question: 'tournamentInit.creation.questions.numberOfTeams.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 2 && value <= 64,
      message: 'tournamentInit.creation.questions.numberOfTeams.validation'
    }
  },
  {
    type: 'list',
    name: 'teams',
    category: 'teams',
    customComponent: (props: ListComponentProps<Team>) => TeamList(props),
    question: 'tournamentInit.creation.questions.teams.question',
    required: false,
    validation: {
      fun: (value: Array<Record<string, string>>) => value.every(team => team.name.length > 0 && team.name.length <= 256),
      message: 'tournamentInit.creation.questions.teams.validation'
    }
  }
]; 