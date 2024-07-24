import { useMemo, type FC } from 'react';
import { getHours, set, getMinutes } from 'date-fns';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useIntl } from 'react-intl';
// components
import { Icon } from '@/modules/core/components/icon';
// type
import type { CalendarProps } from './calendar.interface';
// utils
import { getTime } from '@/modules/schedule/utils/get-time';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
// styles
import styles from './calendarEvent.module.scss';

import './calendar.scss';
import dynamic from 'next/dynamic';

const FullCalendar = dynamic(() => import('@fullcalendar/react'), {
  ssr: false,
});
import { weekdays } from '@/modules/schedule/constants/schedule.constants';
import type { EventInput } from '@fullcalendar/core';
import { Icon } from '@/modules/core/components/icon';

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
    <div className='w-full'>
      <FullCalendar
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
        eventClassNames={() =>
          '!bg-green-light py-2 cursor-pointer hover:saturate-[1.6] hover:shadow hover:border hover:border-green transition'
        }
        height={'75vh'}
        nowIndicator
        eventContent={({ event }) => {
          const startTime = getTime(event.start);
          const endTime = getTime(event.end);

          return (
            <div
              key={event.id}
              className='relative flex flex-col border-l-[3px] border-green pl-3 gap-y-1'
            >
              <div className='flex'>
                <span className='text-base font-medium text-black truncate'>
                  {event.title}
                </span>
              </div>
              <div className='flex items-center gap-x-1'>
                <Icon
                  name='time'
                  width={16}
                  height={16}
                  className='text-gray-accent'
                />
                <span className='text-gray-accent font-medium text-sm'>
                  {startTime} - {endTime}
                </span>
              </div>
              <div className='w-1 h-full bg-green absolute top-0 -left-1 rounded-full' />
            </div>
          );
        }}
      />
    </div>
  );
};
