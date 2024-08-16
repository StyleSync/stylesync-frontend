import { useMemo, type FC } from 'react';
import { getHours, set, getMinutes } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useIntl } from 'react-intl';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
// type
import type { CalendarProps } from './calendar.interface';
// utils
import { getTime } from '@/modules/schedule/utils/get-time';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
// styles
import './calendar.scss';
import styles from './calendarEvent.module.scss';
import { weekdays } from '@/modules/schedule/constants/schedule.constants';
import type { EventInput } from '@fullcalendar/core';

export const Calendar: FC<CalendarProps> = () => {
  const intl = useIntl();

  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  // queries
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
        businessHours={businessHours}
        events={eventsList}
        viewDidMount={handleViewMount}
        eventBackgroundColor='#26c967'
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
            <span>{formatI18n(date, 'H:mm', intl.locale)}</span>
          </div>
        )}
        allDaySlot={false}
        height={'75vh'}
        nowIndicator
        slotMinTime={'06:00'}
        eventContent={({ event }) => {
          const startTime = getTime(event.start);
          const endTime = getTime(event.end);

          return (
            <div key={event.id} className={styles.eventContainer}>
              {/* TODO: Avatar */}
              <Typography className={styles.eventText} variant='small'>
                {event.title}
              </Typography>
              <Typography className={styles.eventText}>
                {startTime} - {endTime}
              </Typography>
            </div>
          );
        }}
      />
    </div>
  );
};
