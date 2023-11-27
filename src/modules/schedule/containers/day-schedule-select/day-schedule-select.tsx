import { type FC, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { TimeRangeField } from '@/modules/core/components/time-range-field';
import { Checkbox } from '@/modules/core/components/checkbox';
// hooks
import { useWeekdayScheduleSaveMutation } from '@/modules/schedule/hooks/use-weekday-schedule-save-mutation';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import {
  emptyTimeRange,
  formatTimeRange,
  parseTimeRange,
  Time,
} from '@/modules/core/utils/time.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
// constants
import { emptySchedule } from '@/modules/schedule/constants/schedule.constants';
// types
import type { DailySchedule } from '@/modules/schedule/types/schedule.types';

import type { DayScheduleSelectProps } from './day-schedule-select.interface';
import styles from './day-schedule-select.module.scss';
import { BreakTags } from '@/modules/schedule/components/break-tags';
import { useQueryClient } from '@tanstack/react-query';

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

export const DayScheduleSelect: FC<DayScheduleSelectProps> = ({
  weekday,
  dailySchedule,
  onUpdate,
}) => {
  const queryClient = useQueryClient();
  // state
  const isEdit = useBoolean();
  const isDayOff = useBoolean();
  // form
  const form = useForm<DayScheduleFormValues>({
    defaultValues: emptySchedule[weekday],
    resolver: isDayOff.value ? undefined : zodResolver(validationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'breaks',
    control: form.control,
    keyName: '_id',
  });
  // queries
  const { data: scheduleBreaks, ...scheduleBreaksQuery } =
    trpc.break.getScheduleBreaks.useQuery(
      {
        scheduleId: dailySchedule?.id ?? '',
      },
      {
        enabled: !!dailySchedule,
      }
    );
  // mutations
  const { mutate: weekdayScheduleSave, ...weekdayScheduleSaveMutation } =
    useWeekdayScheduleSaveMutation(
      { scheduleId: dailySchedule?.id },
      {
        onSuccess: (savedScheduleId) => {
          onUpdate && onUpdate();

          if (savedScheduleId) {
            void queryClient.invalidateQueries(
              trpc.break.getScheduleBreaks.getQueryKey({
                scheduleId: savedScheduleId,
              })
            );
          }

          isEdit.setFalse();
        },
        onError: (error) => {
          showToast({
            variant: 'error',
            title: "Oops! Data hasn't been saved",
            description: error.message,
          });
        },
      }
    );

  // set/update workHours values
  useEffect(() => {
    if (isEdit.value) {
      // avoid updates if card in edit mode
      return;
    }

    if (dailySchedule) {
      form.reset((current) => ({
        ...current,
        workHours: formatTimeRange(
          Time.fromDate(dailySchedule.start),
          Time.fromDate(dailySchedule.end)
        ),
      }));

      isDayOff.setFalse();

      return;
    }

    form.reset({ ...emptySchedule[weekday] });
    isDayOff.setTrue();
    // TODO: update eslint to allow [bool.setFalse] in deps
  }, [
    form.reset,
    weekday,
    dailySchedule,
    isDayOff.setFalse,
    isDayOff.setTrue,
    isEdit.value,
  ]);

  // set/update breaks values
  useEffect(() => {
    if (isEdit.value) {
      // avoid updates if card in edit mode
      return;
    }

    if (scheduleBreaks) {
      form.reset((current) => ({
        ...current,
        breaks: scheduleBreaks.map((item) => ({
          id: item.id,
          timerange: formatTimeRange(
            Time.fromDate(item.start),
            Time.fromDate(item.end)
          ),
        })),
      }));
    }
  }, [form.reset, isEdit.value, scheduleBreaks]);

  const handleSubmit = useCallback(
    async (values: Omit<DailySchedule, 'isActive'>) => {
      weekdayScheduleSave({ ...values, weekday, isActive: !isDayOff.value });
    },
    [weekdayScheduleSave, weekday, isDayOff.value]
  );

  const handleAddBreak = useCallback(() => {
    append({
      timerange: emptyTimeRange,
    });
  }, [append]);

  return (
    <form
      className={clsx(styles.root, { [styles.edit]: isEdit.value })}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      {!isEdit.value ? (
        <>
          <div className={clsx(styles.cell, styles.weekday)}>
            <Typography className={styles.weekday} variant='body1'>
              {weekday}
            </Typography>
          </div>
          <div className={clsx(styles.cell)}>
            <Typography>
              {isDayOff.value ? 'Day off' : form.getValues().workHours}
            </Typography>
          </div>
          <div className={clsx(styles.cell, styles.tags)}>
            <BreakTags
              breaks={fields}
              isLoading={
                scheduleBreaksQuery.isLoading &&
                scheduleBreaksQuery.fetchStatus !== 'idle'
              }
              error={scheduleBreaksQuery.error?.message}
            />
          </div>
          <div className={clsx(styles.cell, styles.actions)}>
            <Button
              icon='pencil'
              variant='outlined'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                isEdit.setTrue();
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className={clsx(styles.cell, styles.weekday)}>
            <Typography className={styles.weekday} variant='body2'>
              {weekday}
            </Typography>
            <label className={styles.dayoff}>
              <Checkbox
                value={isDayOff.value}
                onChange={isDayOff.toggle}
                size='small'
              />
              <Typography variant='small'>Day off</Typography>
            </label>
          </div>
          <div
            className={clsx(styles.cell, styles.xPadding, {
              [styles.disabled]: isDayOff.value,
            })}
          >
            <Controller
              name='workHours'
              control={form.control}
              render={({ field, fieldState }) => (
                <TimeRangeField
                  className={styles.timerange}
                  value={field.value}
                  onChange={field.onChange}
                  inputProps={{
                    fieldSize: 'small',
                    error: Boolean(fieldState.error),
                  }}
                />
              )}
            />
          </div>
          <div
            className={clsx(styles.cell, styles.xPadding, {
              [styles.disabled]: isDayOff.value,
            })}
          >
            <div className={styles.breaks}>
              {fields.map((item, index) => (
                <div key={item._id} className={styles.break}>
                  <Controller
                    key={item._id}
                    control={form.control}
                    name={`breaks.${index}.timerange`}
                    render={({ field, fieldState }) => (
                      <TimeRangeField
                        key={item._id}
                        value={field.value}
                        className={styles.timerange}
                        onChange={field.onChange}
                        inputProps={{
                          fieldSize: 'small',
                          error: Boolean(fieldState.error),
                        }}
                      />
                    )}
                  />
                  <Button
                    className={styles.delete}
                    onClick={() => remove(index)}
                    variant='unstyled'
                    icon='close'
                    type='button'
                  />
                </div>
              ))}
              <Button
                icon='plus'
                variant='outlined'
                type='button'
                className={styles.addBreak}
                onClick={handleAddBreak}
              />
            </div>
          </div>
          <div className={clsx(styles.cell, styles.actions, styles.xPadding)}>
            <Button
              icon='check-mark'
              variant='primary'
              type='submit'
              isLoading={weekdayScheduleSaveMutation.isLoading}
            />
          </div>
        </>
      )}
    </form>
  );
};
