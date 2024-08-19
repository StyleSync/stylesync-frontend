import { useMemo, type FC } from 'react';
import { useSwiper } from 'swiper/react';
import { useIntl } from 'react-intl';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
// utils
import { generateDates } from '@/modules/core/utils/date.utils';
// type
import type { BookingTimeSelectNavigationProps } from './booking-time-select.interface';
// style
import styles from './booking-time-select-navigation.module.scss';
// utils
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

export const BookingTimeSelectNavigation: FC<
  BookingTimeSelectNavigationProps
> = ({ selectedDay }) => {
  const intl = useIntl();

  const swiper = useSwiper();
  const dates = generateDates();
  const selectedDate = useMemo(() => {
    if (!selectedDay) {
      return null;
    }

    return dates.find((item) => {
      return selectedDay === item;
    });
  }, [selectedDay, dates]);

  return (
    <div className={styles.dateNavigation}>
      <Button
        onClick={() => swiper.slidePrev()}
        icon='arrow-left'
        variant='unstyled'
        className='transition hover:text-primary'
      />
      <Typography variant='body1' className='min-w-[150px] text-center'>
        {selectedDate
          ? formatI18n(new Date(selectedDate), 'EEEE d MMM', intl.locale)
          : intl.formatMessage({ id: 'booking.time.select.title' })}
      </Typography>
      <Button
        onClick={() => swiper.slideNext()}
        icon='arrow-right'
        variant='unstyled'
        className='transition hover:text-primary'
      />
    </div>
  );
};
