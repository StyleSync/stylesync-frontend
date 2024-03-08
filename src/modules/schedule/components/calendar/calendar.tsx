import { type FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { format } from 'date-fns';
import type { CalendarProps } from './calendar.interface';

import './calendar.scss';

// TODO
// const today = new Date();
// const events = [
//   {
//     id: '2',
//     title: 'Событие',
//     start: new Date(2024, 2, 2, 13, 0, 0),
//     end: new Date(2024, 2, 2, 14, 0, 0),
//   },
//   {
//     id: '3',
//     title: 'Событие',
//     start: new Date(2024, 2, 4, 13, 0, 0),
//     end: new Date(2024, 2, 4, 14, 0, 0),
//   },
//   {
//     id: '4',
//     title: 'Событие',
//     start: new Date(2024, 2, 5, 15, 0, 0),
//     end: new Date(2024, 2, 5, 16, 0, 0),
//   },
// ];

export const Calendar: FC<CalendarProps> = () => {
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
        // events={events}
        height={'75vh'}
        buttonText={{ today: 'Today' }}
        nowIndicator
        slotMinTime={'07:00'}
      />
    </div>
  );
};
