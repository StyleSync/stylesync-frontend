import { type FC, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
// hooks
import { useRipple } from '@/modules/core/hooks/use-ripple';
// utils
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
// constants
import { bookingStatusMetadata } from '@/modules/booking/constants/booking.constants';
// components
import { Icon } from '@/modules/core/components/icon';
import { BookingStatus } from '@/modules/booking/components/booking-status';

import type { BookingInfoCardProps } from './booking-info-card.interface';

export const BookingInfoCard: FC<BookingInfoCardProps> = ({
  booking,
  onClick,
}) => {
  const intl = useIntl();
  // refs
  const rootRef = useRef<HTMLDivElement>(null);
  // memo
  const { day, month, time } = useMemo(() => {
    return {
      day: formatI18n(booking.startTime, 'dd', intl.locale),
      month: formatI18n(booking.startTime, 'MMM', intl.locale).replace('.', ''),
      time: `${formatI18n(booking.startTime, 'HH:mm', intl.locale)} - ${formatI18n(booking.endTime, 'HH:mm', intl.locale)}`,
    };
  }, [booking, intl.locale]);

  useRipple(rootRef);

  const statusMetadata = bookingStatusMetadata[booking.status];

  return (
    <div
      className={clsx(
        'flex cursor-pointer rounded-xl pl-[3px] shadow transition hover:shadow-colour',
        statusMetadata?.color
      )}
      onClick={() => onClick && onClick(booking)}
    >
      <div className='flex w-full items-center rounded-xl bg-white py-4 pr-6'>
        <div className='flex w-[90px] flex-col items-center gap-y-1 border-r border-gray-light py-1'>
          <span className='text-text text-2xl font-medium'>{day}</span>
          <span className='text-text text-base font-normal capitalize'>
            {month}
          </span>
        </div>
        <div className='flex flex-1 flex-col md:flex-row'>
          <div className='flex flex-1 flex-col gap-y-2 pl-6'>
            <span className='text-base'>
              {booking.serviceProfessional.title}
            </span>
            <div className='flex flex-col gap-y-2 md:hidden'>
              <BookingStatus status={booking.status} />
              <div className='flex items-center gap-x-2'>
                <Icon
                  name='time'
                  className='h-4 w-4 shrink-0 text-gray-accent'
                />
                <span className='truncate text-sm text-gray-accent'>
                  {time}
                </span>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              <Icon name='user' className='h-4 w-4 text-gray-accent' />
              <span className='text-sm text-gray-accent'>
                {`${booking.guestFirstName || ''} ${booking.guestLastName || ''}`}
              </span>
            </div>
          </div>
          <div className='ml-6 hidden flex-col-reverse gap-y-1 md:flex md:flex-col md:items-end md:gap-y-2'>
            <BookingStatus status={booking.status} />
            <div className='flex items-center gap-x-2'>
              <Icon name='time' className='h-4 w-4 shrink-0 text-gray-accent' />
              <span className='truncate text-sm text-gray-accent'>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
