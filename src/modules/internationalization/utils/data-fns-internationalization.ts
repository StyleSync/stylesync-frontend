import { format } from 'date-fns';
import type { Locale as AppLocale } from '@/modules/internationalization/types/i18n.types';
import { dateFnsLocales } from '@/modules/internationalization/constants/i18n.constants';

export const formatI18n = (date: Date, f: string, local: string) => {
  return format(date, f, {
    locale: dateFnsLocales[local as AppLocale],
  });
};
