import { type NextRequest } from 'next/server';
// utils
import { createI18nRedirect } from '@/modules/internationalization/utils/i18n-middleware.utils';

export function middleware(request: NextRequest) {
  const i18nRedirect = createI18nRedirect(request);

  if (i18nRedirect) {
    return i18nRedirect;
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|static|manifest|icons|full-logo.png|favicon.ico).*)',
  ],
};
