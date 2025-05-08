import { type ReactNode, useMemo, useRef, useState } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  PickersDay,
  type PickersDayProps,
} from '@mui/x-date-pickers/PickersDay';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { isSameDay, startOfDay } from 'date-fns';
import { enUS, uk } from 'date-fns/locale';
import { FormattedMessage, useIntl } from 'react-intl';

import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { DailyScheduleForm } from '@/modules/schedule/containers/daily-schedule-form';

const renderCalendarDay = (
  props: PickersDayProps<Date> & { selectedDates?: number[] }
): ReactNode => {
  const { selectedDates = [], day, outsideCurrentMonth, ...other } = props;

  const isActive = selectedDates.some((date) => isSameDay(date, day));

  return (
    <PickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      className={
        isActive ? '!bg-primary !text-white' : '!bg-transparent !text-dark'
      }
    />
  );
};

export const DailyScheduleSection = () => {
  const { locale } = useIntl();
  const deviceType = useDeviceType();
  const calendarWrapperRef = useRef<HTMLDivElement>(null);

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

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
                value={new Date()}
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
