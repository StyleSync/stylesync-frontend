// import dynamic from 'next/dynamic';
import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { CalendarApi, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import clsx from 'clsx';
import { endOfMonth, format, startOfDay, startOfMonth } from 'date-fns';
import { useIntl } from 'react-intl';
import { type Swiper } from 'swiper/types';

import { PointsBookingActions } from '@/modules/booking/components/points-booking-actions/points-booking-action';
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
import { Icon } from '@/modules/core/components/icon';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
import styles from '@/modules/schedule/components/calendar/calendarEvent.module.scss';
import { DateSelectCalendar } from '@/modules/schedule/components/data-select-calendar';
import { DateSliderCalendar } from '@/modules/schedule/components/date-slider-calendar';
import { weekdays } from '@/modules/schedule/constants/schedule.constants';
import { getDaysOfCurrentMonth } from '@/modules/schedule/utils/get-current-month-days';

import { type CalendarMobileProps } from './calendar-mobile.interface';

const SPEED_TO_SLIDE = 500;

export const CalendarMobile: FC<CalendarMobileProps> = () => {
  const intl = useIntl();

  const [selectedDates, setSelectedDates] = useState<Date[]>(
    getDaysOfCurrentMonth(new Date())
  );
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfDay(new Date())
  );
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

  const swiperRef = useRef<Swiper | null>(null);
  const fullCalendarRef = useRef<FullCalendar>(null);

  // queries
  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });
  const {
    data: eventsProfessional,
    isFetchingNextPage: isFetchingNextPageProfessional,
    fetchNextPage: fetchNextPageProfessional,
  } = trpc.booking.list.useInfiniteQuery(
    {
      expand: ['serviceProfessional'],
      professionalId: me.professional?.id,
      limit: 100,
      startDate: startOfMonth(selectedDate).toISOString(),
      endDate: endOfMonth(selectedDate).toISOString(),
    },
    {
      enabled: !!me.professional?.id && me.userType === 'PROFESSIONAL',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const {
    data: eventsCustomer,
    isFetchingNextPage: isFetchingNextPageCustomer,
    fetchNextPage: fetchNextPageCustomer,
  } = trpc.booking.myBookings.useInfiniteQuery(
    {
      expand: ['serviceProfessional'],
      limit: 100,
      startDate: startOfMonth(selectedDate).toISOString(),
      endDate: endOfMonth(selectedDate).toISOString(),
    },
    {
      enabled: me.userType === 'CUSTOMER',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const events = eventsProfessional || eventsCustomer;

  useEffect(() => {
    const lastPage = events?.pages.at(-1);

    if (
      lastPage?.nextCursor &&
      (!isFetchingNextPageProfessional || !isFetchingNextPageCustomer)
    ) {
      fetchNextPageProfessional() || fetchNextPageCustomer();
    }
  }, [
    events?.pages,
    fetchNextPageCustomer,
    fetchNextPageProfessional,
    isFetchingNextPageCustomer,
    isFetchingNextPageProfessional,
  ]);

  const { data: weekSchedule } = trpc.schedule.getWeekSchedule.useQuery(
    {
      professionalId: me?.professional?.id ?? '',
    },
    {
      enabled: Boolean(me?.professional),
    }
  );

  const businessHours: EventInput[] = useMemo(() => {
    if (!weekSchedule) return [];

    return weekSchedule.map((schedule) => {
      const dayOfWeek =
        weekdays.findIndex((weekDay) => weekDay === schedule.day) + 1;

      return {
        daysOfWeek: [dayOfWeek],
        startTime: formatI18n(schedule.start, 'H:mm', intl.locale),
        endTime: formatI18n(schedule.end, 'H:mm', intl.locale),
      };
    });
  }, [weekSchedule, intl.locale]);

  const eventsFullCalendarList = useMemo(() => {
    if (!events?.pages) return [];

    return events?.pages
      .map((page) => page.items)
      .flat()
      .map((event) => ({
        id: event.id,
        title: event.serviceProfessional.title,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        status: event.status,
        className: clsx(styles.event, styles[`event_${event.status}`]),
      }));
  }, [events]);

  const adaptedEvents = useMemo(() => {
    return {
      items: events?.pages.map((page) => page.items).flat() || [],
      nextCursor: events?.pages.at(-1)?.nextCursor,
    };
  }, [events?.pages]);

  // connecting fullcalendar days
  useEffect(() => {
    const calendarApi: CalendarApi =
      fullCalendarRef.current?.getApi() as CalendarApi;

    if (!calendarApi) {
      return;
    }

    queueMicrotask(() => {
      if (selectedDate) {
        calendarApi.gotoDate(selectedDate);
      }
    });
  }, [selectedDate]);

  // smooth scrolling to slide
  const onSwiperHandler = useCallback(
    (swiper: Swiper) => {
      if (swiperRef.current !== swiper) {
        swiperRef.current = swiper;
      }
    },
    [swiperRef]
  );

  useEffect(() => {
    if (
      selectedDate &&
      Array.isArray(selectedDates) &&
      selectedDates?.length > 0 &&
      swiperRef.current
    ) {
      const index = selectedDates.findIndex(
        (date) => date.toISOString() === selectedDate.toISOString()
      );

      if (index !== -1) {
        swiperRef.current.slideTo(index, SPEED_TO_SLIDE);
      }
    }
  }, [selectedDate, selectedDates]);

  return (
    <div className='relative flex w-full flex-1 flex-col gap-2'>
      <div className='absolute right-6 top-2'>
        <PointsBookingActions />
      </div>

      <div className='pl-6'>
        <DateSelectCalendar
          onDateSelect={setSelectedDate}
          onMonthChange={setSelectedDates}
          selectedDate={selectedDate}
          events={adaptedEvents}
        />
      </div>

      <div className='relative flex w-full max-w-full'>
        <DateSliderCalendar
          events={adaptedEvents}
          onSwiper={onSwiperHandler}
          swiperRef={swiperRef}
          days={selectedDates || []}
          onDateSelect={setSelectedDate}
          selectedDate={selectedDate}
        />
      </div>

      <div className='flex-1 border-t border-primary-light pl-6'>
        <FullCalendar
          events={eventsFullCalendarList}
          ref={fullCalendarRef}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView='timeGridDay'
          buttonText={{ today: 'Today' }}
          headerToolbar={false}
          dayHeaders={false}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: false,
            omitZeroMinute: false,
            meridiem: false,
          }}
          businessHours={businessHours}
          allDaySlot={false}
          height={'100%'}
          nowIndicator
          eventClick={({ event }) => {
            setActiveBookingId(event.id);
          }}
          eventContent={({ event }) => {
            const startTime = event.start
              ? format(new Date(event.start), 'HH:mm')
              : null;
            const endTime = event.end
              ? format(new Date(event.end), 'HH:mm')
              : null;

            return (
              <div
                key={event.id}
                className='relative flex flex-col gap-y-1 pl-3'
              >
                <div className='flex'>
                  <span className='truncate text-base font-medium text-white'>
                    {event.title}
                  </span>
                </div>
                <div className='flex items-center gap-x-1'>
                  <Icon
                    name='time'
                    width={16}
                    height={16}
                    className='text-white'
                  />
                  <span className='text-sm font-medium text-white'>
                    {startTime} - {endTime}
                  </span>
                </div>
              </div>
            );
          }}
        />
        <BookingInfoDialog
          bookingId={activeBookingId}
          onClose={() => {
            setActiveBookingId(null);
          }}
        />
      </div>
    </div>
  );
};
