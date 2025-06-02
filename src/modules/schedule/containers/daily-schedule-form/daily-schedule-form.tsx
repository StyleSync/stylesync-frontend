import { type FC, useCallback, useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { sendGTMEvent } from '@next/third-parties/google';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { add, differenceInMinutes, format, startOfDay } from 'date-fns';
import { enUS, uk } from 'date-fns/locale';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';
import { z } from 'zod';

import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';
import { Switch } from '@/modules/core/components/switch';
import { TimeRangeField } from '@/modules/core/components/time-range-field-v2';
import { Typography } from '@/modules/core/components/typogrpahy';
import { showToast } from '@/modules/core/providers/toast-provider';
import { mapDateToDayEnum } from '@/modules/core/utils/date.utils';
import {
  emptyTimeRange,
  formatTimeRange,
  parseTimeRange,
  Time,
} from '@/modules/core/utils/time.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { emptySchedule } from '@/modules/schedule/constants/schedule.constants';
import { DayOverrideModal } from '@/modules/schedule/containers/day-override-modal';
import type { DailySchedule } from '@/modules/schedule/types/schedule.types';
import { isScheduleDayOff } from '@/modules/schedule/utils/schedule.utils';

import { DailyScheduleFormProps } from './daily-schedule-form.interface';

const workHoursSchema = z.string().refine((args) => {
  try {
    const [start, end] = parseTimeRange(args);

    return Time.toMinuteDuration(start) < Time.toMinuteDuration(end);
  } catch {
    return true;
  }
});

const workDaysSchema = z.object({
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
  const isWorkdayEnabled = useBoolean();
  const isOpenModalDayOverride = useBoolean();
  const queryClient = useQueryClient();

  // Format the date for display based on current locale
  const dateLocale = locale === 'uk' ? uk : enUS;
  const formattedDate = useMemo(() => {
    return dates
      .map((date) => format(date, 'dd.MM.yyyy', { locale: dateLocale }))
      .join(', ');
  }, [dates, dateLocale]);

  const formattedDate2 = useMemo(() => {
    return dates
      .map((date) => format(date, 'dd MMM yyyy', { locale: dateLocale }))
      .join(', ');
  }, [dates, dateLocale]);

  // queries
  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  const {
    formState: { isDirty },
    reset,
    control,
    handleSubmit,
  } = useForm<DayScheduleFormValues>({
    defaultValues: {
      workHours: emptyTimeRange,
      breaks: [],
    },
    resolver: zodResolver(workDaysSchema),
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
        enabled: !!me?.professional?.id && dates.length === 1 && !!dates[0],
        retry: false,
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

  const weekdaySchedule = useMemo(() => {
    if (dates.length === 1 && weekScheduleQuery.data) {
      return weekScheduleQuery.data.find(
        (item) => item.day === mapDateToDayEnum(dates[0])
      );
    }

    return null;
  }, [weekScheduleQuery.data, dates]);

  const isAccordingToWeeklySchedule =
    !specificDayScheduleQuery.data && weekdaySchedule && !isDirty;

  const isOverridesWeeklySchedule =
    weekdaySchedule &&
    ((specificDayScheduleQuery.data &&
      !isScheduleDayOff(specificDayScheduleQuery.data)) ||
      isDirty);

  const dailyScheduleCreate = trpc.schedule.createBulk.useMutation();

  const dailyScheduleDelete = trpc.schedule.delete.useMutation();

  const onSubmit = (formValues: DayScheduleFormValues) => {
    const existingSchedule = specificDayScheduleQuery.data;

    const isMultipleDates = dates.length > 1;

    const [start, end] = parseTimeRange(
      formValues.workHours,
      'date',
      Date.now()
    );

    if (!isWorkdayEnabled.value && !isMultipleDates) {
      if (existingSchedule && !weekdaySchedule) {
        dailyScheduleDelete.mutate(
          { id: existingSchedule.id },
          {
            onSuccess: () => {
              showToast({
                variant: 'success',
                title: formatMessage({ id: 'daily.toast.schedule.deleted' }),
              });

              sendGTMEvent({
                event: 'schedule_add',
                user_id: me?.id,
                user_email: me?.email,
                data: {
                  isWeeklySchedule: false,
                  isSpecificDay: true,
                  isDayOff: true,
                  scheduleDay: Boolean(dates[0]),
                  hasBreaks: false,
                },
              });

              const listByDayKey = getQueryKey(trpc.schedule.listByDay);

              queryClient.resetQueries({
                queryKey: listByDayKey,
                exact: false,
              });
            },
          }
        );
      }

      if (weekdaySchedule) {
        // create schedule with 1 second duration that represents day off
        dailyScheduleCreate.mutate(
          {
            schedules: dates.map((date) => ({
              day: mapDateToDayEnum(date),
              start: startOfDay(date).toISOString(),
              end: add(startOfDay(date), { seconds: 1 }).toISOString(),
              isSpecificDay: true,
              specificDay: date.getDate(),
              specificMonth: date.getMonth(),
              specificYear: date.getFullYear(),
              breaks: [],
              isDayOff: true,
            })),
          },
          {
            onSuccess: () => {
              const queryKey = getQueryKey(
                trpc.schedule.getSpecificDaySchedule
              );
              const listByDayKey = getQueryKey(trpc.schedule.listByDay);

              queryClient.resetQueries({ queryKey, exact: false });
              queryClient.resetQueries({
                queryKey: listByDayKey,
                exact: false,
              });

              sendGTMEvent({
                event: 'schedule_add',
                user_id: me?.id,
                user_email: me?.email,
                data: {
                  isWeeklySchedule: false,
                  isSpecificDay: true,
                  isDayOff: true,
                  scheduleDay: Boolean(dates[0]),
                  hasBreaks: false,
                  specificDay: Boolean(dates[0]?.getDate()),
                  specificMonth: Boolean(dates[0]?.getMonth()),
                  specificYear: Boolean(dates[0]?.getFullYear()),
                  start: Boolean(startOfDay(dates[0])),
                  end: Boolean(add(startOfDay(dates[0]), { seconds: 1 })),
                },
              });
            },
          }
        );
      }

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
            title: formatMessage({ id: 'daily.toast.schedule.saved' }),
          });

          const listByDayKey = getQueryKey(trpc.schedule.listByDay);
          const queryKey = getQueryKey(trpc.schedule.getSpecificDaySchedule);

          queryClient.resetQueries({
            queryKey: listByDayKey,
            exact: false,
          });
          queryClient.resetQueries({ queryKey, exact: false });

          if (dates.length > 1) {
            handleReset();
          }

          sendGTMEvent({
            event: 'schedule_add',
            user_id: me?.id,
            user_email: me?.email,
            data: {
              isWeeklySchedule: false,
              isSpecificDay: true,
              isDayOff: false,
              scheduleDay: Boolean(dates[0]),
              hasBreaks: Boolean(formValues.breaks.length > 0),
              specificDay: Boolean(dates[0]?.getDate()),
              specificMonth: Boolean(dates[0]?.getMonth()),
              specificYear: Boolean(dates[0]?.getFullYear()),
              start: Boolean(start),
              end: Boolean(end),
            },
          });
        },
      }
    );
  };

  const { fields, append, remove } = useFieldArray({
    name: 'breaks',
    control,
    keyName: '_id',
  });

  const handleResetToWeeklySchedule = () => {
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
    isOpenModalDayOverride.setFalse();

    sendGTMEvent({
      event: 'schedule_add',
      user_id: me?.id,
      user_email: me?.email,
      data: {
        isWeeklySchedule: true,
        isSpecificDay: false,
        isDayOff: false,
        scheduleDay: Boolean(weekdaySchedule.day),
        hasBreaks: Boolean(weekdaySchedule.breaks.length > 0),
      },
    });

    if (specificDayScheduleQuery.data) {
      dailyScheduleDelete.mutate(
        {
          id: specificDayScheduleQuery.data.id,
        },
        {
          onSuccess: () => {
            const queryKey = getQueryKey(trpc.schedule.getSpecificDaySchedule);
            const listByDayKey = getQueryKey(trpc.schedule.listByDay);

            queryClient.resetQueries({ queryKey, exact: false });
            queryClient.resetQueries({ queryKey: listByDayKey, exact: false });

            sendGTMEvent({
              event: 'schedule_add',
              user_id: me?.id,
              user_email: me?.email,
              data: {
                isWeeklySchedule: true,
                isSpecificDay: false,
                isDayOff: false,
                scheduleDay: Boolean(weekdaySchedule.day),
                hasBreaks: Boolean(weekdaySchedule.breaks.length > 0),
                deleted: true,
              },
            });
          },
        }
      );
    }

    return;
  };

  const handleAddBreak = useCallback(() => {
    append({
      timerange: emptyTimeRange,
    });
  }, [append]);

  useEffect(() => {
    if (dates.length > 1) {
      reset({
        workHours: emptyTimeRange,
        breaks: [],
      });

      isWorkdayEnabled.setTrue();

      return;
    }

    const existingSchedule = specificDayScheduleQuery.data || weekdaySchedule;

    const maxMinutes = 15;

    const isExistingScheduleDayOff =
      !!existingSchedule &&
      differenceInMinutes(existingSchedule.end, existingSchedule.start) <
        maxMinutes;

    if (existingSchedule && !isExistingScheduleDayOff) {
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

    reset({ ...emptySchedule.MONDAY });
    isWorkdayEnabled.setFalse();
  }, [
    // need to be careful with this dependency
    specificDayScheduleQuery.data,
    weekdaySchedule,
    dates.length,
  ]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='inline-block w-full max-w-[400px] md:w-1/2'
    >
      <div className='flex flex-col gap-6 md:pt-[22px]'>
        {dates.length > 1 ? (
          <Typography variant='subtitle' weight='medium'>
            {formatMessage(
              { id: 'modal.override.selected.dates' },
              { count: dates.length }
            )}
          </Typography>
        ) : (
          <Typography variant='subtitle' weight='medium'>
            {formattedDate2}
          </Typography>
        )}

        {dates.length > 1 && (
          <Typography variant='body2' weight='medium' className='!text-gray'>
            {formattedDate}
          </Typography>
        )}

        <Placeholder
          placeholder={
            <div className='py-8'>
              <Spinner size='medium' />
            </div>
          }
          isActive={specificDayScheduleQuery.isLoading}
        >
          {isAccordingToWeeklySchedule && (
            <div className='flex items-center gap-[10px]'>
              <Icon name='calendar' width={20} height={20} />

              <span className='text-sm font-normal'>
                <FormattedMessage
                  id='according.to.weekly.schedule'
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
            </div>
          )}
          {isOverridesWeeklySchedule && (
            <div className='flex items-center gap-5'>
              <div className='flex items-center gap-[10px]'>
                <Icon name='calendar' width={20} height={20} />

                <span className='text-sm font-normal'>
                  <FormattedMessage
                    id='overrides.weekly.schedule'
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
              </div>

              <DayOverrideModal
                dates={dates}
                handleResetToWeeklySchedule={handleResetToWeeklySchedule}
                isOpen={isOpenModalDayOverride.value}
                onOpenChange={isOpenModalDayOverride.setValue}
                trigger={
                  <Button
                    icon='arrow-left-curved'
                    variant='secondary'
                    className='h-[32px] w-[32px]'
                  />
                }
              />
            </div>
          )}
          {dates.length <= 1 && (
            <div className='flex items-center gap-2'>
              <Switch
                checked={isWorkdayEnabled.value}
                onChange={isWorkdayEnabled.setValue}
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
                dailyScheduleCreate.isPending || dailyScheduleDelete.isPending
              }
            />
          </div>
        </Placeholder>
      </div>
    </form>
  );
};
