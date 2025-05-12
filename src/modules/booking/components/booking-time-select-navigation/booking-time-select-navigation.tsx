import { type FC, useMemo } from 'react';

import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { generateDates } from '@/modules/core/utils/date.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

import type { BookingTimeSelectNavigationProps } from './booking-time-select.interface';

export const BookingTimeSelectNavigation: FC<
  BookingTimeSelectNavigationProps
> = ({ selectedDay, onPrev, onNext }) => {
  const intl = useIntl();

  // const swiper = useSwiper();
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
    <div className='flex items-center justify-center gap-x-4'>
      <Button
        onClick={onPrev}
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
        onClick={onNext}
        icon='arrow-right'
        variant='unstyled'
        className='transition hover:text-primary'
      />
    </div>
  );
};
