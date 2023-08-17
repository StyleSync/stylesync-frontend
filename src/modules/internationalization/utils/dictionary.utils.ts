import 'server-only';
// constants
import { dictionaries } from '@/modules/internationalization/constants/i18n.constants';
// types
import type { Locale } from '@/modules/internationalization/types/i18n.types';

export const getDictionary = async (locale: Locale) => {
  if (locale in dictionaries) {
    return dictionaries[locale]();
  }

  return dictionaries.en();
};
