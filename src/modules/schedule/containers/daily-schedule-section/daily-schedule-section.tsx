import { type ReactNode, useMemo, useRef, useState } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  PickersDay,
  type PickersDayProps,
} from '@mui/x-date-pickers/PickersDay';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Schedule } from '@prisma/client';
import {
  eachDayOfInterval,
  endOfMonth,
  isSameDay,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { enUS, uk } from 'date-fns/locale';
import { FormattedMessage, useIntl } from 'react-intl';

import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { DailyScheduleForm } from '@/modules/schedule/containers/daily-schedule-form';

const renderCalendarDay = (
  props: PickersDayProps<Date> & {
    selectedDates?: number[];
    schedules?: Schedule[];
  }
): ReactNode => {
  const { selectedDates = [], day, outsideCurrentMonth, ...other } = props;

  const isActive = selectedDates.some((date) => isSameDay(date, day));

  const selectedDay = {
    specificDay: day.getDate(),
    specificMonth: day.getMonth(),
    specificYear: day.getFullYear(),
  };

  const foundSchedule = props.schedules?.find(
    (schedule) =>
      schedule.specificDay === selectedDay.specificDay &&
      schedule.specificMonth === selectedDay.specificMonth &&
      schedule.specificYear === selectedDay.specificYear
  );

  return (
    <div className='relative'>
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        className={
          isActive ? '!bg-primary !text-white' : '!bg-transparent !text-dark'
        }
      />
      {foundSchedule && (
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-[3px]'>
          <div className='h-[5px] w-[5px] rounded-full bg-orange' />
        </div>
      )}
    </div>
  );
};

const initialMonth = new Date();

export const DailyScheduleSection = () => {
  const { locale } = useIntl();
  const deviceType = useDeviceType();
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

  const dateFnsLocale = useMemo(() => {
    if (locale === 'uk') return uk;

    return enUS;
  }, [locale]);

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

      <div className='flex flex-col gap-5 md:flex-row'>
        <div className='flex w-full flex-col md:w-1/2'>
          <div
            ref={calendarWrapperRef}
            className='h-full w-full max-w-[400px] flex-col md:flex md:min-h-[390px] md:gap-4 md:border-r md:border-gray-light'
          >
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={dateFnsLocale}
            >
              <StaticDatePicker
                value={selectedMonth}
                onMonthChange={(value) => {
                  setSelectedMonth(value);
                }}
                onChange={(value) => {
                  if (!value) return;

                  setSelectedDates((prev) => {
                    if (prev.some((item) => isSameDay(item, value))) {
                      return prev.filter((item) => !isSameDay(item, value));
                    }

                    return [...prev, startOfDay(value)];
                  });
                }}
                slots={{
                  day: renderCalendarDay,
                }}
                slotProps={{
                  day: {
                    selectedDates,
                    schedules: schedules ?? [],
                  } as any,
                }}
                sx={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  '& .MuiPickersCalendarHeader-root': {
                    width: deviceType === 'mobile' ? '103%' : '100%',
                    paddingLeft: '0',
                    paddingRight: '0',
                  },

                  '& .MuiDayCalendar-weekDayLabel': {
                    width: '100%',
                    fontSize: '16px',
                  },
                  '& .MuiButtonBase-root': { fontSize: '16px' },
                  '& .MuiPickersCalendarHeader-label': { marginRight: '140px' },
                  '& .MuiPickersDay-root': {
                    width: '40px',
                    height: '40px',
                    margin: '0 auto',
                    aspectRatio: '1',
                    transition: 'all 0.1s ease-in-out',
                  },
                  '& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected': {
                    width: '40px',
                    height: '40px',
                  },
                  '& .MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-today':
                    {
                      width: '40px',
                      height: '40px',
                      color: 'red',
                    },

                  '& .MuiPickersCalendar-root': {
                    height: '100% !important',
                    maxHeight: '440px !important',
                    overflow: 'visible !important',
                  },
                  '& .MuiPickersCalendarHeader-labelContainer': {
                    margin: '0 auto',
                  },
                  '& .MuiPickersCalendarHeader-switchViewButton': {
                    display: 'none',
                  },
                  '& .MuiPickersToolbar-root': { display: 'none' },
                  '& .MuiDialogActions-root': { display: 'none' },
                  '& .MuiPickersDay-today': { border: '1px solid' },
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
