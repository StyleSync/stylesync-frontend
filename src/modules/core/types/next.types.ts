import type { Locale } from '@/modules/internationalization/types/i18n.types';

export type PageParams<T extends object = {}> = {
  params: T & { lang: Locale };
};
