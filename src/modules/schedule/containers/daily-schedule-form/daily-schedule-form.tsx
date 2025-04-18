import { useMemo } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { enUS, uk } from 'date-fns/locale';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Switch } from '@/modules/core/components/switch';
import { TimeRangeField } from '@/modules/core/components/time-range-field';
import { Typography } from '@/modules/core/components/typogrpahy';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { Button } from '@/modules/core/components/button';

export const DailyScheduleForm = () => {
  const { locale, formatMessage } = useIntl();
  const deviceType = useDeviceType();

  const form = useForm();

  const dateFnsLocale = useMemo(() => {
    if (locale === 'uk') return uk;

    return enUS;
  }, [locale]);

  return (
    <div className='flex flex-col gap-5 md:flex-row'>
      <div className='flex w-full flex-col md:w-1/2'>
        <span>{formatMessage({ id: 'daily.schedule.description' })}</span>

        <div className='h-full w-full max-w-[400px] flex-col md:flex md:gap-4'>
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
                // '& .MuiDayCalendar-root': {
                //   width: '100%',
                //   overflow: 'visible !important',
                // },
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
                // '& .MuiDayCalendar-monthContainer': {
                //   width: '100%',
                // },
                // '& .MuiDayCalendar-weekContainer': {
                //   width: '100%',
                //   '& > div': {
                //     flex: 1,
                //     minWidth: 0,
                //   },
                // },
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
      <form className='inline-block w-full md:w-1/2'>
        <div className='flex flex-col gap-3'>
          <Typography variant='subtitle' weight='medium'>
            20 aug
          </Typography>
          <div className='flex gap-2'>
            <Switch />
            <Typography variant='body2'>
              {formatMessage({ id: 'schedule.working.day' })}
            </Typography>
          </div>

          <div>
            <Controller
              name='workHours'
              control={form.control}
              render={({ field, fieldState }) => (
                <TimeRangeField
                  value={field.value}
                  label={formatMessage({ id: 'schedule.working.hours' })}
                  onChange={field.onChange}
                  inputProps={{
                    fieldSize: 'high',
                    error: Boolean(fieldState.error),
                    // disabled: weekdayScheduleSaveMutation.isLoading,
                    bigbtn: true,
                  }}
                  popoverProps={{
                    disablePortal: true,
                  }}
                />
              )}
            />
          </div>

          <div className='flex items-center gap-4'>
            <Typography className='mb-3 mt-4' variant='body1' weight='medium'>
              {formatMessage({ id: 'schedule.form.breaks' })}
            </Typography>
            <Button
              icon='plus'
              className='!h-8 !w-8 !bg-primary-light !text-primary'
              // onClick={handleAddBreak}
            />
          </div>

          <div>
            <Controller
              control={form.control}
              name={`breaks.timerange`}
              render={({ field, fieldState }) => (
                <TimeRangeField
                  value={'breaks'}
                  // className={styles.timerange}
                  onChange={field.onChange}
                  inputProps={{
                    fieldSize: deviceType === 'mobile' ? 'medium' : 'small',
                    error: Boolean(fieldState.error),
                    // disabled: weekdayScheduleSaveMutation.isLoading,
                  }}
                  popoverProps={{
                    disablePortal: true,
                  }}
                />
              )}
            />
            {/* <Button
              // className={styles.delete}
              // onClick={() => remove(index)}
              variant='unstyled'
              icon='close'
              type='button'
            /> */}
          </div>

          <div className='mt-7 flex w-full justify-center gap-4'>
            <Button
              className='flex-1'
              text={formatMessage({ id: 'button.cancel' })}
              variant='outlined'
              // onClick={handleCloseEdit}
            />

            <Button
              className='flex-1'
              text={formatMessage({ id: 'button.save' })}
              variant='primary'
              type='submit'
              // isLoading={weekdayScheduleSaveMutation.isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
