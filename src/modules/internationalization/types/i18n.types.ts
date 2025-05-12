import type {
  dictionaries,
  i18nConfig,
} from '@/modules/internationalization/constants/i18n.constants';

export type Locale = (typeof i18nConfig)['locales'][number];

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;
