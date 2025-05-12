import { dictionaries } from '@/modules/internationalization/constants/i18n.constants';
import type { Locale } from '@/modules/internationalization/types/i18n.types';

import 'server-only';

export const getDictionary = async (locale: Locale) => {
  if (locale in dictionaries) {
    return dictionaries[locale]();
  }

  return dictionaries.en();
};
