import { SettingsElementProps } from '../ElementRenderer';
import { TextElement } from './TextElement';
import { NumberElement } from './NumberElement';
import { SelectElement } from './SelectElement';
import { DateTimeElement } from './DateTimeElement';
import { FieldListElement } from './FieldListElement';
import { TiebreakerListElement } from './TiebreakerListElement';

type FieldType = 'text' | 'number' | 'select' | 'datetime' | 'fieldList' | 'tiebreakerList';

type FieldRegistryType = {
  [K in FieldType]: React.ComponentType<SettingsElementProps>;
};

export const fieldRegistry: FieldRegistryType = {
  text: TextElement,
  number: NumberElement,
  select: SelectElement,
  datetime: DateTimeElement,
  fieldList: FieldListElement,
  tiebreakerList: TiebreakerListElement
}; 