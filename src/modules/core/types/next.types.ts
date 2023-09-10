import type { Locale } from '@/modules/internationalization/types/i18n.types';
import type { Session } from 'next-auth';

export type PageParams<T extends object = {}> = {
  params: T & { lang: Locale; session: Session | null };
};
