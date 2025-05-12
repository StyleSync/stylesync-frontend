import { type FC } from 'react';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { bookingStatusMetadata } from '@/modules/booking/constants/booking.constants';

import type { BookingStatusProps } from './booking-status.interface';

export const BookingStatus: FC<BookingStatusProps> = ({ status }) => {
  const intl = useIntl();
  const { title, color } = bookingStatusMetadata[status];

  return (
    <div className='flex shrink-0 items-center gap-x-2'>
      <div className={clsx('h-4 w-4 shrink-0 rounded-full shadow', color)} />
      <span className='truncate text-sm font-medium text-dark'>
        {intl.formatMessage({ id: title })}
      </span>
    </div>
  );
};
