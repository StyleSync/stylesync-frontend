import { type FC, useMemo } from 'react';

import clsx from 'clsx';
import { endOfDay, format, isSameDay, startOfDay } from 'date-fns';
import { enUS, uk } from 'date-fns/locale';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';

import { bookingStatusMetadata } from '@/modules/booking/constants/booking.constants';
import styles from '@/modules/booking/containers/booking-time-select/booking-time-select.module.scss';

import 'swiper/scss';
import 'swiper/scss/navigation';

import { type DateSliderCalendarProps } from './date-slider-calendar.inerface';

export const DateSliderCalendar: FC<DateSliderCalendarProps> = ({
  days,
  swiperRef,
  onSwiper,
  onDateSelect,
  selectedDate,
  events,
}) => {
  const { locale } = useIntl();

  const handleDateSelect = (day: Date) => {
    onDateSelect(day);
  };

  const dateFnsLocale = useMemo(() => {
    if (locale === 'uk') return uk;

    return enUS;
  }, [locale]);

  if (!days || days.length === 0) return;

  return (
    <Swiper
      onSwiper={onSwiper}
      ref={swiperRef}
      // spaceBetween={10}
      loop={false}
      slidesPerView='auto'
      slidesOffsetBefore={24}
      className='z-10 w-full'
    >
      {days.map((day, index) => {
        const dayEvents = events.items.filter(
          (event) =>
            new Date(event.startTime) > startOfDay(day) &&
            new Date(event.startTime) < endOfDay(day)
        );

        const statuses = dayEvents.map((event) => event.status);
        const uniqStatuses = Array.from(new Set(statuses));
        const isSelected = selectedDate && isSameDay(selectedDate, day);

        return (
          <SwiperSlide key={index} className={styles.swiperSlideCalendar}>
            <div
              className={clsx(
                'flex h-full w-full flex-col items-center justify-center rounded-xl bg-transparent px-[7px] py-[11px] pb-3',
                {
                  // '!bg-primary shadow': isSelected,
                }
              )}
              onClick={() => handleDateSelect(day)}
            >
              <span
                className={clsx(
                  'text-xs font-medium capitalize text-gray-accent',
                  { '!text-primary': isSelected }
                )}
              >
                {format(day, 'EEE', { locale: dateFnsLocale })}
              </span>
              <div
                className={clsx(
                  'mt-1 flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full',
                  {
                    'bg-primary': isSelected,
                  }
                )}
              >
                <span
                  className={clsx('text-base font-medium text-dark', {
                    '!text-white': isSelected,
                  })}
                >
                  {format(day, 'd', { locale: dateFnsLocale })}
                </span>
              </div>
              <div className='mt-1 flex gap-[2px]'>
                {uniqStatuses.map((status) => {
                  const statusMetadata = bookingStatusMetadata[status];

                  return (
                    <div
                      key={status}
                      className={`h-[5px] w-[5px] rounded-full ${statusMetadata.color}`}
                    />
                  );
                })}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
