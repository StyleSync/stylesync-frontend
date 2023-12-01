import { type FC } from 'react';

import type { ProfileSectionLayoutProps } from './profile-section-layout.interface';
import styles from './profile-section-layout.module.scss';
import { Typography } from '@/modules/core/components/typogrpahy';

export const ProfileSectionLayout: FC<ProfileSectionLayoutProps> = ({
  children,
  title,
  id,
}) => {
  return (
    <section className={styles.root} id={id}>
      <Typography className={styles.title} As='h2' variant='subtitle'>
        {title}
      </Typography>
      {children}
    </section>
  );
};
