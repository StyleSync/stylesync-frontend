import { type FC, useMemo, useState } from 'react';

import type { EventInput } from '@fullcalendar/core';
import allLocale from '@fullcalendar/core/locales-all';
import timeGridPlugin from '@fullcalendar/timegrid';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useIntl } from 'react-intl';

import { PointsBookingActions } from '@/modules/booking/components/points-booking-actions/points-booking-action';
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
import { Icon } from '@/modules/core/components/icon';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
import { weekdays } from '@/modules/schedule/constants/schedule.constants';
import { getTime } from '@/modules/schedule/utils/get-time';

import type { CalendarProps } from './calendar.interface';

import './calendar.scss';
import styles from './calendarEvent.module.scss';

const FullCalendar = dynamic(() => import('@fullcalendar/react'), {
  ssr: false,
});

export const Calendar: FC<CalendarProps> = () => {
  const intl = useIntl();
  // state
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [activeBookingCode, setActiveBookingCode] = useState<string | null>(
    null
  );
  // queries
  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });
  const {
    data: professionalEvents,
    fetchNextPage: userFetchNextPage,
    isFetchingNextPage: userIsFetchingNextPage,
    hasNextPage: userHasNextPage,
  } = trpc.booking.list.useInfiniteQuery(
    {
      expand: ['serviceProfessional'],
      professionalId: me.professional?.id,
      limit: 100,
    },
    {
      enabled: !!me.professional?.id && me.userType === 'PROFESSIONAL',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const {
    data: customerEvents,
    fetchNextPage: customerFetchNextPage,
    isFetchingNextPage: customerIsFetchingNextPage,
    hasNextPage: customerHasNextPage,
  } = trpc.booking.myBookings.useInfiniteQuery(
    {
      expand: ['serviceProfessional'],
      limit: 100,
    },
    {
      enabled: me.userType === 'CUSTOMER',
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const { data: weekSchedule } = trpc.schedule.getWeekSchedule.useQuery(
    {
      professionalId: me?.professional?.id ?? '',
    },
    {
      enabled: Boolean(me?.professional),
    }
  );

  const handleDatesSet = () => {
    if (
      me.userType === 'PROFESSIONAL' &&
      userHasNextPage &&
      !userIsFetchingNextPage
    ) {
      userFetchNextPage();
    }

    if (
      me.userType === 'CUSTOMER' &&
      customerHasNextPage &&
      !customerIsFetchingNextPage
    ) {
      customerFetchNextPage();
    }
  };

  const handleViewMount = ({ el }: { el: HTMLElement }) => {
    const timeZone = formatI18n(new Date(), 'zzzz', intl.locale).replace(
      'GMT',
      'GMT '
    );
    const timeGridAxis = el.querySelector('.fc-timegrid-axis-frame');

    if (timeGridAxis) {
      timeGridAxis.innerHTML = `<span style="font-size: 11px">${timeZone}</span>`;
    }
  };

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

  const events = useMemo(
    () => professionalEvents || customerEvents,
    [professionalEvents, customerEvents]
  );

  const eventsList = useMemo(() => {
    return (
      events?.pages
        .map((page) => page.items)
        .flat()
        .map((event) => ({
          id: event.id,
          title: event.serviceProfessional.title,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          status: event.status,
          eventCode: 'code' in event ? (event.code as string) : null,
          className: clsx(styles.event, styles[`event_${event.status}`]),
        })) || []
    );
  }, [events]);

  return (
    <div className='w-full pl-0 md:pl-8'>
      <PointsBookingActions />
      <FullCalendar
        datesSet={handleDatesSet}
        locales={allLocale}
        locale={intl.locale}
        businessHours={businessHours}
        events={eventsList}
        viewDidMount={handleViewMount}
        plugins={[timeGridPlugin]}
        initialView='timeGridWeek'
        buttonText={{ today: 'Today' }}
        headerToolbar={{
          left: 'title',
          center: 'prev,next',
          right: '',
        }}
        dayHeaderFormat={({ date }) =>
          formatI18n(date.marker, 'dd E', intl.locale)
        }
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: false,
        }}
        slotLabelContent={({ date }) => (
          <div className='left-col'>
            <span>{formatI18n(date, 'H:mm', intl.locale)}</span>
          </div>
        )}
        allDaySlot={false}
        eventClassNames={() => {
          return 'py-2 cursor-pointer hover:saturate-[1.4] hover:shadow transition';
        }}
        height={'75vh'}
        nowIndicator
        eventClick={({ event }) => {
          setActiveBookingId(event.id);

          const eventData = eventsList.find((e) => e.id === event.id);

          if (eventData?.eventCode) {
            setActiveBookingCode(eventData.eventCode);
          }
        }}
        eventContent={({ event }) => {
          const startTime = getTime(event.start);
          const endTime = getTime(event.end);

          return (
            <div key={event.id} className='relative flex flex-col gap-y-1 pl-3'>
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
              {/* <div className='absolute -left-1 top-0 h-full w-1 rounded-full bg-green' /> */}
            </div>
          );
        }}
      />
      <BookingInfoDialog
        bookingId={activeBookingId}
        bookingCode={activeBookingCode}
        onClose={() => {
          setActiveBookingId(null);
          setActiveBookingCode(null);
        }}
      />
    </div>
  );
};
