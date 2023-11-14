import { type FC, useCallback } from 'react';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
// containers
import { DayScheduleSelect } from '@/modules/schedule/containers/day-schedule-select';
// components
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';
import { ErrorBox } from '@/modules/core/components/error-box';
// constants
import { weekdays } from '@/modules/schedule/constants/schedule.constants';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

import type { WeeklyScheduleFormProps } from './schedule-form.interface';
import styles from './schedule-form.module.scss';

export const WeeklyScheduleForm: FC<WeeklyScheduleFormProps> = () => {
  const queryClient = useQueryClient();
  // queries
  const { data: me } = trpc.user.me.useQuery({ expand: ['professional'] });
  const { data: weekSchedule, ...weekScheduleQuery } =
    trpc.schedule.getWeekSchedule.useQuery(
      {
        professionalId: me?.professional?.id ?? '',
      },
      {
        enabled: Boolean(me?.professional),
      }
    );

  const handleUpdate = useCallback(() => {
    if (!me?.professional) {
      return;
    }

    const queryKey = trpc.schedule.getWeekSchedule.getQueryKey({
      professionalId: me.professional.id,
    });

    void queryClient.invalidateQueries(queryKey);
  }, [me, queryClient]);

  return (
    <Placeholder
      isActive={weekScheduleQuery.isLoading}
      placeholder={<Spinner size='medium' />}
    >
      <Placeholder
        isActive={weekScheduleQuery.isError}
        placeholder={
          <ErrorBox
            title='Connection with server has been interrupted'
            description='Please check your internet connection or try refreshing the page. If the issue persists, please contact our support team for assistance.'
          />
        }
      >
        <div className={styles.root}>
          <div className={styles.header}>
            <div className={styles.cell}>
              <Icon name='calendar' />
              <Typography weight='medium'>Day</Typography>
            </div>
            <div className={styles.cell}>
              <Icon name='time' />
              <Typography weight='medium'>Working hours</Typography>
            </div>
            <div className={styles.cell}>
              <Icon name='alarm' />
              <Typography weight='medium'>Breaks</Typography>
            </div>
            <div className={clsx(styles.cell, styles.actions)} />
          </div>
          {weekdays.map((weekday) => (
            <DayScheduleSelect
              key={weekday}
              weekday={weekday}
              dailySchedule={weekSchedule?.find(
                (dailySchedule) => dailySchedule.day === weekday
              )}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </Placeholder>
    </Placeholder>
  );
};
