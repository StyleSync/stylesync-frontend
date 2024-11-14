import { type FC, useMemo, useState } from 'react';

import type { BookingRescheduleFormProps } from './booking-reschedule-form.interface';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { DateSlider } from '@/modules/core/components/date-slider';
import {
  generateDates,
  mapDateToDayEnum,
} from '@/modules/core/utils/date.utils';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';
import { isPast } from 'date-fns';
import { BookingSlotCard } from '@/modules/booking/components/booking-slot-card';

export const BookingRescheduleForm: FC<BookingRescheduleFormProps> = ({
  bookingId,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const bookingSlotsToRescheduleQuery =
    trpc.booking.available.reschedule.useQuery(
      {
        date: selectedDate || '',
        bookingId,
        day: mapDateToDayEnum(selectedDate || ''),
        dayTime: new Date(selectedDate || '').getDate(),
        monthTime: new Date(selectedDate || '').getMonth(),
        yearTime: new Date(selectedDate || '').getFullYear(),
      },
      { enabled: !!selectedDate, retry: false }
    );
  // memo
  const bookingAvailableSlots = useMemo(() => {
    if (bookingSlotsToRescheduleQuery.data) {
      return bookingSlotsToRescheduleQuery.data.filter(
        (timeSlot) => !isPast(new Date(timeSlot.startTime))
      );
    }

    return [];
  }, [bookingSlotsToRescheduleQuery.data]);

  console.log(bookingSlotsToRescheduleQuery);

  return (
    <div className='relative flex flex-col gap-y-4 pt-6'>
      <div>
        <DateSlider
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
        />
      </div>
      <Placeholder
        isActive={bookingSlotsToRescheduleQuery.isInitialLoading}
        placeholder={<Spinner size='medium' />}
      >
        <div>
          {bookingAvailableSlots.map((slot, index) => (
            <BookingSlotCard
              key={index}
              isActive={false}
              startTime={slot.startTime}
              endTime={slot.endTime}
              onClick={() => {}}
            />
          ))}
        </div>
      </Placeholder>
    </div>
  );
};
