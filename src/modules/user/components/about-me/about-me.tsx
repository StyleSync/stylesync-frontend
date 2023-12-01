'use client';
import type { FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
import { ErrorBox } from '@/modules/core/components/error-box';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

import styles from './about-me.module.scss';

export const AboutMe: FC = () => {
  const { data: me, ...meQuery } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  return (
    <div className={styles.root}>
      <Placeholder
        isActive={meQuery.isLoading}
        className={styles.skeleton}
        placeholder={
          <>
            <div className='skeleton' />
            <div className='skeleton' />
            <div className='skeleton' />
          </>
        }
      >
        <Placeholder
          isActive={meQuery.isError}
          placeholder={
            <ErrorBox
              title='Connection with server has been interrupted'
              description='Please check your internet connection or try refreshing the page. If the issue persists, please contact our support team for assistance.'
            />
          }
        >
          <Placeholder
            className={styles.empty}
            isActive={!me?.professional?.about}
            placeholder={<Typography>No information</Typography>}
          >
            <Typography className={styles.description} variant='body2'>
              {me?.professional?.about}
            </Typography>
          </Placeholder>
        </Placeholder>
      </Placeholder>
    </div>
  );
};
