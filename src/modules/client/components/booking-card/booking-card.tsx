import { FC, useMemo } from 'react';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { bookingStatusMetadata } from '@/modules/booking/constants/booking.constants';
import { Avatar } from '@/modules/core/components/avatar';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

import type { BookingCardProps } from './booking-card.interface';

export const BookingCard: FC<BookingCardProps> = ({ booking, onClick }) => {
  const intl = useIntl();

  // memo
  const { time } = useMemo(() => {
    return {
      time: `${formatI18n(booking.startTime, 'HH:mm', intl.locale)} - ${formatI18n(booking.endTime, 'HH:mm', intl.locale)}`,
    };
  }, [booking, intl.locale]);

  const statusMetadata = bookingStatusMetadata[booking.status];

  return (
    <div
      onClick={() => onClick && onClick(booking)}
      className='relative flex cursor-pointer items-center gap-2'
    >
      <div className='flex items-center gap-x-4 pl-4'>
        <Avatar
          fallback={
            <span className='text-gray-accent'>
              {booking.guestFirstName[0]}
            </span>
          }
        />
      </div>

      <div>{booking.serviceProfessional.title}</div>

      <div className='ml-auto flex w-[100px] items-center gap-x-2'>
        <span className='truncate text-sm font-normal text-gray-accent'>
          {time}
        </span>
      </div>

      <div
        className={clsx(
          'absolute left-0 top-0 h-full w-[2px] rounded-full',
          statusMetadata?.color
        )}
      />
    </div>
  );
};
