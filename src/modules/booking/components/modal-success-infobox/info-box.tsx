import { type FC } from 'react';

import clsx from 'clsx';

import { Typography } from '@/modules/core/components/typogrpahy';

import { type InfoBoxProps } from './info-box.interface';

import styles from './info-box.module.scss';

export const InfoBox: FC<InfoBoxProps> = ({ title, content, status }) => {
  return (
    <div className={styles.box}>
      <Typography className={styles.title} variant='body1'>
        {title}
      </Typography>
      <Typography
        className={clsx(styles.infoContent, {
          [styles.requested]: status === 'PENDING',
          [styles.success]: status === 'APPROVED',
        })}
        variant='body1'
      >
        {content}
      </Typography>
    </div>
  );
};
