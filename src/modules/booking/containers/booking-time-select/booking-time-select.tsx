'use client';
import { BookingTimeSelectNavigation } from '../../components/bookink-time-select-navigation';
import { Typography } from '@/modules/core/components/typogrpahy';
// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';

import styles from './booking-time-select.module.scss';

const data = [
  { day: 'Sat', number: '20', month: 'May' },
  { day: 'Sun', number: '21', month: 'May' },
  { day: 'Mon', number: '22', month: 'May' },
  { day: 'Thu', number: '23', month: 'May' },
  { day: 'Wed', number: '24', month: 'May' },
  { day: 'Day', number: '25', month: 'May' },
  { day: 'Day', number: '26', month: 'May' },
  { day: 'Day', number: '27', month: 'May' },
  { day: 'Day', number: '28', month: 'May' },
  { day: 'Day', number: '29', month: 'May' },
  { day: 'Day', number: '30', month: 'May' },
  { day: 'Day', number: '31', month: 'May' },
  { day: 'Day', number: '1', month: 'June' },
  { day: 'Day', number: '2', month: 'June' },
  { day: 'Day', number: '3', month: 'June' },
  { day: 'Day', number: '4', month: 'June' },
  { day: 'Day', number: '5', month: 'June' },
];

export const BookingTimeSelect = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Swiper
          spaceBetween={10}
          slideNextClass={styles.slideNext}
          loop
          slidesPerView={7}
          className={styles.swiper}
        >
          <BookingTimeSelectNavigation />

          {data.map((item, i) => (
            <SwiperSlide className={styles.swiperSlide} key={i}>
              <div className={styles.dataBox}>
                <Typography variant='body2' className={styles.info}>
                  {item.day}
                </Typography>
                <Typography variant='body2' className={styles.info}>
                  {item.number}
                </Typography>
                <Typography variant='body2' className={styles.info}>
                  {item.month}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.footer}>
        <div className={styles.timeBox}>
          <Typography className={styles.timeText}>11:00 - 12:00</Typography>
        </div>
        <div className={styles.timeBox2}>
          <Typography className={styles.timeText2}>13:00 - 14:00</Typography>
        </div>
        <div className={styles.timeBox3}>
          <Typography className={styles.timeText3}>15:00 - 16:00</Typography>
        </div>
        <div className={styles.timeBox3}>
          <Typography className={styles.timeText3}>17:00 - 18:00</Typography>
        </div>
        <div className={styles.timeBox3}>
          <Typography className={styles.timeText3}>19:00 - 20:00</Typography>
        </div>
        <div className={styles.timeBox3}>
          <Typography className={styles.timeText3}>21:00 - 22:00</Typography>
        </div>
      </div>
    </div>
  );
};
