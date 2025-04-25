import { type FC, useCallback, useEffect, useMemo } from 'react';

import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';
import { Switch } from '@/modules/core/components/switch';
import { TimeRangeField } from '@/modules/core/components/time-range-field';
import { Typography } from '@/modules/core/components/typogrpahy';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { z } from 'zod';
import {
  emptyTimeRange,
  formatTimeRange,
  parseTimeRange,
  Time,
} from '@/modules/core/utils/time.utils';
import clsx from 'clsx';
import type { DailySchedule } from '@/modules/schedule/types/schedule.types';

import styles from './daily-schedule-form.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { emptySchedule } from '@/modules/schedule/constants/schedule.constants';
import { mapDateToDayEnum } from '@/modules/core/utils/date.utils';
import { format } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';
import { DailyScheduleFormProps } from './daily-schedule-form.interface';
import { useBoolean } from 'usehooks-ts';
import { showToast } from '@/modules/core/providers/toast-provider';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';

const crudMutationOpts = {
  useErrorBoundary: true,
};

const workHoursSchema = z.string().refine((args) => {
  try {
    const [start, end] = parseTimeRange(args);

    return Time.toMinuteDuration(start) < Time.toMinuteDuration(end);
  } catch {
    return true;
  }
});

const validationSchema = z.object({
  workHours: workHoursSchema,
  breaks: z.array(
    z.object({
      id: z.string().optional(),
      timerange: workHoursSchema,
    })
  ),
});

type DayScheduleFormValues = Omit<DailySchedule, 'isActive'>;

