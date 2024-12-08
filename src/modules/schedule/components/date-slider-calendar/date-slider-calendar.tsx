// Swiper components
import { Typography } from '@/modules/core/components/typogrpahy';

import styles from '@/modules/booking/containers/booking-time-select/booking-time-select.module.scss';
import { type DateSliderCalendarProps } from './date-slider-calendar.inerface';
import { type FC } from 'react';
import { endOfDay, format, isSameDay, startOfDay } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import { bookingStatusMetadata } from '@/modules/booking/constants/booking.constants';

export const DateSliderCalendar: FC<DateSliderCalendarProps> = ({
  days,
  swiperRef,
  onSwiper,
  onDateSelect,
  selectedDate,
  events,
}) => {
  const handleDateSelect = (day: Date) => {
    onDateSelect(day);
  };

  if (!days || days.length === 0) return;

  return (
    <Swiper
      onSwiper={onSwiper}
      ref={swiperRef}
      spaceBetween={10}
      loop={false}
      slidesPerView='auto'
      slidesOffsetBefore={24}
      className='z-10 w-full !pb-4'
    >
      {days.map((day, index) => {
        const dayEvents = events.filter(
          (event) =>
            new Date(event.startTime) > startOfDay(day) &&
            new Date(event.startTime) < endOfDay(day)
        );

        const statuses = dayEvents.map((event) => event.status);
        const uniqStatuses = Array.from(new Set(statuses));

        return (
          <SwiperSlide key={index} className={`${styles.swiperSlideCalendar}`}>
            <div
              className={`flex h-full w-full flex-col items-center gap-[6px] rounded-xl px-[7px] py-[11px] pb-3 shadow ${selectedDate && isSameDay(selectedDate, day) ? 'bg-primary' : 'bg-white'}`}
              onClick={() => handleDateSelect(day)}
            >
              <Typography
                className={`${selectedDate && isSameDay(selectedDate, day) ? '!text-white' : '!text-dark'}`}
                variant='body2'
              >
                {format(day, 'EEE')}
              </Typography>
              <Typography
                className={` ${selectedDate && isSameDay(selectedDate, day) ? '!text-white' : '!text-dark'}`}
                weight='semibold'
                variant='body1'
              >
                {format(day, 'd')}
              </Typography>
              <div className='flex gap-[2px]'>
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
