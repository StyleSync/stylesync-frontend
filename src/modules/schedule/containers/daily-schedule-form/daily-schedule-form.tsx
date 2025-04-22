import { useState } from 'react';
import { Switch } from '@/modules/core/components/switch';
import { TimeRangeField } from '@/modules/core/components/time-range-field';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/modules/core/components/button';
import { useIntl } from 'react-intl';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';

export const DailyScheduleForm = () => {
  const { formatMessage } = useIntl();
  const deviceType = useDeviceType();

  const [isWorkdayEnabled, setIsWorkdayEnabled] = useState(false);
  const form = useForm();

  return (
    <form className='inline-block w-full max-w-[400px] md:w-1/2'>
      <div className='flex flex-col gap-3 md:pt-[22px]'>
        <Typography variant='subtitle' weight='medium'>
          20 aug
        </Typography>
        <div className='flex items-center gap-2'>
          <Switch
            checked={isWorkdayEnabled}
            onChange={(val) => setIsWorkdayEnabled(val)}
          />
          <Typography variant='body2'>
            {formatMessage({ id: 'schedule.working.day' })}
          </Typography>
        </div>

        {isWorkdayEnabled && (
          <div className='mt-8 flex flex-col gap-3'>
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
        )}
      </div>
    </form>
  );
};
