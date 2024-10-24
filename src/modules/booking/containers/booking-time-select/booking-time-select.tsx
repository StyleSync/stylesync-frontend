import { useMemo, type FC } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { isPast } from 'date-fns';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import {
  generateDates,
  mapDateToDayEnum,
} from '@/modules/core/utils/date.utils';
import { formatTime } from '@/modules/core/utils/time.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

// components
import { BookingTimeSelectNavigation } from '../../components/booking-time-select-navigation';
import { Spinner } from '@/modules/core/components/spinner';
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

export const BookingTimeSelect: FC<BookingTimeSelectProps> = ({
  selectedDay,
  setSelectedDay,
  selectedTimeRange,
  setSelectedTimeRange,
  serviceOnProfessionalId,
}) => {
  const intl = useIntl();

  const bookingData = trpc.booking.available.list.useQuery(
    {
      date: selectedDay || '',
      serviceOnProfessionalId: serviceOnProfessionalId || '',
      day: mapDateToDayEnum(selectedDay || ''),
    },
    { enabled: !!selectedDay && !!serviceOnProfessionalId, retry: false }
  );

  const handleDayChoose = (date: string) => {
    setSelectedDay(date);
    setSelectedTimeRange(null);
  };

  const bookingAvalibleTimes = useMemo(() => {
    if (bookingData.data) {
      return bookingData.data.filter(
        (timeSlot) => !isPast(new Date(timeSlot.startTime))
      );
    }

    return [];
  }, [bookingData]);

  const generatedDates = useMemo(() => {
    return generateDates();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.bookingContent}>
        <Swiper
          spaceBetween={10}
          slideNextClass={styles.slideNext}
          loop={false}
          slidesPerView={'auto'}
          className={styles.swiper}
        >
          <BookingTimeSelectNavigation selectedDay={selectedDay} />
          {generatedDates.map((item, index) => (
            <SwiperSlide className={styles.swiperSlide} key={index}>
              <div
                className={clsx(styles.dataBox, {
                  [styles.dataBoxCheked]: selectedDay === item,
                })}
                onClick={() => handleDayChoose(item)}
              >
                <Typography variant='body2' className='!text-inherit'>
                  {formatI18n(new Date(item), 'EEE', intl.locale)}
                </Typography>
                <Typography variant='body2' className='!text-inherit'>
                  {formatI18n(new Date(item), 'd', intl.locale)}
                </Typography>
                <Typography variant='body2' className='!text-inherit'>
                  {formatI18n(new Date(item), 'MMM', intl.locale)}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.timeRangesContainer}>
        {selectedDay && (
          <>
            {bookingData.isLoading && (
              <div className={styles.spinnerContainer}>
                <Spinner size='small' />
                <Typography className={styles.loadingLabel}>
                  {intl.formatMessage({ id: 'booking.timeSelect.searching' })}
                </Typography>
              </div>
            )}
            {!bookingData.isLoading && (
              <>
                {bookingAvalibleTimes.length > 0 &&
                  bookingAvalibleTimes.map((interval, index) => (
                    <div
                      key={index}
                      className={clsx(styles.timeBox, {
                        [styles.timeBoxChecked]:
                          selectedTimeRange?.startTime === interval.startTime &&
                          selectedTimeRange.endTime === interval.endTime,
                      })}
                      onClick={() => setSelectedTimeRange(interval)}
                    >
                      <Typography className='!text-inherit'>
                        {`${formatTime(interval.startTime)} - ${formatTime(
                          interval.endTime
                        )}`}
                      </Typography>
                    </div>
                  ))}
                {bookingAvalibleTimes.length === 0 && (
                  <Typography className={styles.noAvailableTimeText}>
                    {intl.formatMessage({
                      id: 'booking.timeSelect.noAvailableTime',
                    })}
                  </Typography>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
