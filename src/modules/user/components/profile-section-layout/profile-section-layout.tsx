'use client';
import { type FC } from 'react';

import { useIntl } from 'react-intl';

import { Typography } from '@/modules/core/components/typogrpahy';

import type { ProfileSectionLayoutProps } from './profile-section-layout.interface';

import styles from './profile-section-layout.module.scss';

export const ProfileSectionLayout: FC<ProfileSectionLayoutProps> = ({
  children,
  title,
  id,
}) => {
  const intl = useIntl();

  return (
    <section className={styles.root} id={id}>
      <Typography className={styles.title} As='h2' variant='subtitle'>
        {intl.formatMessage({ id: title })}
      </Typography>
      {children}
    </section>
  );
};
