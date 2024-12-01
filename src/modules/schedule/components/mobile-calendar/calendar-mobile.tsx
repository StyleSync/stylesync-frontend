import dynamic from 'next/dynamic';
import { type FC, useEffect, useState } from 'react';
import { type CalendarMobileProps } from './calendar-mobile.interface';
import dayGridPlugin from '@fullcalendar/daygrid';
// import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
// import { useIntl } from 'react-intl';
// import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
import './calendar-mobile';
import { DateSelectCalendar } from '@/modules/schedule/components/data-select-calendar';
import { DateSliderCalendar } from '../date-slider-calendar';
import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';

const FullCalendar = dynamic(() => import('@fullcalendar/react'), {
  ssr: false,
});

export const CalendarMobile: FC<CalendarMobileProps> = () => {
  // const intl = useIntl();

  const [selectedDates, setSelectedDates] = useState<Date[]>();

  useEffect(() => {
    const today = new Date();
    const startDay = startOfMonth(today);
    const endDay = endOfMonth(today);
    const daysOfMonth = eachDayOfInterval({ start: startDay, end: endDay });

    setSelectedDates(daysOfMonth);
  }, []);

  return (
    <div className='relative flex w-full flex-col gap-5'>
      <div className='pl-6'>
        <DateSelectCalendar onMonthChange={setSelectedDates} />
      </div>
      <div className='relative flex w-full max-w-full pb-4'>
        <DateSliderCalendar days={selectedDates || []} />
      </div>

      <div className='h-full border-t border-primary-light pl-6'>
        <FullCalendar
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
          allDaySlot={false}
          height={'75vh'}
          nowIndicator
        />
      </div>
    </div>
  );
};
