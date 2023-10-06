'use client';
import { type FC } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/navigation';
// components
import { Icon } from '@/modules/core/components/icon';
import { Button } from '@/modules/core/components/button';
import { Divider } from '@/modules/core/components/divider';
import { LocaleSwitcher } from '@/modules/internationalization/components/locale-select';
import { Typography } from '@/modules/core/components/typogrpahy';
// types
import type { Locale } from '@/modules/internationalization/types/i18n.types';

import type { IndexPreviewProps } from './index-preview.interface';
import styles from './index-preview.module.scss';
import { Spinner } from '@/modules/core/components/spinner';
import { Placeholder } from '@/modules/core/components/placeholder';

export const IndexPreview: FC<IndexPreviewProps> = () => {
  const session = useSession();
  const intl = useIntl();
  const router = useRouter();

  return (
    <div className={styles.root}>
      <Icon name='stylesync-logo' width='20%' />
      <Divider className={styles.divider} variant='horizontal'>
        Auth
      </Divider>
      <div className={styles.block}>
        <Placeholder
          isActive={session.status === 'loading'}
          placeholder={<Typography>Session loading ...</Typography>}
        >
          {session.status === 'unauthenticated' ? (
            <Button
              variant='outlined'
              text='Sign in'
              onClick={async () => {
                await signIn(
                  'auth0',
                  { callbackUrl: 'http://localhost:3000/uk/app/profile' },
                  { prompt: 'login' }
                );
              }}
            />
          ) : (
            <>
              <Typography>{session.data?.user?.email}</Typography>
              <div style={{ display: 'flex', columnGap: 8 }}>
                <Button
                  variant='primary'
                  text='Open profile'
                  onClick={() => {
                    router.push('/app/profile');
                  }}
                />
                <Button
                  variant='outlined'
                  text='Sign out'
                  onClick={async () => {
                    await signOut();
                  }}
                />
              </div>
            </>
          )}
        </Placeholder>
      </div>
      <Divider className={styles.divider} variant='horizontal'>
        Language
      </Divider>
      <div className={styles.block}>
        <LocaleSwitcher locale={intl.locale as Locale} />
      </div>
    </div>
  );
};
