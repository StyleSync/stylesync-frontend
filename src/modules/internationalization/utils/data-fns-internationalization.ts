import { format } from 'date-fns';

import { dateFnsLocales } from '@/modules/internationalization/constants/i18n.constants';
import type { Locale as AppLocale } from '@/modules/internationalization/types/i18n.types';

export const formatI18n = (date: Date | number, f: string, local: string) => {
  return format(date, f, {
    locale: dateFnsLocales[local as AppLocale],
  });
};
