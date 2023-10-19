import { type NextRequest, NextResponse } from 'next/server';
// utils
import { createI18nRedirect } from '@/modules/internationalization/utils/i18n-middleware.utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getSession } from 'next-auth/react';
import { withAuth } from 'next-auth/middleware';

export default async function middleware(request: NextRequest) {
  // i18n
  const i18nRedirect = createI18nRedirect(request);

  if (i18nRedirect) {
    return i18nRedirect;
  }

  const authCheck = await withAuth({
    secret: process.env.NEXTAUTH_SECRET,
  })(request, NextResponse.next());

  console.log(authCheck);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
