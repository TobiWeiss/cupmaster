import { WizardElementProps } from '../ElementRenderer';
import { BooleanElement } from './BooleanElement';
import { DateElement } from './DateElement';
import { ImageField } from './ImageField';
import { ListElement } from './ListElement';
import { NumberElement } from './NumberElement';
import { SelectElement } from './SelectElement';
import { TextElement } from './TextElement';


type FieldType = 'text' | 'number' | 'date' | 'select' | 'bool' | 'image' | 'list';

type FieldRegistryType = {
    [key in FieldType]: React.ComponentType<WizardElementProps>;
};

export const fieldRegistry: FieldRegistryType = {
    text: TextElement,
    number: NumberElement,
    date: DateElement,
    select: SelectElement,
    bool: BooleanElement,
    image: ImageField,
    list: ListElement
};