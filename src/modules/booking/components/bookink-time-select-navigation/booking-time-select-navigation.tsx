import type { FC } from 'react';
import { useSwiper } from 'swiper/react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
// utils
import { generateDates } from '@/modules/core/utils/date.utils';
// type
import type { ServiceBookingModalProps } from './booking-time-select.interface';
// style
import styles from './booking-time-select-navigation.module.scss';

const selectDate = (
  <Typography variant='body1' className={styles.selectDate}>
    Select a date
  </Typography>
);

export const BookingTimeSelectNavigation: FC<ServiceBookingModalProps> = ({
  selectedSlide,
}) => {
  const swiper = useSwiper();
  const dates = generateDates();
  const selectedDate = selectedSlide !== null && dates[selectedSlide];

  return (
    <div className={styles.dateNavigation}>
      <Button
        onClick={() => swiper.slidePrev()}
        icon='arrow-left'
        variant='unstyled'
      />
      <Typography variant='body1'>
        {selectedDate
          ? `${selectedDate.day}, ${selectedDate.number}, ${selectedDate.month}`
          : selectDate}
      </Typography>
      <Button
        onClick={() => swiper.slideNext()}
        icon='arrow-right'
        variant='unstyled'
      />
    </div>
  );
};
