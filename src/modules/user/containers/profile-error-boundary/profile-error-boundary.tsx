'use client';
import { type FC } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import type { ProfileErrorBoundaryProps } from './profile-error-boundary.interface';
import styles from './profile-error-boundary.module.scss';

export const ProfileErrorBoundary: FC<ProfileErrorBoundaryProps> = ({
  userId,
  children,
}) => {
  const intl = useIntl();
  const { error } = trpc.user.get.useQuery({
    id: userId,
    expand: ['professional'],
  });

  if (error?.data?.code === 'NOT_FOUND') {
    return (
      <div className={clsx(styles.root, 'pageContent')}>
        <div className={styles.container}>
          <Typography variant='body1' weight='medium'>
            {intl.formatMessage({ id: 'frofile.error.boundary.title' })}
          </Typography>
          <Typography variant='body2'>
            {intl.formatMessage({ id: 'frofile.error.boundary.description' })}
          </Typography>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
