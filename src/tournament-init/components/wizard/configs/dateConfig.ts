import { IWizardElement } from "../WizardConfig";


export const dateElements: IWizardElement[] = [
  {
    type: 'date',
    name: 'startDate',
    category: 'tournamentDates',
    question: 'tournamentInit.creation.questions.startDate.question',
    required: true,
    validation: {
      fun: (value: string) => value.length > 0,
      message: 'tournamentInit.creation.questions.startDate.validation'
    }
  },
  {
    type: 'bool',
    name: 'multipleDays',
    category: 'tournamentDates',
    question: 'tournamentInit.creation.questions.multipleDays.question',
    required: true,
    validation: {
      fun: (value: boolean) => value !== undefined,
      message: 'tournamentInit.creation.questions.multipleDays.validation'
    }
  },
  {
    type: 'date',
    name: 'endDate',
    category: 'tournamentDates',
    question: 'tournamentInit.creation.questions.endDate.question',
    showIf: (data: any) => data.multipleDays,
    validation: {
      fun: (value: string) => value.length > 0,
      message: 'tournamentInit.creation.questions.endDate.validation'
    }
  }
]; 