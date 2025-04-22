import { useMemo, useState } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { enUS, uk } from 'date-fns/locale';
import { Controller, useForm } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';

import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { DailyScheduleForm } from '@/modules/schedule/containers/daily-schedule-form';

export const DailyScheduleSection = () => {
  const { locale, formatMessage } = useIntl();
  const deviceType = useDeviceType();

  const [isWorkdayEnabled, setIsWorkdayEnabled] = useState(false);

  const dateFnsLocale = useMemo(() => {
    if (locale === 'uk') return uk;

    return enUS;
  }, [locale]);

  return (
    <div className='mb-[100px] flex flex-col gap-8 md:gap-[50px]'>
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
          <div className='h-full w-full max-w-[400px] flex-col md:flex md:min-h-[390px] md:gap-4 md:border-r md:border-gray-light'>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={dateFnsLocale}
            >
              <DateCalendar
                sx={{
                  width: '100%',
                  '& .MuiPickersCalendarHeader-root': {
                    width: deviceType === 'mobile' ? '103%' : '100%',
                    paddingLeft: '0',
                    paddingRight: '0',
                  },
                  '& .MuiDayCalendar-weekDayLabel': {
                    width: '100%',
                  },
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
                    },
                  '& .MuiDateCalendar-root': {
                    height: '100% !important',
                    maxHeight: '440px !important',
                    overflow: 'visible !important',
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <DailyScheduleForm />
      </div>
    </div>
  );
};
