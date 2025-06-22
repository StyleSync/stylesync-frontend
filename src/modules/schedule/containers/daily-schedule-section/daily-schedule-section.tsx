import { type ReactNode, useMemo, useRef, useState } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  PickersDay,
  type PickersDayProps,
} from '@mui/x-date-pickers/PickersDay';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Schedule } from '@prisma/client';
import clsx from 'clsx';
import {
  eachDayOfInterval,
  endOfMonth,
  isPast,
  isSameDay,
  isToday,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { enUS, uk } from 'date-fns/locale';
import { FormattedMessage, useIntl } from 'react-intl';

import { mapDateToDayEnum } from '@/modules/core/utils/date.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { DailyScheduleForm } from '@/modules/schedule/containers/daily-schedule-form';
import { isScheduleDayOff } from '@/modules/schedule/utils/schedule.utils';
import { AppRouterOutputs } from '@/server/types';

const renderCalendarDay = (
  props: PickersDayProps<Date> & {
    selectedDates?: number[];
    schedules?: Schedule[];
    weeklySchedule?: AppRouterOutputs['schedule']['getWeekSchedule'];
  }
): ReactNode => {
  const { selectedDates = [], day, outsideCurrentMonth, ...other } = props;

  const isActive = selectedDates.some((date) => isSameDay(date, day));
  const _isPast = isPast(day) && !isToday(day);

  const selectedDay = {
    specificDay: day.getDate(),
    specificMonth: day.getMonth(),
    specificYear: day.getFullYear(),
  };

  const foundSchedule =
    props.schedules?.find(
      (schedule) =>
        schedule.specificDay === selectedDay.specificDay &&
        schedule.specificMonth === selectedDay.specificMonth &&
        schedule.specificYear === selectedDay.specificYear
    ) ||
    props.weeklySchedule?.find(
      (schedule) => schedule.day === mapDateToDayEnum(day)
    );

  const isSchedule = foundSchedule && !isScheduleDayOff(foundSchedule);
  const showIndicators =
    props.schedules !== undefined && props.weeklySchedule !== undefined;

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      className={clsx('!rounded-xl !border-none !text-lg !font-medium', {
        '!bg-primary !text-white': isActive,
        '!bg-transparent !text-accent': !isActive && isToday(day),
        '!bg-transparent !text-dark': !isActive && !isToday(day),
        '!text-gray': _isPast,
      })}
    >
      {day.getDate()}
      {showIndicators && (
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2'>
          <div
            className={clsx('h-[5px] w-[5px] rounded-full', {
              '!bg-orange': foundSchedule && isSchedule,
              '!bg-green': !foundSchedule || (foundSchedule && !isSchedule),
            })}
          />
        </div>
      )}
    </PickersDay>
  );
};

const initialMonth = new Date();

export const DailyScheduleSection = () => {
  const { locale, formatMessage } = useIntl();
  const calendarWrapperRef = useRef<HTMLDivElement>(null);
  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(initialMonth);

  const allMonthDays = useMemo(() => {
    const start = startOfMonth(selectedMonth);
    const end = endOfMonth(selectedMonth);
    const days = eachDayOfInterval({ start, end });

    return days.map((date) => ({
      specificDay: date.getDate(),
      specificMonth: date.getMonth(),
      specificYear: date.getFullYear(),
    }));
  }, [selectedMonth]);

  const { data: schedules } = trpc.schedule.listByDay.useQuery(
    {
      days: allMonthDays,
      professionalId: me?.professional?.id ?? '',
    },
    {
      enabled: !!me?.professional?.id,
    }
  );

  const weekScheduleQuery = trpc.schedule.getWeekSchedule.useQuery(
    {
      professionalId: me?.professional?.id ?? '',
    },
    {
      enabled: !!me?.professional,
    }
  );

  const dateFnsLocale = useMemo(() => {
    if (locale === 'uk') return uk;

    return enUS;
  }, [locale]);

  const handleDateChange = (value: Date | null) => {
    if (!value) return;

    if (isPast(value) && !isToday(value)) return;

    const normalizedDate = startOfDay(value);

    setSelectedDates((prev) => {
      if (prev.some((item) => isSameDay(item, normalizedDate))) {
        return prev.filter((item) => !isSameDay(item, normalizedDate));
      }

      return [...prev, normalizedDate];
    });
  };

  const handleResetSelectDate = () => {
    setSelectedDates([]);
  };

  return (
    <div className='flex w-full flex-col gap-8 md:gap-[50px]'>
      <span className='inline-block max-w-[800px]'>
        <FormattedMessage
          id='daily.schedule.description'
          values={{
            highlight: (chunks) => (
              <span
                onClick={() =>
                  document
                    .getElementById('divFirst')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className='cursor-pointer font-semibold text-primary'
              >
                {chunks}
              </span>
            ),
          }}
        />
      </span>

      <div className='flex flex-col gap-10 md:flex-row md:gap-0'>
        <div className='flex w-full flex-col md:w-1/2'>
          <div
            ref={calendarWrapperRef}
            className='h-full w-full max-w-[400px] flex-col md:flex md:flex-col-reverse md:gap-6 md:border-r md:border-gray-light md:pr-4'
          >
            <div className='mb-4 flex flex-row gap-4 rounded-lg p-2'>
              <div className='flex gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='h-[8px] w-[8px] rounded-full bg-green' />
                  <span className='text-sm font-medium text-dark'>
                    {formatMessage({ id: 'day.off' })}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='h-[8px] w-[8px] rounded-full bg-orange' />
                  <span className='text-sm font-medium text-dark'>
                    {formatMessage({ id: 'working.day' })}
                  </span>
                </div>
              </div>
            </div>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={dateFnsLocale}
            >
              <StaticDatePicker
                value={selectedMonth}
                onMonthChange={(value) => {
                  setSelectedMonth(value);
                }}
                slots={{
                  actionBar: () => null,
                  day: renderCalendarDay,
                  toolbar: () => null,
                  switchViewButton: () => null,
                }}
                slotProps={{
                  day: {
                    selectedDates,
                    schedules: schedules ?? [],
                    onDaySelect: handleDateChange,
                    weeklySchedule: weekScheduleQuery.data,
                  } as any,
                }}
                sx={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  '& .MuiDateCalendar-root': {
                    width: '100%',
                  },
                  '& .MuiDayCalendar-weekContainer': {
                    justifyContent: 'space-between',
                  },
                  '& .MuiDayCalendar-header': {
                    justifyContent: 'space-between',
                  },
                  '& .MuiPickersDay-root': {
                    height: '40px',
                  },
                  '& .MuiDayCalendar-weekDayLabel': {
                    fontSize: '16px',
                  },
                  '& .MuiPickersCalendarHeader-root': {
                    paddingLeft: '8px',
                    paddingRight: '0',
                    marginBottom: '10px',
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        {selectedDates.length > 0 && (
          <DailyScheduleForm
            handleReset={handleResetSelectDate}
            dates={selectedDates}
          />
        )}
      </div>
    </div>
  );
};