export const DailyScheduleForm: FC<DailyScheduleFormProps> = ({
  dates,
  handleReset,
}) => {
  const { formatMessage, locale } = useIntl();
  const deviceType = useDeviceType();
  const isWorkdayEnabled = useBoolean();

  // Format the date for display based on current locale
  const dateLocale = locale === 'uk' ? uk : enUS;
  const formattedDate = useMemo(() => {
    return dates
      .map((date) => format(date, 'd MMM', { locale: dateLocale }))
      .join(', ')
      .replaceAll('.', '');
  }, [dates, dateLocale]);

  // queries
  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  const {
    formState: { isDirty },
    watch,
    reset,
    control,
    handleSubmit,
  } = useForm<DayScheduleFormValues>({
    defaultValues: emptySchedule.MONDAY,
    resolver: zodResolver(validationSchema),
  });

  const specificDayScheduleQuery =
    trpc.schedule.getSpecificDaySchedule.useQuery(
      {
        professionalId: me?.professional?.id || '',
        specificDay: dates[0]?.getDate(),
        specificMonth: dates[0]?.getMonth(),
        specificYear: dates[0]?.getFullYear(),
      },
      {
        enabled: !!me?.professional?.id && dates.length === 1,
        retry: false,
      }
    );

  const { data: weekSchedule, ...weekScheduleQuery } =
    trpc.schedule.getWeekSchedule.useQuery(
      {
        professionalId: me?.professional?.id ?? '',
      },
      {
        enabled: !!me?.professional,
      }
    );

  const weekdaySchedule = useMemo(() => {
    if (dates.length === 1 && weekSchedule) {
      return weekSchedule.find(
        (item) => item.day === mapDateToDayEnum(dates[0])
      );
    }

    return null;
  }, [weekSchedule, dates]);

  const isAccordingToWeeklySchedule =
    !specificDayScheduleQuery.data && weekdaySchedule && !isDirty;

  const isOverridesWeeklySchedule =
    weekdaySchedule && (specificDayScheduleQuery.data || isDirty);

  const dailyScheduleCreate =
    trpc.schedule.createBulk.useMutation(crudMutationOpts);

  const dailyScheduleDelete =
    trpc.schedule.delete.useMutation(crudMutationOpts);

  const onSubmit = (formValues: DayScheduleFormValues) => {
    const existingSchedule = specificDayScheduleQuery.data;

    const isMultipleDates = dates.length > 1;

    const [start, end] = parseTimeRange(
      formValues.workHours,
      'date',
      Date.now()
    );

    if (!isWorkdayEnabled.value && existingSchedule && !isMultipleDates) {
      dailyScheduleDelete.mutate(
        { id: existingSchedule.id },
        {
          onSuccess: () => {
            showToast({
              variant: 'success',
              title: 'Графік на день видалено',
            });
          },
        }
      );

      return;
    }

    dailyScheduleCreate.mutate(
      {
        schedules: dates.map((date) => ({
          day: mapDateToDayEnum(date),
          start: start.toISOString(),
          end: end.toISOString(),
          isSpecificDay: true,
          specificDay: date.getDate(),
          specificMonth: date.getMonth(),
          specificYear: date.getFullYear(),
          breaks: formValues.breaks.map((item) => {
            const [breakStart, breakEnd] = parseTimeRange(
              item.timerange,
              'date',
              Date.now()
            );

            return {
              start: breakStart.toISOString(),
              end: breakEnd.toISOString(),
            };
          }),
        })),
      },
      {
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: 'Графік успішно збережено',
          });
        },
      }
    );
  };

  const { fields, append, remove } = useFieldArray({
    name: 'breaks',
    control: control,
    keyName: '_id',
  });

  const handleAddBreak = useCallback(() => {
    append({
      timerange: emptyTimeRange,
    });
  }, [append]);

  useEffect(() => {
    // if (specificDayScheduleQuery.isLoading || dates.length === 0) {
    //   console.log('not ready to reset');
    //   return;
    // }

    if (dates.length > 1) {
      console.log('reset as dates.length > 1');
      reset({
        workHours: emptyTimeRange,
        breaks: [],
      });

      isWorkdayEnabled.setTrue();

      return;
    }

    const existingSchedule = specificDayScheduleQuery.data || weekdaySchedule;

    if (existingSchedule) {
      console.log('reset according to existing schedule');
      reset({
        workHours: formatTimeRange(
          Time.fromDate(existingSchedule.start),
          Time.fromDate(existingSchedule.end)
        ),
        breaks: existingSchedule.breaks.map((item) => ({
          timerange: formatTimeRange(
            Time.fromDate(item.start),
            Time.fromDate(item.end)
          ),
        })),
      });

      isWorkdayEnabled.setTrue();

      return;
    }

    console.log('should reset to day off in the end');

    reset({ ...emptySchedule.MONDAY });
    isWorkdayEnabled.setFalse();
  }, [
    // need to be careful with this dependency
    specificDayScheduleQuery.data?.id,
    weekdaySchedule,
    JSON.stringify(dates),
  ]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='inline-block w-full max-w-[400px] md:w-1/2'
    >
      <div className='flex flex-col gap-6 md:pt-[22px]'>
        <Typography variant='subtitle' weight='medium' className='capitalize'>
          {formattedDate}
        </Typography>

        <Placeholder
          placeholder={
            <div className='py-8'>
              <Spinner size='medium' />
            </div>
          }
          isActive={specificDayScheduleQuery.isLoading}
        >
          {isAccordingToWeeklySchedule && (
            <div className='flex items-center'>
              <span className='text-sm font-normal'>
                According to the weekly schedule
              </span>
            </div>
          )}
          {isOverridesWeeklySchedule && (
            <div className='flex items-center'>
              <span className='text-sm font-normal'>
                Overrides weekly schedule
              </span>
              <Button
                icon='arrow-left'
                variant='secondary'
                className='h-[20px] w-[20px] text-destructive'
                onClick={() => {
                  // todo: move outside jsx
                  if (!weekdaySchedule) {
                    return;
                  }

                  reset({
                    workHours: formatTimeRange(
                      Time.fromDate(weekdaySchedule.start),
                      Time.fromDate(weekdaySchedule.end)
                    ),
                    breaks: weekdaySchedule.breaks.map((item) => ({
                      timerange: formatTimeRange(
                        Time.fromDate(item.start),
                        Time.fromDate(item.end)
                      ),
                    })),
                  });

                  isWorkdayEnabled.setTrue();

                  if (specificDayScheduleQuery.data) {
                    dailyScheduleDelete.mutate({
                      id: specificDayScheduleQuery.data.id,
                    });
                  }

                  return;
                }}
              />
            </div>
          )}
          {dates.length <= 1 && (
            <div className='flex items-center gap-2'>
              <Switch
                checked={isWorkdayEnabled.value}
                onChange={(val) => isWorkdayEnabled.setValue(val)}
              />
              <Typography variant='body2'>
                {formatMessage({ id: 'schedule.working.day' })}
              </Typography>
            </div>
          )}

          {(isWorkdayEnabled.value || dates.length > 1) && (
            <div className='mt-2 flex flex-col gap-3'>
              <Controller
                name='workHours'
                control={control}
                render={({ field, fieldState }) => (
                  <TimeRangeField
                    value={field.value}
                    label={formatMessage({ id: 'schedule.working.hours' })}
                    onChange={field.onChange}
                    inputProps={{
                      fieldSize: 'high',
                      error: Boolean(fieldState.error),
                      bigbtn: true,
                      className: '!bg-transparent',
                      classes: {
                        fieldset: '!border-gray-accent !border',
                      },
                    }}
                    popoverProps={{
                      disablePortal: true,
                    }}
                  />
                )}
              />

              <div className='flex items-center gap-5'>
                <Typography
                  className='mb-3 mt-4'
                  variant='body1'
                  weight='medium'
                >
                  {formatMessage({ id: 'schedule.form.breaks' })}
                </Typography>
                <Button
                  icon='plus'
                  className='!h-8 !w-8 !bg-primary-light !text-primary'
                  onClick={handleAddBreak}
                />
              </div>

              <div className={clsx(styles.cell, styles.xPadding)}>
                <div className='flex w-full flex-wrap items-center gap-4'>
                  {fields.map((item, index) => (
                    <div
                      key={item._id}
                      className='flex w-full items-center gap-1'
                    >
                      <Controller
                        control={control}
                        name={`breaks.${index}.timerange`}
                        render={({ field, fieldState }) => (
                          <TimeRangeField
                            className='flex-1'
                            value={field.value}
                            onChange={field.onChange}
                            inputProps={{
                              fieldSize: 'high',
                              error: Boolean(fieldState.error),
                              bigbtn: true,
                              className: '!bg-transparent',
                              classes: {
                                fieldset: '!border-gray-accent !border',
                              },
                            }}
                            popoverProps={{
                              disablePortal: true,
                            }}
                          />
                        )}
                      />
                      <Button
                        className='h-[20px] w-[20px] text-destructive'
                        onClick={() => remove(index)}
                        variant='unstyled'
                        icon='close'
                        type='button'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className='mt-4 flex w-full justify-center gap-4'>
            <Button
              className='flex-1'
              text={formatMessage({ id: 'button.cancel' })}
              variant='outlined'
              onClick={handleReset}
            />

            <Button
              className='flex-1'
              text={formatMessage({ id: 'button.save' })}
              variant='primary'
              type='submit'
              isLoading={
                dailyScheduleCreate.isLoading || dailyScheduleDelete.isLoading
              }
            />
          </div>
        </Placeholder>
      </div>
    </form>
  );
};
