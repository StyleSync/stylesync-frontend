import type {
  Dictionary,
  Locale,
} from '@/modules/internationalization/types/i18n.types';
import type { ChildrenProp } from '@/modules/core/types/react.types';

export type IntlProviderProps = ChildrenProp & {
  locale: Locale;
  dictionary: Dictionary;
};
