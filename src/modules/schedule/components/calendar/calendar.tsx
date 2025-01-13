import { useMemo, type FC, useContext, useState } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import allLocale from '@fullcalendar/core/locales-all';
import { useIntl } from 'react-intl';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
// containers
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
// components
import { Icon } from '@/modules/core/components/icon';
import { Button } from '@/modules/core/components/button';
// context
import { BookingContext } from '@/modules/booking/providers/booking-provider';
// utils
import { getTime } from '@/modules/schedule/utils/get-time';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
// constants
import { weekdays } from '@/modules/schedule/constants/schedule.constants';
// type
import type { EventInput } from '@fullcalendar/core';
import type { CalendarProps } from './calendar.interface';
import styles from './calendarEvent.module.scss';
import './calendar.scss';

const FullCalendar = dynamic(() => import('@fullcalendar/react'), {
  ssr: false,
});

export const Calendar: FC<CalendarProps> = () => {
  const intl = useIntl();
  // context
  const { book } = useContext(BookingContext);
  // state
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  // queries
  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });
  const { data: professionalEvents } = trpc.booking.list.useInfiniteQuery(
    {
      expand: ['serviceProfessional'],
      professionalId: me.professional?.id,
    },
    {
      enabled: !!me.professional?.id && me.userType === 'CUSTOMER',
    }
  );

  const { data: customerEvents } = trpc.booking.myBookings.useInfiniteQuery({
    expand: ['serviceProfessional'],
    professionalId: me.professional?.id,
  });

  const events = professionalEvents || customerEvents;

  const { data: weekSchedule } = trpc.schedule.getWeekSchedule.useQuery(
    {
      professionalId: me?.professional?.id ?? '',
    },
    {
      enabled: Boolean(me?.professional),
    }
  );

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
          className: clsx(styles.event, styles[`event_${event.status}`]),
        })) || []
    );
  }, [events]);

  return (
    <div className='w-full pl-0 md:pl-8'>
      <Button
        text={intl.formatMessage({ id: 'button.create' })}
        onClick={() => {
          book();
        }}
        className='absolute right-[36px] top-[16px] sm:!top-[40px]'
      />
      <FullCalendar
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
        onClose={() => {
          setActiveBookingId(null);
        }}
      />
    </div>
  );
};
