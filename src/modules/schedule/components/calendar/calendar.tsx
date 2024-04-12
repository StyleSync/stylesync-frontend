import { type FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { format } from 'date-fns';
import type { CalendarProps } from './calendar.interface';
// import { trpc } from '@/modules/core/utils/trpc.utils';

import './calendar.scss';
// import styles from './calendarEvent.module.scss';
// import { Typography } from '@/modules/core/components/typogrpahy';
// import { Avatar } from '@/modules/core/components/avatar';

// const events = [
//   {
//     id: '2',
//     title: 'Событие',
//     start: new Date(2024, 3, 11, 13, 0, 0),
//     end: new Date(2024, 3, 11, 14, 0, 0),
//     // color: '#26c967',
//   },
//   {
//     id: '3',
//     title: 'Событие',
//     start: new Date(2024, 3, 12, 13, 0, 0),
//     end: new Date(2024, 3, 12, 14, 0, 0),
//     // color: '#26c967',
//   },
// ];

// const now = new Date().toISOString();

export const Calendar: FC<CalendarProps> = () => {
  // queries
  // const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  // const [upcomingEvents] = trpc.booking.list.useSuspenseQuery({
  //   expand: ['serviceProfessional'],
  //   sortField: 'date',
  //   startDate: now,
  //   professionalId: me.professional?.id,
  // });
  // const [pastEvents] = trpc.booking.list.useSuspenseQuery({
  //   expand: ['serviceProfessional'],
  //   sortField: 'date',
  //   endDate: now,
  //   professionalId: me.professional?.id,
  // });

  // const eventComponents = events.map((event) => (
  //   <div key={event.id} className={styles.eventContainer}>
  //     <Avatar shadow size='small' />
  //     <Typography>{event.title}</Typography>
  //     <Typography>time</Typography>
  //   </div>
  // ));

  return (
    <div className='mostly-customized'>
      <FullCalendar
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
        plugins={[timeGridPlugin]}
        initialView='timeGridWeek'
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
        buttonText={{ today: 'Today' }}
        nowIndicator
        slotMinTime={'07:00'}
        eventBackgroundColor='#26c967'
        eventBorderColor='#26c967'
        // events={events}
        // eventContent={eventComponents}
      />
    </div>
  );
};
