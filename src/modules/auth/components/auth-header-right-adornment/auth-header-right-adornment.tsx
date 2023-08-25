'use client';
import { type FC, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// components
import { Button, Typography } from '@/modules/core/components';

import styles from './auth-header-right-adornment.module.scss';
import { useIntl } from 'react-intl';

export const AuthHeaderRightAdornment: FC = () => {
  const intl = useIntl();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignUpClick = useCallback(() => {
    router.push('/auth/sign-up');
  }, [router]);

  const handleSignInClick = useCallback(() => {
    router.push('/auth/sign-in');
  }, [router]);

  return (
    <div className={styles.root}>
      {pathname.includes('/auth/sign-in') ? (
        <>
          <Typography className={styles.text}>
            {intl.formatMessage({ id: 'signIn.header.signUpDescription' })}
          </Typography>
          <Button
            text={intl.formatMessage({ id: 'general.actions.signUp' })}
            onClick={handleSignUpClick}
            variant='secondary'
          />
        </>
      ) : (
        <>
          <Typography className={styles.text}>
            {intl.formatMessage({ id: 'signUp.header.signInDescription' })}
          </Typography>
          <Button
            text={intl.formatMessage({ id: 'general.actions.signIn' })}
            onClick={handleSignInClick}
            variant='secondary'
          />
        </>
      )}
    </div>
  );
};
