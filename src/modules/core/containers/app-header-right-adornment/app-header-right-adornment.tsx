'use client';
import { type FC } from 'react';
import { signIn, useSession } from 'next-auth/react';
// components
import { Button } from '@/modules/core/components/button';
// containers
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';

import type { AppHeaderRightAdornmentProps } from './app-header-right-adornment.interface';
import styles from './app-header-right-adornment.module.scss';

export const AppHeaderRightAdornment: FC<AppHeaderRightAdornmentProps> = () => {
  const session = useSession();

  if (session.status === 'authenticated') {
    return <UserMenuBadge />;
  }

  if (session.status === 'unauthenticated') {
    return (
      <Button
        variant='secondary'
        text='Sign in'
        onClick={async () => {
          await signIn(
            'auth0',
            { callbackUrl: 'http://localhost:3000/uk/app/profile' },
            { prompt: 'login' }
          );
        }}
      />
    );
  }

  return null;
};
