'use client';
import { useMemo, type FC } from 'react';
import { getHours, set, getMinutes } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useIntl } from 'react-intl';

// type
import type { CalendarProps } from './calendar.interface';
// utils
import { getTime } from '@/modules/schedule/utils/get-time';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
// styles
import './calendar.scss';
import styles from './calendarEvent.module.scss';
import { Icon } from '@/modules/core/components/icon';

export const Calendar: FC<CalendarProps> = () => {
  const intl = useIntl();

  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  const [events] = trpc.booking.list.useSuspenseQuery({
    expand: ['serviceProfessional'],
    professionalId: me.professional?.id,
  });

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

  const eventsList = useMemo(() => {
    return events.map((event) => ({
      id: event.id,
      title: event.serviceProfessional.title,
      start: set(event.date, {
        hours: getHours(event.startTime),
        minutes: getMinutes(event.startTime),
        seconds: 0,
        milliseconds: 0,
      }),
      end: set(event.date, {
        hours: getHours(event.endTime),
        minutes: getMinutes(event.endTime),
        seconds: 0,
        milliseconds: 0,
      }),
      className: styles.event,
    }));
  }, [events]);

  return (
    <div className='mostly-customized'>
      <FullCalendar
        events={eventsList}
        viewDidMount={handleViewMount}
        plugins={[timeGridPlugin]}
        initialView='timeGridWeek'
        customButtons={{
          customButtons: {
            text: intl.formatMessage({ id: 'calendar.customButtons.approved' }),
          },
          customButtons2: {
            text: intl.formatMessage({
              id: 'calendar.customButtons.requested',
            }),
          },
          customButtons3: {
            text: intl.formatMessage({ id: 'calendar.customButtons.past' }),
          },
        }}
        buttonText={{ today: 'Today' }}
        headerToolbar={{
          left: 'today prev,next',
          center: 'title',
          right: 'customButtons customButtons2 customButtons3',
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
            <span>{formatI18n(date, 'hh:mm', intl.locale)}</span>
          </div>
        )}
        allDaySlot={false}
        eventClassNames={() => 'bg-green-light'}
        height={'75vh'}
        nowIndicator
        slotMinTime={'06:00'}
        eventContent={({ event }) => {
          const startTime = getTime(event.start);
          const endTime = getTime(event.end);

          return (
            <div key={event.id} className={styles.eventContainer}>
              <span className='text-dark'>{event.title}</span>
              <div className='flex items-center gap-x-1'>
                <Icon
                  name='time'
                  width={16}
                  height={16}
                  className='text-gray'
                />
                <span className='text-gray font-medium text-sm'>
                  {startTime} - {endTime}
                </span>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
