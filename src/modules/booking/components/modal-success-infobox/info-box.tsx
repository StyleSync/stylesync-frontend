import { type FC } from 'react';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
// type
import { type InfoBoxProps } from './info-box.interface';

// style
import styles from './info-box.module.scss';
import clsx from 'clsx';

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
