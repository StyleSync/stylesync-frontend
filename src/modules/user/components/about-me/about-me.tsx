'use client';
import { type FC } from 'react';

import { useIntl } from 'react-intl';

import { Typography } from '@/modules/core/components/typogrpahy';
import { trpc } from '@/modules/core/utils/trpc.utils';

import type { AboutMeProps } from './about-me.interface';

import styles from './about-me.module.scss';

export const AboutMe: FC<AboutMeProps> = ({ userId }) => {
  const intl = useIntl();

  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: ['user'],
  });

  return (
    <div className={styles.root}>
      <Typography className='w-full max-w-[90%]' variant='body2'>
        {professional.about ||
          intl.formatMessage({ id: 'user.about.me.noInfo' })}
      </Typography>
    </div>
  );
};
