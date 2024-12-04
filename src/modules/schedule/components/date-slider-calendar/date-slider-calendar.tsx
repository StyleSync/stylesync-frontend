// Swiper components
import { Typography } from '@/modules/core/components/typogrpahy';

import styles from '@/modules/booking/containers/booking-time-select/booking-time-select.module.scss';
import { type DateSliderCalendarProps } from './date-slider-calendar.inerface';
import { type FC } from 'react';
import { format, isSameDay } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';

export const DateSliderCalendar: FC<DateSliderCalendarProps> = ({
  days,
  swiperRef,
  onSwiper,
  onDateSelect,
  selectedDate,
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
      {days.map((day, index) => (
        <SwiperSlide key={index} className={`${styles.swiperSlideCalendar}`}>
          <div
            className={`flex w-full flex-col items-center gap-3 rounded-xl py-[11px] pb-3 shadow ${selectedDate && isSameDay(selectedDate, day) ? 'bg-primary' : 'bg-white'}`}
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
            >
              {format(day, 'd')}
            </Typography>
            <div className='flex gap-1'>
              <div className='h-[5px] w-[5px] rounded-full bg-green-500' />
              <div className='h-[5px] w-[5px] rounded-full bg-green-500' />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
