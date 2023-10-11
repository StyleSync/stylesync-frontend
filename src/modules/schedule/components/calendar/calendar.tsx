import { type FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import type { CalendarProps } from './calendar.interface';
import './calendar.scss';

export const Calendar: FC<CalendarProps> = () => {
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView='timeGridWeek'
      allDaySlot={false}
      dayHeaderFormat={(data) => {
        return `${data.date.day} Mon`;
      }}
    />
  );
};
