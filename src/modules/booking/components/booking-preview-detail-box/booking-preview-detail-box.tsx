import { type FC } from 'react';

import { Avatar } from '@/modules/core/components/avatar';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { BookingPreviewDetailProps } from './booking-preview-detail-box.interface';

export const BookingPreviewDetailBox: FC<BookingPreviewDetailProps> = ({
  label,
  value,
  avatar,
}) => (
  <div className='flex flex-col gap-3'>
    <Typography variant='body2' className='!text-gray' weight='medium'>
      {label}
    </Typography>
    <div className='flex w-full items-center gap-4'>
      {avatar && <Avatar url={avatar} />}
      <Typography
        variant='body1'
        weight='medium'
        className='!flex !flex-nowrap !text-dark'
      >
        {value}
      </Typography>
    </div>
  </div>
);
