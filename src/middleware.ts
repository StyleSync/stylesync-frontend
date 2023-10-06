import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// utils
import { createI18nRedirect } from '@/modules/internationalization/utils/i18n-middleware.utils';

export async function middleware(request: NextRequest) {
  const i18nRedirect = createI18nRedirect(request);

  if (i18nRedirect) {
    return i18nRedirect;
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.endsWith('/app')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = new URL(`/`, request.url);

      url.searchParams.set('callbackUrl ', encodeURI(request.url));

      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
