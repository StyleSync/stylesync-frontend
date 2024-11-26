import { useMemo, type FC } from 'react';
import styles from '@/modules/booking/containers/booking-time-select/booking-time-select.module.scss';
import { BookingTimeSelectNavigation } from '@/modules/booking/components/booking-time-select-navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import clsx from 'clsx';
import { Typography } from '@/modules/core/components/typogrpahy';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
import { generateDates } from '@/modules/core/utils/date.utils';
import { useIntl } from 'react-intl';
import { isSameDay } from 'date-fns';

type DateSliderProps = {
  selectedDate: string | null;
  onSelectedDateChange: (date: string | null) => void;
};

export const DateSlider: FC<DateSliderProps> = ({
  selectedDate,
  onSelectedDateChange,
}) => {
  const intl = useIntl();
  const generatedDates = useMemo(() => {
    return generateDates();
  }, []);

  return (
    <Swiper
      spaceBetween={10}
      loop={false}
      slidesPerView={'auto'}
      className='!pt-12'
    >
      <BookingTimeSelectNavigation selectedDay={selectedDate} />
      {generatedDates.map((item, index) => (
        <SwiperSlide className={styles.swiperSlide} key={index}>
          <div
            className={clsx(styles.dataBox, {
              [styles.dataBoxCheked]:
                selectedDate &&
                isSameDay(new Date(item), new Date(selectedDate)),
            })}
            onClick={() => onSelectedDateChange(item)}
          >
            <Typography variant='body2' className='capitalize !text-inherit'>
              {formatI18n(new Date(item), 'EEE', intl.locale)}
            </Typography>
            <Typography variant='body2' className='!text-inherit'>
              {formatI18n(new Date(item), 'd', intl.locale)}
            </Typography>
            <Typography variant='body2' className='capitalize !text-inherit'>
              {formatI18n(new Date(item), 'MMM', intl.locale).replace('.', '')}
            </Typography>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
