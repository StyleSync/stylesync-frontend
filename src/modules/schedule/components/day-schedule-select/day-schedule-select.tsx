import { type FC, useCallback } from 'react';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components/button';
import { Checkbox } from '@/modules/core/components/checkbox';
import { Typography } from '@/modules/core/components/typogrpahy';
import { TimeRangeField } from '@/modules/core/components/time-range-field';
import { Divider } from '@/modules/core/components/divider';

import type { DayScheduleSelectProps } from './day-schedule-select.interface';
import styles from './day-schedule-select.module.scss';
import { formatTimeRange, Time } from '@/modules/core/utils/time.utils';

export const DayScheduleSelect: FC<DayScheduleSelectProps> = ({
  day,
  workHours,
  breaks,
  isActive,
  onActiveChange,
  onWorkHoursChange,
  onBreaksChange,
}) => {
  const handleAddClick = useCallback(() => {
    onBreaksChange([...breaks, formatTimeRange(new Time(), new Time())]);
  }, [breaks, onBreaksChange]);

  return (
    <div className={styles.root}>
      <label className={styles.head}>
        <Checkbox value={isActive} onChange={onActiveChange} />
        <Typography
          variant='body1'
          weight='medium'
          style={{
            // todo
            textTransform: 'capitalize',
          }}
        >
          {day}
        </Typography>
      </label>
      <div className={clsx(styles.fields, { [styles.notActive]: !isActive })}>
        <div className={styles.group}>
          <Typography variant='small' className={styles.groupName}>
            Working hours
          </Typography>
          <TimeRangeField
            className={styles.timeRangeSelect}
            value={workHours}
            onChange={onWorkHoursChange}
          />
        </div>
        <Divider variant='vertical' />
        <div className={styles.group}>
          <Typography variant='small' className={styles.groupName}>
            Breaks
          </Typography>
          <div className={styles.breaks}>
            <Button
              icon='plus'
              variant='outlined'
              className={styles.addBreak}
              onClick={handleAddClick}
            />
            {breaks.map((b, index) => (
              <TimeRangeField
                key={index}
                className={styles.timeRangeSelect}
                value={b}
                onChange={(value) => {
                  const _breaks = [...breaks];

                  _breaks[index] = value;

                  onBreaksChange(_breaks);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
