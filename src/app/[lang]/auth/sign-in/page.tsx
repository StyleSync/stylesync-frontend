'use client';
import { useEffect } from 'react';

import { useParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Page() {
  const params = useParams();

  useEffect(() => {
    signIn('auth0', {
      callbackUrl: '/app/profile',
      ui_locales: params.lang as string,
    });
  }, []);

  return null;
}
