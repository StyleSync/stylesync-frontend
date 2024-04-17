import { type FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { format, getHours, set, getMinutes } from 'date-fns';
import type { CalendarProps } from './calendar.interface';
import { trpc } from '@/modules/core/utils/trpc.utils';

import './calendar.scss';
import styles from './calendarEvent.module.scss';
import { Typography } from '@/modules/core/components/typogrpahy';

export const Calendar: FC<CalendarProps> = () => {
  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  const [events] = trpc.booking.list.useSuspenseQuery({
    expand: ['serviceProfessional'],
    professionalId: me.professional?.id,
  });

  const handleViewMount = ({ el }: { el: HTMLElement }) => {
    const timeZone = format(new Date(), 'zzzz').replace('GMT', 'GMT ');
    const timeGridAxis = el.querySelector('.fc-timegrid-axis-frame');

    if (timeGridAxis) {
      timeGridAxis.innerHTML = `<span style="font-size: 11px">${timeZone}</span>`;
    }
  };

  return (
    <div className='mostly-customized'>
      <FullCalendar
        viewDidMount={handleViewMount}
        eventBackgroundColor='#26c967'
        plugins={[timeGridPlugin]}
        initialView='timeGridWeek'
        customButtons={{
          customButtons: {
            text: 'Approved',
          },
          customButtons2: {
            text: 'Requested',
          },
          customButtons3: {
            text: 'Past',
          },
        }}
        buttonText={{ today: 'Today' }}
        headerToolbar={{
          left: 'today prev,next',
          center: 'title',
          right: 'customButtons customButtons2 customButtons3',
        }}
        dayHeaderFormat={({ date }) => format(date.marker, 'dd E')}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: false,
        }}
        slotLabelContent={({ date }) => (
          <div className='left-col'>
            <span>{format(date, 'hh:mm')}</span>
          </div>
        )}
        allDaySlot={false}
        height={'75vh'}
        nowIndicator
        slotMinTime={'07:00'}
        events={events.map((event) => ({
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
        }))}
        eventContent={({ event }) => {
          const startTime = format(
            event.start ? new Date(event.start) : new Date(),
            'HH:mm'
          );
          const endTime = format(
            event.end ? new Date(event.end) : new Date(),
            'HH:mm'
          );

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
