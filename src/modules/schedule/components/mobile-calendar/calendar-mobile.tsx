// import dynamic from 'next/dynamic';
import {
  type FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  useContext,
} from 'react';
import clsx from 'clsx';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { format, startOfDay } from 'date-fns';
import { useIntl } from 'react-intl';
// fullcalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import type { CalendarApi, EventInput } from '@fullcalendar/core';
// components
import { DateSelectCalendar } from '@/modules/schedule/components/data-select-calendar';
import { DateSliderCalendar } from '../date-slider-calendar';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
// containers
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
// context
import { BookingContext } from '@/modules/booking/providers/booking-provider';
// constants
import { weekdays } from '@/modules/schedule/constants/schedule.constants';
// hoooks
import { useBoolean } from 'usehooks-ts';
// utils
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
import { getDaysOfCurrentMonth } from '@/modules/schedule/utils/get-current-month-days';
// type
import { type Swiper } from 'swiper/types';
import { type CalendarMobileProps } from './calendar-mobile.interface';
import styles from '@/modules/schedule/components/calendar/calendarEvent.module.scss';

const SPEED_TO_SLIDE = 500;

export const CalendarMobile: FC<CalendarMobileProps> = () => {
  const intl = useIntl();
  const isOpenDropMenu = useBoolean();
  // context
  const { book } = useContext(BookingContext);

  const [selectedDates, setSelectedDates] = useState<Date[]>(
    getDaysOfCurrentMonth(new Date())
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    startOfDay(new Date())
  );
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

  const swiperRef = useRef<Swiper | null>(null);
  const fullCalendarRef = useRef<FullCalendar>(null);

  // queries
  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });
  const [events] = trpc.booking.list.useSuspenseQuery({
    expand: ['serviceProfessional'],
    professionalId: me.professional?.id,
  });

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

  const eventsList = useMemo(() => {
    return events.map((event) => ({
      id: event.id,
      title: event.serviceProfessional.title,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      status: event.status,
      className: clsx(styles.event, styles[`event_${event.status}`]),
    }));
  }, [events]);

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
        <DropdownMenu
          isOpen={isOpenDropMenu.value}
          onClose={isOpenDropMenu.setFalse}
          onSelect={({ id }) => {
            if (id === 'add') {
              book();
              isOpenDropMenu.setFalse();
            }
          }}
          trigger={
            <Button
              aria-label='Add event'
              aria-haspopup='true'
              className='!h-6 !w-6'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                isOpenDropMenu.toggle();
              }}
              variant='unstyled'
              icon='points'
            />
          }
          items={[
            {
              id: 'add',
              variant: 'primary',
              icon: 'plus',
              text: intl.formatMessage({ id: 'calendar.add.event' }),
            },
          ]}
          popoverProps={{
            align: 'start',
            backgroundBlurEffect: false,
          }}
        />
      </div>

      <div className='pl-6'>
        <DateSelectCalendar
          onDateSelect={setSelectedDate}
          onMonthChange={setSelectedDates}
          selectedDate={selectedDate}
          events={events}
        />
      </div>

      <div className='relative flex w-full max-w-full'>
        <DateSliderCalendar
          events={events}
          onSwiper={onSwiperHandler}
          swiperRef={swiperRef}
          days={selectedDates || []}
          onDateSelect={setSelectedDate}
          selectedDate={selectedDate}
        />
      </div>

      <div className='flex-1 border-t border-primary-light pl-6'>
        <FullCalendar
          events={eventsList}
          ref={fullCalendarRef}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView='timeGridDay'
          buttonText={{ today: 'Today' }}
          headerToolbar={false}
          dayHeaders={false}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
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
