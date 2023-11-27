import { type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';

import type { BreakTagsProps } from './break-tags.interface';
import styles from './break-tags.module.scss';

export const BreakTags: FC<BreakTagsProps> = ({ breaks, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className={styles.breakSkeleton}>
        <div className='skeleton' />
      </div>
    );
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!breaks || breaks.length === 0) {
    return <Typography>No breaks</Typography>;
  }

  return breaks.map(({ timerange }, index) => (
    <div key={index} className={styles.tag}>
      <Typography variant='small' weight='medium'>
        {timerange}
      </Typography>
    </div>
  ));
};
