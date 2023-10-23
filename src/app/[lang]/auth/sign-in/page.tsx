'use client';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function Page() {
  useEffect(() => {
    signIn('auth0', { callbackUrl: '/app/profile' }, { prompt: 'login' });
  }, []);

  return null;
}
