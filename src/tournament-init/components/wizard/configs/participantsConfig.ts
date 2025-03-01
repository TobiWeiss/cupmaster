import { ListComponentProps, Participant, ParticipantList } from '../element-renderer/elements/specialisations/ParticipantList';
import { IWizardElement } from '../WizardConfig';

export const participantElements: IWizardElement[] = [
  {
    type: 'number',
    name: 'numberOfParticipants',
    category: 'participants',
    question: 'tournamentInit.creation.questions.numberOfParticipants.question',
    required: true,
    validation: {
      fun: (value: number) => value >= 2 && value <= 64,
      message: 'tournamentInit.creation.questions.numberOfParticipants.validation'
    }
  },
  {
    type: 'list',
    name: 'participants',
    category: 'participants',
    customComponent: (props: ListComponentProps<Participant>) => ParticipantList(props),
    question: 'tournamentInit.creation.questions.participants.question',
    required: false,
    validation: {
      fun: (value: Array<Record<string, string>>) => value.every(participant => participant.name.length > 0 && participant.name.length <= 256),
      message: 'tournamentInit.creation.questions.participants.validation'
    }
  }
]; 