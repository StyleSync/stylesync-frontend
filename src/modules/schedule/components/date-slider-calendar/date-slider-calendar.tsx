import { useMemo, type FC } from 'react';
import { useIntl } from 'react-intl';
import { uk, enUS } from 'date-fns/locale';
import { endOfDay, format, isSameDay, startOfDay } from 'date-fns';
//  components
import { Typography } from '@/modules/core/components/typogrpahy';
// constants
import { bookingStatusMetadata } from '@/modules/booking/constants/booking.constants';
// types
import { type DateSliderCalendarProps } from './date-slider-calendar.inerface';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import styles from '@/modules/booking/containers/booking-time-select/booking-time-select.module.scss';

export const DateSliderCalendar: FC<DateSliderCalendarProps> = ({
  days,
  swiperRef,
  onSwiper,
  onDateSelect,
  selectedDate,
  events,
}) => {
  const { locale } = useIntl();

  const handleDateSelect = (day: Date) => {
    onDateSelect(day);
  };

  const dateFnsLocale = useMemo(() => {
    if (locale === 'uk') return uk;

    return enUS;
  }, [locale]);

  if (!days || days.length === 0) return;

  return (
    <Swiper
      onSwiper={onSwiper}
      ref={swiperRef}
      spaceBetween={10}
      loop={false}
      slidesPerView='auto'
      slidesOffsetBefore={24}
      className='z-10 w-full !pb-4'
    >
      {days.map((day, index) => {
        const dayEvents = events.items.filter(
          (event) =>
            new Date(event.startTime) > startOfDay(day) &&
            new Date(event.startTime) < endOfDay(day)
        );

        const statuses = dayEvents.map((event) => event.status);
        const uniqStatuses = Array.from(new Set(statuses));

        return (
          <SwiperSlide key={index} className={styles.swiperSlideCalendar}>
            <div
              className={`flex h-full w-full flex-col items-center rounded-xl px-[7px] py-[11px] pb-3 shadow ${selectedDate && isSameDay(selectedDate, day) ? 'bg-primary' : 'bg-white'}`}
              onClick={() => handleDateSelect(day)}
            >
              <Typography
                className={`capitalize ${selectedDate && isSameDay(selectedDate, day) ? '!text-white' : '!text-dark'}`}
                variant='body2'
              >
                {format(day, 'EEE', { locale: dateFnsLocale })}
              </Typography>
              <Typography
                className={`mt-2 ${selectedDate && isSameDay(selectedDate, day) ? '!text-white' : '!text-black'}`}
                weight='semibold'
                variant='body1'
              >
                {format(day, 'd', { locale: dateFnsLocale })}
              </Typography>
              <div className='mt-1 flex gap-[2px]'>
                {uniqStatuses.map((status) => {
                  const statusMetadata = bookingStatusMetadata[status];

                  return (
                    <div
                      key={status}
                      className={`h-[5px] w-[5px] rounded-full ${statusMetadata.color}`}
                    />
                  );
                })}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
