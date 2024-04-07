'use client';
import { type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

import styles from './about-me.module.scss';

export const AboutMe: FC<{ userId: string }> = ({ userId }) => {
  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: ['user'],
  });

  return (
    <div className={styles.root}>
      <Typography className='w-full max-w-[90%]' variant='body2'>
        {professional.about || 'No information'}
      </Typography>
    </div>
  );
};
