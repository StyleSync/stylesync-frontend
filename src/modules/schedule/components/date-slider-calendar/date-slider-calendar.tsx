// Swiper components
import { Typography } from '@/modules/core/components/typogrpahy';

import styles from '@/modules/booking/containers/booking-time-select/booking-time-select.module.scss';
import { type DateSliderCalendarProps } from './date-slider-calendar.inerface';
import { useEffect, useState, type FC } from 'react';
import { format } from 'date-fns';
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
  const [today, setToday] = useState<Date>(new Date());

  useEffect(() => {
    setToday(new Date());
  }, []);

  const todaySlideClass = (day: Date) => {
    const isSameDay =
      day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate();

    return isSameDay ? '!bg-primary' : '';
  };

  const selectedSlideClass = (day: Date) => {
    return selectedDate && day.toISOString() === selectedDate.toISOString()
      ? '!bg-primary'
      : '';
  };

  const todaySlideClassText = (day: Date) => {
    const isSameDay =
      day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate();

    return isSameDay ? '!text-white' : '';
  };

  const selectedDateClassText = (day: Date) => {
    return selectedDate && day.toISOString() === selectedDate.toISOString()
      ? '!text-white'
      : '';
  };

  const handleDateSelect = (day: Date) => {
    onDateSelect(day);
    setToday(day);
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
            className={`flex w-full flex-col items-center gap-3 rounded-xl bg-white py-[11px] pb-3 shadow ${todaySlideClass(day)} ${selectedSlideClass(day)}`}
            onClick={() => handleDateSelect(day)}
          >
            <Typography
              className={`${todaySlideClassText(day)} ${selectedDateClassText(day)}`}
              variant='body2'
            >
              {format(day, 'EEE')}
            </Typography>
            <Typography
              className={`${todaySlideClassText(day)} ${selectedDateClassText(day)} `}
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
