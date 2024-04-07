import type { FC } from 'react';
import { Avatar } from '@/modules/core/components/avatar';
import { Typography } from '@/modules/core/components/typogrpahy';
import { getFullName } from '@/modules/user/utils/user.utils';
import styles from '@/modules/user/containers/professional-info-big-card/professional-info-big-card.module.scss';

import type { UserDataProps } from '../professional-info-big-card.interface';

export const UserData: FC<UserDataProps> = ({ professional }) => {
  return (
    <div className='flex items-center gap-x-4 gap-y-4'>
      <Avatar
        className='!bg-black/5'
        url={professional.user.avatar}
        size='medium'
        shape='circle'
        shadow
      />
      <div className='flex flex-col gap-y-2'>
        <Typography className='!text-white' variant='title' weight='medium'>
          {getFullName(professional.user)}
        </Typography>
        <div className={styles.proBadge}>
          <Typography variant='small' weight='medium'>
            STYLE PRO
          </Typography>
        </div>
      </div>
    </div>
  );
};
