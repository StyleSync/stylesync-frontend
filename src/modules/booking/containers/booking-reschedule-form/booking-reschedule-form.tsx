import { type FC, useMemo, useState } from 'react';
import { isPast } from 'date-fns';
import { useIntl } from 'react-intl';
import { getQueryKey } from '@trpc/react-query';

// components
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';
import { BookingSlotCard } from '@/modules/booking/components/booking-slot-card';
import { Button } from '@/modules/core/components/button';
import { DateSlider } from '@/modules/core/components/date-slider';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { mapDateToDayEnum } from '@/modules/core/utils/date.utils';
// types
import type { BookingRescheduleFormProps } from './booking-reschedule-form.interface';
import { type AvailableBookingTime } from '@/server/types';
import { showToast } from '@/modules/core/providers/toast-provider';
import { useQueryClient } from '@tanstack/react-query';

export const BookingRescheduleForm: FC<BookingRescheduleFormProps> = ({
  bookingId,
  onOpenChange,
}) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  // state
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableBookingTime | null>(
    null
  );
  // queries
  const bookingReschedule = trpc.booking.reschedule.useMutation();
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

  const handleDateUpdate = () => {
    bookingReschedule.mutate(
      {
        startTime: selectedSlot?.startTime || '',
        endTime: selectedSlot?.endTime || '',
        date: selectedDate || '',
        bookingId,
        day: mapDateToDayEnum(selectedDate || ''),
      },
      {
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: intl.formatMessage({ id: 'booking.reschedule.toast.title' }),
            description: intl.formatMessage({
              id: 'booking.reschedule.toast.descr',
            }),
          });

          const queryKey = trpc.booking.get.getQueryKey({
            id: bookingId,
            expand: ['serviceProfessional'],
          });

          const listQueryKey = getQueryKey(trpc.booking.list);

          queryClient.invalidateQueries(queryKey);

          queryClient.invalidateQueries(listQueryKey);

          onOpenChange(false);
        },
      }
    );
  };

  // memo
  const bookingAvailableSlots = useMemo(() => {
    if (bookingSlotsToRescheduleQuery.data) {
      return bookingSlotsToRescheduleQuery.data.filter(
        (timeSlot) => !isPast(new Date(timeSlot.startTime))
      );
    }

    return [];
  }, [bookingSlotsToRescheduleQuery.data]);

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
        <div className='flex flex-wrap gap-2'>
          {bookingAvailableSlots.map((slot, index) => (
            <BookingSlotCard
              key={index}
              isActive={
                selectedSlot?.startTime === slot.startTime &&
                selectedSlot.endTime === slot.endTime
              }
              startTime={slot.startTime}
              endTime={slot.endTime}
              onClick={() => setSelectedSlot(slot)}
            />
          ))}
        </div>
      </Placeholder>
      <Button
        onClick={handleDateUpdate}
        className='ml-auto mt-6'
        text={intl.formatMessage({ id: 'button.save' })}
        isLoading={bookingReschedule.isLoading}
        disabled={!selectedSlot}
      />
    </div>
  );
};
