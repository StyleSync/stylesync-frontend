'use client';
import { type FC } from 'react';
import clsx from 'clsx';
// utils
import { generateDates } from '@/modules/core/utils/date.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';

// components
import { BookingTimeSelectNavigation } from '../../components/bookink-time-select-navigation';
import { Typography } from '@/modules/core/components/typogrpahy';
// type
import type { BookingTimeSelectProps } from '@/modules/booking/containers/booking-time-select/booking-time-select.interface';
// Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
// style
import styles from './booking-time-select.module.scss';
import { Button } from '@/modules/core/components/button';

const timeIntervals = [
  '11:00 - 12:00',
  '13:00 - 14:00',
  '15:00 - 16:00',
  '17:00 - 18:00',
  '19:00 - 20:00',
  '21:00 - 22:00',
];

export const BookingTimeSelect: FC<BookingTimeSelectProps> = ({
  selectedDay,
  setSelectedDay,
  selectedTimeBox,
  setSelectedTimeBox,
  onClickNext,
  onClickBack,
}) => {
  const { data: me } = trpc.user.me.useQuery({ expand: ['professional'] });
  // const bookingData = trpc.booking.list.useQuery(
  //   { professionalId: me?.professional?.id || '' },
  //   { enabled: !!me?.id }
  // );

  const handleTimeBoxClick = (index: number) => {
    setSelectedTimeBox(index);
  };

  const handleSlideClick = (index: number) => {
    setSelectedDay(index);
  };

  return (
    <>
      <div className={styles.bookingContent}>
        <Swiper
          spaceBetween={0}
          slideNextClass={styles.slideNext}
          loop={false}
          slidesPerView={7}
          className={styles.swiper}
        >
          <BookingTimeSelectNavigation selectedDay={selectedDay} />

          {generateDates().map((item, index) => (
            <SwiperSlide className={styles.swiperSlide} key={index}>
              <div
                className={clsx(styles.dataBox, {
                  [styles.dataBoxCheked]: selectedDay === index,
                })}
                onClick={() => handleSlideClick(index)}
              >
                <Typography
                  variant='body2'
                  className={clsx(styles.info, {
                    [styles.infoCheked]: selectedDay === index,
                  })}
                >
                  {item.day}
                </Typography>
                <Typography
                  variant='body2'
                  className={clsx(styles.info, {
                    [styles.infoCheked]: selectedDay === index,
                  })}
                >
                  {item.number}
                </Typography>
                <Typography
                  variant='body2'
                  className={clsx(styles.info, {
                    [styles.infoCheked]: selectedDay === index,
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
      <div className={styles.navigationBtns}>
        <Button
          className={styles.buttonBack}
          onClick={onClickBack}
          text='Back'
          icon='arrow-left'
          variant='outlined'
        />
        <Button
          className={styles.buttonRight}
          onClick={onClickNext}
          text='Next'
          variant='outlined'
          icon='arrow-right'
        />
      </div>
    </>
  );
};
