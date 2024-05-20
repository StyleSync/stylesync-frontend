import type { Locale as AppLocale } from '@/modules/internationalization/types/i18n.types';
import type { Locale } from 'date-fns';
import { enUS, uk } from 'date-fns/locale';

export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'uk'],
} as const;

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
export const dictionaries = {
  en: () =>
    import('@/modules/internationalization/dictionaries/en.json').then(
      (module) => module.default
    ),
  uk: () =>
    import('@/modules/internationalization/dictionaries/uk.json').then(
      (module) => module.default
    ),
};

export const dateFnsLocales: Record<AppLocale, Locale> = {
  en: enUS,
  uk,
};
