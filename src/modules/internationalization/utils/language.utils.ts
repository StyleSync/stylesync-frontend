import { setCookie } from 'cookies-next';
import { addYears } from 'date-fns';

import type { Locale } from '@/modules/internationalization/types/i18n.types';

export const saveLocale = (locale: Locale) => {
  setCookie('locale', locale, {
    expires: addYears(Date.now(), 1),
    path: '/',
  });
};

export const getLocalePathname = (locale: Locale, pathname: string): string => {
  if (!pathname) {
    return '/';
  }

  const segments = pathname.split('/');

  segments[1] = locale;

  return segments.join('/');
};
