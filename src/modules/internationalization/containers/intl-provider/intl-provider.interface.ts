import type { ChildrenProp } from '@/modules/core/types/react.types';
import type {
  Dictionary,
  Locale,
} from '@/modules/internationalization/types/i18n.types';

export type IntlProviderProps = ChildrenProp & {
  locale: Locale;
  dictionary: Dictionary;
};
