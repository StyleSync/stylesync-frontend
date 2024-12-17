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
  onClose,
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

          onClose();
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
      <div className='flex min-h-[calc(178px+1rem)] flex-col'>
        <Placeholder
          isActive={bookingSlotsToRescheduleQuery.isInitialLoading}
          placeholder={<Spinner size='medium' />}
        >
          <Placeholder
            isActive={bookingAvailableSlots.length === 0}
            placeholder={
              <span className='text-sm text-gray-accent'>
                {intl.formatMessage({
                  id: 'booking.timeSelect.noAvailableTime',
                })}
              </span>
            }
          >
            <div className='flex flex-col gap-y-4'>
              <span className='text-xs text-gray-accent'>
                {intl.formatMessage({
                  id: 'booking.schedule.availableSlots',
                })}
                :
              </span>
              <div className='grid gap-2 [grid-template-columns:repeat(auto-fill,_minmax(120px,1fr))] [grid-template-rows:max-content]'>
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
            </div>
          </Placeholder>
        </Placeholder>
        <div className='mt-auto flex items-center justify-end gap-x-4'>
          <Button
            text={intl.formatMessage({ id: 'button.cancel' })}
            variant='secondary'
            className='flex-1 md:flex-[unset]'
            onClick={onClose}
          />
          <Button
            className='flex-1 md:flex-[unset]'
            text={intl.formatMessage({ id: 'button.save' })}
            onClick={handleDateUpdate}
            isLoading={bookingReschedule.isLoading}
            disabled={!selectedSlot}
          />
        </div>
      </div>
    </div>
  );
};
