import { type FC } from 'react';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
// type
import { type InfoBoxProps } from './info-box.interface';

// style
import styles from './info-box.module.scss';

export const InfoBox: FC<InfoBoxProps> = ({ title, content }) => {
  return (
    <div className={styles.box}>
      <Typography className={styles.title} variant='body1'>
        {title}
      </Typography>
      <Typography className={styles.infoContent} variant='body1'>
        {content}
      </Typography>
    </div>
  );
};
