import { basicInformationElements } from './configs/basicInformationConfig';
import { dateElements } from './configs/dateConfig';
import { teamElements } from './configs/teamsConfig';
import { leagueElements, groupElements, knockoutElements } from './configs/formatConfigs';


/**
 * Represents a single element in the wizard
 * 
 * @param type - The type of the element
 * @param customComponent - A custom component to render the element, currently only used for the list element
 * @param name - The name of the element
 * @param question - The question to display to the user - holds the translation key (e.g. 'tournamentInit.creation.questions.name.question')
 * @param placeholder - The placeholder text for the element - holds the translation key (e.g. 'tournamentInit.creation.questions.name.placeholder')
 * @param required - Whether the element is required - if not, the user can skip the element
 * @param options - The options for the element - only used for select elements
 * @param validation - The validation rules for the element
 * @param showIf - A function to determine if the element should be shown - if not, the element is hidden
 * @param explanation - An explanation for the element - holds the translation key (e.g. 'tournamentInit.creation.questions.name.explanation')
 */
export interface IWizardElement {
  type: 'text' | 'number' | 'date' | 'select' | 'image' | 'bool' | 'list';
  customComponent?: (props: any) => JSX.Element;
  name: string;
  category: 'basicInformation' | 'tournamentDates' | 'teams' | 'mode' | 'rules'
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


export const elements: IWizardElement[] = [
 
  ...teamElements,
  ...basicInformationElements,
  ...dateElements,
  ...leagueElements,
  ...groupElements,
  ...knockoutElements
];