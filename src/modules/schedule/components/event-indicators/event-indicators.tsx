import { type FC } from 'react';

import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { type BookingStatus } from '@prisma/client';
import { isSameDay } from 'date-fns';

import { bookingStatusMetadata } from '@/modules/booking/constants/booking.constants';

import { type EventIndicatorsProps } from './event-indicators.inerface';

export const EventIndicators: FC<EventIndicatorsProps> = (props) => {
  const { day, events, outsideCurrentMonth } = props;

  const dayEvents = events.items.filter((event: any) =>
    isSameDay(new Date(event.startTime), day)
  );

  const statuses = dayEvents.map((event) => event.status);
  const uniqStatuses = Array.from(new Set(statuses));

  return (
    <div className='relative'>
      <PickersDay {...props} />
      {!outsideCurrentMonth && dayEvents.length > 0 && (
        <div className='absolute bottom-[5px] mt-1 flex w-full justify-center gap-[2px]'>
          {uniqStatuses.map((status: string) => {
            const statusMetadata =
              bookingStatusMetadata[status as BookingStatus];

            return (
              <div
                key={status}
                className={`h-[4px] w-[4px] rounded-full ${statusMetadata?.color} `}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
