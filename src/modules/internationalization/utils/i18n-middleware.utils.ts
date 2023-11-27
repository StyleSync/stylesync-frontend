import { type NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
// constants
import { i18nConfig } from '@/modules/internationalization/constants/i18n.constants';
// types
import type { Locale } from '@/modules/internationalization/types/i18n.types';

function getRecommendedLocale(request: NextRequest): string {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};

  // @ts-ignore
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = [...i18nConfig.locales];

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  return matchLocale(languages, locales, i18nConfig.defaultLocale);
}

const getPathnameLocale = (pathname: string): Locale | null => {
  return (
    i18nConfig.locales.find(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    ) || null
  );
};

const getCookiesLocale = (request: NextRequest): string | null => {
  const locales: string[] = [...i18nConfig.locales];
  const localeCookies = request.cookies.get('locale');

  if (!localeCookies) {
    return null;
  }

  if (!locales.includes(localeCookies.value)) {
    return null;
  }

  return localeCookies.value;
};

export const createI18nRedirect = (
  request: NextRequest
): NextResponse | null => {
  const pathname = request.nextUrl.pathname;
  const cookiesLocale = getCookiesLocale(request);
  const pathnameLocale = getPathnameLocale(pathname);
  const recommendedLocale = getRecommendedLocale(request);

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  if (
    ['/manifest.json', '/favicon.ico', '/next.svg', '/vercel.svg'].includes(
      pathname
    )
  ) {
    return null;
  }

  const targetLocale = cookiesLocale || recommendedLocale;

  if (!pathnameLocale) {
    return NextResponse.redirect(
      new URL(
        `/${targetLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  if (pathnameLocale !== targetLocale) {
    return NextResponse.redirect(
      new URL(
        `/${targetLocale}${
          pathname.startsWith('/') ? '' : '/'
        }${pathname.replace(pathnameLocale, '')}`,
        request.url
      )
    );
  }

  return null;
};
