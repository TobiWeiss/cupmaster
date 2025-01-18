import { IWizardElement } from "../WizardConfig";


export const dateElements: IWizardElement[] = [
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
    type: 'bool',
    name: 'multipleDays',
    question: 'tournamentManagement.creation.questions.multipleDays.question',
    required: true,
    validation: {
      fun: (value: boolean) => value !== undefined,
      message: 'tournamentManagement.creation.questions.multipleDays.validation'
    }
  },
  {
    type: 'date',
    name: 'endDate',
    question: 'tournamentManagement.creation.questions.endDate.question',
    showIf: (data: any) => data.multipleDays,
    validation: {
      fun: (value: string) => value.length > 0,
      message: 'tournamentManagement.creation.questions.endDate.validation'
    }
  }
]; 