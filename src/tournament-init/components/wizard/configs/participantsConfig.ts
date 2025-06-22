import { ListComponentProps, Participant, ParticipantList } from '../element-renderer/elements/specialisations/ParticipantList';
import { IWizardElement } from '../WizardConfig';

export const participantElements: IWizardElement[] = [
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