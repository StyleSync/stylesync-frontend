import { type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Avatar } from '@/modules/core/components/avatar';
// type
import type { BookingPreviewDetailProps } from './booking-preview-detail-box.interface';

export const BookingPreviewDetailBox: FC<BookingPreviewDetailProps> = ({
  label,
  value,
  avatar,
}) => (
  <div className='flex flex-col gap-3'>
    <Typography variant='small' className='!text-gray'>
      {label}
    </Typography>
    <div className='flex gap-4 items-center'>
      {avatar && <Avatar url={avatar} />}
      <Typography variant='body1' weight='medium' className='!text-dark'>
        {value}
      </Typography>
    </div>
  </div>
);
