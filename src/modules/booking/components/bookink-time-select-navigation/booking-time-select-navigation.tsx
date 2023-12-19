import { useSwiper } from 'swiper/react';

import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';

import styles from './booking-time-select-navigation.module.scss';

export const BookingTimeSelectNavigation = () => {
  const swiper = useSwiper();

  return (
    <div className={styles.header}>
      <Button
        onClick={() => swiper.slidePrev()}
        icon='arrow-left'
        variant='unstyled'
      />
      <Typography variant='body1'>Thursday, 18, May</Typography>
      <Button
        onClick={() => swiper.slideNext()}
        icon='arrow-right'
        variant='unstyled'
      />
    </div>
  );
};
