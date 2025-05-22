import { type FC, useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { ErrorBox } from '@/modules/core/components/error-box';
import { Icon } from '@/modules/core/components/icon';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';
import { Typography } from '@/modules/core/components/typogrpahy';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { weekdays } from '@/modules/schedule/constants/schedule.constants';
import { DayScheduleSelect } from '@/modules/schedule/containers/day-schedule-select';

import type { WeeklyScheduleFormProps } from './schedule-form.interface';

import styles from './schedule-form.module.scss';

export const WeeklyScheduleForm: FC<WeeklyScheduleFormProps> = () => {
  const intl = useIntl();
  const deviceType = useDeviceType();
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

    void queryClient.invalidateQueries({
      queryKey: getQueryKey(trpc.schedule.getWeekSchedule, {
        professionalId: me.professional.id,
      }),
    });
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
            title={intl.formatMessage({ id: 'schedule.form.errorBox.title' })}
            description={intl.formatMessage({
              id: 'schedule.form.errorBox.description',
            })}
          />
        }
      >
        <div id='divFirst' className={styles.root}>
          <div className='mb-6 flex flex-col gap-4'>
            <div className='flex justify-between'>
              <span className='text-2xl font-medium text-dark'>
                {intl.formatMessage({ id: 'schedule.weekly' })}
              </span>
            </div>
            <span className='text-dark'>
              {intl.formatMessage({ id: 'schedule.weekly.description' })}
            </span>
          </div>

          {deviceType !== 'mobile' && (
            <div className={styles.header}>
              <div className={styles.cell}>
                <Icon name='calendar' />
                <Typography weight='medium'>
                  {intl.formatMessage({ id: 'schedule.form.day' })}
                </Typography>
              </div>
              <div className={styles.cell}>
                <Icon name='time' />
                <Typography weight='medium'>
                  {intl.formatMessage({ id: 'schedule.form.working.hours' })}
                </Typography>
              </div>
              <div className={styles.cell}>
                <Icon name='alarm' />
                <Typography weight='medium'>
                  {intl.formatMessage({ id: 'schedule.form.breaks' })}
                </Typography>
              </div>
              <div className={clsx(styles.cell, styles.actions)} />
            </div>
          )}
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
