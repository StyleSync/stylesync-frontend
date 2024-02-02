import { useMemo, type FC } from 'react';
import { useSwiper } from 'swiper/react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
// utils
import { generateDates } from '@/modules/core/utils/date.utils';
// type
import type { BookingTimeSelectNavigationProps } from './booking-time-select.interface';
// style
import styles from './booking-time-select-navigation.module.scss';
import { format } from 'date-fns';

const selectDate = (
  <Typography variant='body1' className={styles.selectDate}>
    Select a date
  </Typography>
);

export const BookingTimeSelectNavigation: FC<
  BookingTimeSelectNavigationProps
> = ({ selectedDay }) => {
  const swiper = useSwiper();
  const dates = generateDates();
  const selectedDate = useMemo(() => {
    if (selectedDay) {
      return dates.find((item) => {
        return selectedDay === item;
      });
    }

    return null;
  }, [selectedDay, dates]);

  return (
    <div className={styles.dateNavigation}>
      <Button
        onClick={() => swiper.slidePrev()}
        icon='arrow-left'
        variant='unstyled'
      />
      <Typography variant='body1'>
        {selectedDate
          ? format(new Date(selectedDate), 'EEEE d MMM')
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
