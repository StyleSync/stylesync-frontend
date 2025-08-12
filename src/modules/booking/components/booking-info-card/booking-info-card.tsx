import { type FC, RefObject, useMemo, useRef } from 'react';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { bookingStatusMetadata } from '@/modules/booking/constants/booking.constants';
import { Avatar } from '@/modules/core/components/avatar';
import { useRipple } from '@/modules/core/hooks/use-ripple';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

import type { BookingInfoCardProps } from './booking-info-card.interface';

export const BookingInfoCard: FC<BookingInfoCardProps> = ({
  booking,
  onClick,
}) => {
  const intl = useIntl();

  // refs
  const rootRef = useRef<HTMLDivElement>(null) as RefObject<HTMLElement>;
  // memo
  const { time } = useMemo(() => {
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
        `relative flex w-full cursor-pointer py-2 pl-[3px] transition md:rounded-lg md:bg-white md:pr-4 md:shadow md:hover:shadow-colour`
      )}
      onClick={() => onClick && onClick(booking)}
    >
      <div className='relative flex w-full items-center rounded-xl py-1'>
        <div className='flex flex-1 flex-col md:flex-row'>
          <div className='flex flex-1 items-center gap-x-4 pl-4'>
            <div className='flex items-center gap-x-4'>
              <Avatar
                fallback={
                  <span className='text-gray-accent'>
                    {booking.guestFirstName[0]}
                  </span>
                }
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-base font-medium text-dark'>
                {`${booking.guestFirstName || ''} ${booking.guestLastName || ''}`}
              </span>
              <span className='text-sm font-normal text-gray-accent'>
                {booking.serviceProfessional.title}
              </span>
            </div>
            <div className='ml-auto flex w-[100px] items-center gap-x-2'>
              <span className='truncate text-sm font-normal text-gray-accent'>
                {time}
              </span>
            </div>
          </div>
        </div>
        <div
          className={clsx(
            'absolute left-0 top-0 h-full w-[2px] rounded-full',
            statusMetadata?.color
          )}
        />
      </div>
    </div>
  );
};
