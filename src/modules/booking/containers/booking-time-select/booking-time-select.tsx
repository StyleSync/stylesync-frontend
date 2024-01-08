'use client';
import { useState } from 'react';
import clsx from 'clsx';
// utils
import { generateDates } from '@/modules/core/utils/date.utils';
// components
import { BookingTimeSelectNavigation } from '../../components/bookink-time-select-navigation';
import { Typography } from '@/modules/core/components/typogrpahy';
// Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
// style
import styles from './booking-time-select.module.scss';

const timeIntervals = [
  '11:00 - 12:00',
  '13:00 - 14:00',
  '15:00 - 16:00',
  '17:00 - 18:00',
  '19:00 - 20:00',
  '21:00 - 22:00',
];

export const BookingTimeSelect = () => {
  const [selectedSlide, setSelectedSlide] = useState<number | null>(null);
  const [selectedTimeBox, setSelectedTimeBox] = useState<number | null>(null);

  const handleTimeBoxClick = (index: number) => {
    setSelectedTimeBox(index);
  };

  const handleSlideClick = (index: number) => {
    setSelectedSlide(index);
  };

  return (
    <div className={styles.bookingContainer}>
      <div className={styles.bookingContent}>
        <Swiper
          spaceBetween={0}
          slideNextClass={styles.slideNext}
          loop={false}
          slidesPerView={7}
          className={styles.swiper}
        >
          <BookingTimeSelectNavigation selectedSlide={selectedSlide} />

          {generateDates().map((item, index) => (
            <SwiperSlide className={styles.swiperSlide} key={index}>
              <div
                className={clsx(styles.dataBox, {
                  [styles.dataBoxCheked]: selectedSlide === index,
                })}
                onClick={() => handleSlideClick(index)}
              >
                <Typography
                  variant='body2'
                  className={clsx(styles.info, {
                    [styles.infoCheked]: selectedSlide === index,
                  })}
                >
                  {item.day}
                </Typography>
                <Typography
                  variant='body2'
                  className={clsx(styles.info, {
                    [styles.infoCheked]: selectedSlide === index,
                  })}
                >
                  {item.number}
                </Typography>
                <Typography
                  variant='body2'
                  className={clsx(styles.info, {
                    [styles.infoCheked]: selectedSlide === index,
                  })}
                >
                  {item.month}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.timeBoxes}>
        {timeIntervals.map((interval, index) => (
          <div
            key={index}
            className={clsx(styles.timeBox, {
              [styles.timeBoxChecked]: selectedTimeBox === index,
            })}
            onClick={() => handleTimeBoxClick(index)}
          >
            <Typography
              className={clsx(styles.timeText, {
                [styles.timeTextCheced]: selectedTimeBox === index,
              })}
            >
              {interval}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
