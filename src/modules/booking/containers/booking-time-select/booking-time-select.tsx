import { useMemo, type FC, useRef } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { addDays, isPast } from 'date-fns';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import {
  generateDates,
  mapDateToDayEnum,
} from '@/modules/core/utils/date.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

// components
import { BookingTimeSelectNavigation } from '../../components/booking-time-select-navigation';
import { Spinner } from '@/modules/core/components/spinner';
import { Typography } from '@/modules/core/components/typogrpahy';
// type
import type { BookingTimeSelectProps } from '@/modules/booking/containers/booking-time-select/booking-time-select.interface';
// Swiper components
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react';
// Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
// style
import styles from './booking-time-select.module.scss';
import { BookingSlotCard } from '@/modules/booking/components/booking-slot-card';

export const BookingTimeSelect: FC<BookingTimeSelectProps> = ({
  selectedDay,
  setSelectedDay,
  selectedTimeRange,
  setSelectedTimeRange,
  serviceOnProfessionalId,
}) => {
  const intl = useIntl();
  const swiperRef = useRef<SwiperRef>(null);

  const bookingData = trpc.booking.available.list.useQuery(
    {
      date: selectedDay || '',
      serviceOnProfessionalId: serviceOnProfessionalId || '',
      day: mapDateToDayEnum(selectedDay || ''),
      dayTime: new Date(selectedDay || '').getDate(),
      monthTime: new Date(selectedDay || '').getMonth(),
      yearTime: new Date(selectedDay || '').getFullYear(),
    },
    {
      enabled: !!selectedDay && !!serviceOnProfessionalId,
      retry: false,
    }
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
    <div className='flex flex-col'>
      <div className='relative flex flex-col gap-y-4'>
        <BookingTimeSelectNavigation
          selectedDay={selectedDay}
          onPrev={() => {
            const prevDate = selectedDay
              ? addDays(new Date(selectedDay), -1)
              : new Date();

            setSelectedDay(prevDate.toISOString());
          }}
          onNext={() => {
            const nextDate = selectedDay
              ? addDays(new Date(selectedDay), 1)
              : new Date();

            setSelectedDay(nextDate.toISOString());
          }}
        />
        <Swiper
          spaceBetween={10}
          slideNextClass={styles.slideNext}
          loop={false}
          slidesPerView={'auto'}
          className='w-full'
          ref={swiperRef}
        >
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
      {selectedDay && (
        <div className='w-full pt-6'>
          {bookingData.isLoading ? (
            <div className={styles.spinnerContainer}>
              <Spinner size='small' />
              <Typography className={styles.loadingLabel}>
                {intl.formatMessage({ id: 'booking.timeSelect.searching' })}
              </Typography>
            </div>
          ) : (
            <>
              <div className='grid gap-2 [grid-template-columns:repeat(auto-fill,_minmax(120px,1fr))] [grid-template-rows:max-content]'>
                {bookingAvalibleTimes.map((slot, index) => (
                  <BookingSlotCard
                    key={index}
                    isActive={
                      selectedTimeRange?.startTime === slot.startTime &&
                      selectedTimeRange?.endTime === slot.endTime
                    }
                    startTime={slot.startTime}
                    endTime={slot.endTime}
                    onClick={() => setSelectedTimeRange(slot)}
                  />
                ))}
              </div>
              {bookingAvalibleTimes.length === 0 && (
                <Typography className={styles.noAvailableTimeText}>
                  {intl.formatMessage({
                    id: 'booking.timeSelect.noAvailableTime',
                  })}
                </Typography>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
