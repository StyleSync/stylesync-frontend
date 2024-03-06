'use client';
import { useMemo, type FC } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { generateDates } from '@/modules/core/utils/date.utils';
import { formatTime } from '@/modules/core/utils/time.utils';
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
  professionalId,
}) => {
  const bookingData = trpc.booking.available.list.useQuery(
    {
      date: selectedDay || '',
      serviceOnProfessionalId: professionalId,
    },
    { enabled: !!selectedDay }
  );

  const handleDayChoose = (date: string) => {
    setSelectedDay(date);

    setSelectedTimeRange(null);
  };

  const bookingAvalibleTimes = useMemo(() => {
    if (bookingData.data) {
      return bookingData.data;
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
          spaceBetween={0}
          slideNextClass={styles.slideNext}
          loop={false}
          slidesPerView={7}
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
                <Typography
                  variant='body2'
                  className={clsx(styles.info, {
                    [styles.infoCheked]: selectedDay === item,
                  })}
                >
                  {format(new Date(item), 'EEE')}
                </Typography>
                <Typography
                  variant='body2'
                  className={clsx(styles.info, {
                    [styles.infoCheked]: selectedDay === item,
                  })}
                >
                  {format(new Date(item), 'd')}
                </Typography>
                <Typography
                  variant='body2'
                  className={clsx(styles.info, {
                    [styles.infoCheked]: selectedDay === item,
                  })}
                >
                  {format(new Date(item), 'MMM')}
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
                  Searching for available time...
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
                      <Typography
                        className={clsx(styles.timeText, {
                          [styles.timeTextCheced]:
                            selectedTimeRange?.startTime ===
                              interval.startTime &&
                            selectedTimeRange.endTime === interval.endTime,
                        })}
                      >
                        {`${formatTime(interval.startTime)} - ${formatTime(
                          interval.endTime
                        )}`}
                      </Typography>
                    </div>
                  ))}
                {bookingAvalibleTimes.length === 0 && (
                  <Typography className={styles.noAvailableTimeText}>
                    Sorry, <span>no free time</span>, please choose another
                    date.
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
