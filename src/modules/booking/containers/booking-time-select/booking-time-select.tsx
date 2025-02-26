import { type FC, useMemo, useRef } from 'react';

import clsx from 'clsx';
import { addDays, isPast } from 'date-fns';
import { useIntl } from 'react-intl';
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react';

import { BookingSlotCard } from '@/modules/booking/components/booking-slot-card';
import { BookingTimeSelectNavigation } from '@/modules/booking/components/booking-time-select-navigation';
import type { BookingTimeSelectProps } from '@/modules/booking/containers/booking-time-select/booking-time-select.interface';
import { Spinner } from '@/modules/core/components/spinner';
import { Typography } from '@/modules/core/components/typogrpahy';
import {
  generateDates,
  mapDateToDayEnum,
} from '@/modules/core/utils/date.utils';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

import 'swiper/scss';
import 'swiper/scss/navigation';

import styles from './booking-time-select.module.scss';
import { AvailableBookingTime } from '@/server/types';

export const BookingTimeSelect: FC<BookingTimeSelectProps> = ({
  selectedDay,
  setSelectedDay,
  selectedTimeRange,
  setSelectedTimeRange,
  serviceOnProfessionalId,
}) => {
  const intl = useIntl();
  const swiperRef = useRef<SwiperRef>(null);

  const bookingData = trpc.booking.available.list.useQuery(
    {
      date: selectedDay || '',
      serviceOnProfessionalId: serviceOnProfessionalId || '',
      day: mapDateToDayEnum(selectedDay || ''),
      dayTime: new Date(selectedDay || '').getDate(),
      monthTime: new Date(selectedDay || '').getMonth(),
      yearTime: new Date(selectedDay || '').getFullYear(),
    },
    {
      enabled: !!selectedDay && !!serviceOnProfessionalId,
      retry: false,
    }
  );

  const handleDayChoose = (date: string) => {
    setSelectedDay(date);
    setSelectedTimeRange(null);
  };

  const bookingAvailableTimes = useMemo(() => {
    if (bookingData.data) {
      return bookingData.data.filter(
        (timeSlot) => !isPast(new Date(timeSlot.startTime))
      );
    }

    return [];
  }, [bookingData]);

  const generatedDates = useMemo(() => {
    return generateDates();
  }, []);

  const groupedSlots = useMemo(() => {
    const groups = bookingAvailableTimes.reduce<
      { hour: number; slots: AvailableBookingTime[] }[]
    >((acc, item) => {
      const hour = new Date(item.startTime).getHours();
      const existingGroup = acc.find((el) => el.hour === hour);

      if (existingGroup) {
        existingGroup.slots.push(item);
      } else {
        acc.push({ slots: [], hour });
      }

      return acc;
    }, []);

    return groups;
  }, [bookingAvailableTimes]);

  return (
    <div className='flex flex-col'>
      <div className='relative flex flex-col gap-y-4'>
        <BookingTimeSelectNavigation
          selectedDay={selectedDay}
          onPrev={() => {
            const prevDate = selectedDay
              ? addDays(new Date(selectedDay), -1)
              : new Date();

            setSelectedDay(prevDate.toISOString());
          }}
          onNext={() => {
            const nextDate = selectedDay
              ? addDays(new Date(selectedDay), 1)
              : new Date();

            setSelectedDay(nextDate.toISOString());
          }}
        />
        <Swiper
          spaceBetween={10}
          slideNextClass={styles.slideNext}
          loop={false}
          slidesPerView={'auto'}
          className='w-full'
          ref={swiperRef}
        >
          {generatedDates.map((item, index) => (
            <SwiperSlide className={styles.swiperSlide} key={index}>
              <div
                className={clsx(styles.dataBox, {
                  [styles.dataBoxCheked]: selectedDay === item,
                })}
                onClick={() => handleDayChoose(item)}
              >
                <Typography variant='body2' className='!text-inherit'>
                  {formatI18n(new Date(item), 'EEE', intl.locale)}
                </Typography>
                <Typography variant='body2' className='!text-inherit'>
                  {formatI18n(new Date(item), 'd', intl.locale)}
                </Typography>
                <Typography variant='body2' className='!text-inherit'>
                  {formatI18n(new Date(item), 'MMM', intl.locale)}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {selectedDay && (
        <div className='w-full pt-6'>
          {bookingData.isLoading ? (
            <div className={styles.spinnerContainer}>
              <Spinner size='small' />
              <Typography className={styles.loadingLabel}>
                {intl.formatMessage({ id: 'booking.timeSelect.searching' })}
              </Typography>
            </div>
          ) : (
            <>
              <div className='flex flex-col rounded-[20px] border border-primary-light'>
                {groupedSlots.map(
                  (group, index) =>
                    group.slots.length > 0 && (
                      <div
                        className={`relative p-5 ${index === 0 ? '' : 'border-t border-primary-light'}`}
                        key={group.hour}
                      >
                        <span className='absolute -top-3 left-1/2 -translate-x-1/2 transform bg-white px-4 text-sm text-gray'>
                          {`${group.hour}:00`}
                        </span>
                        <div className='grid grid-cols-2 gap-4'>
                          {group.slots.map((slot, index) => (
                            <BookingSlotCard
                              key={index}
                              isActive={
                                selectedTimeRange?.startTime ===
                                  slot.startTime &&
                                selectedTimeRange?.endTime === slot.endTime
                              }
                              startTime={slot.startTime}
                              endTime={slot.endTime}
                              onClick={() => setSelectedTimeRange(slot)}
                            />
                          ))}
                        </div>
                      </div>
                    )
                )}
              </div>
              {bookingAvailableTimes.length === 0 && (
                <Typography className={styles.noAvailableTimeText}>
                  {intl.formatMessage({
                    id: 'booking.timeSelect.noAvailableTime',
                  })}
                </Typography>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
