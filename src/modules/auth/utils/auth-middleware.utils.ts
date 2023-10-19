import { NextResponse, type NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';

const protectedPages: string[] = ['/app/profile'];

export const createAuthRedirect = async (
  request: NextRequest
): Promise<NextResponse | null> => {
  const pathname = request.nextUrl.pathname;
  const isProtectedPage = Boolean(
    protectedPages.find((protectedPage) => pathname.endsWith(protectedPage))
  );

  if (isProtectedPage) {
    const authCheck = await withAuth({
      secret: process.env.NEXTAUTH_SECRET,
    })(request, NextResponse.next());

    // authCheck(request);

    // console.log(authCheck);
    // if (!authCheck?.ok) {
    //   return NextResponse.redirect('http://localhost:3000/en');
    // }
  }

  return null;
};
