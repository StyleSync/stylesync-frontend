import {
  type UIEventHandler,
  type FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// utils
import { range } from '@/modules/core/utils/array.utils';
import { Time } from '@/modules/core/utils/time.utils';

import type { TimeSelectProps } from './time-select.interface';
import styles from './time-select.module.scss';

const MINUTES_15 = 15;
const MINUTES_30 = 30;
const MINUTES_45 = 45;
const MINUTES_LIST = [0, MINUTES_15, MINUTES_30, MINUTES_45];

const TIME_ITEM_HEIGHT = 40;
const HOURS_LIST = range(24);
const BUSY_END_TIMEOUT_DELAY = 200;

const TimeColumn: FC<{
  value: number;
  items: number[];
  onChange: (value: number) => void;
}> = ({ value, items, onChange }) => {
  // state
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<number>(value);
  // refs
  const busyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBusy && columnRef.current) {
      const hoursIndex = items.findIndex((_item) => _item === value);

      columnRef.current.scrollTo({
        top: hoursIndex * TIME_ITEM_HEIGHT,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [items, value, isBusy, columnRef]);

  const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>(
    (e) => {
      const { currentTarget } = e;

      setIsBusy(true);

      const index = Math.round(currentTarget.scrollTop / TIME_ITEM_HEIGHT);

      if (busyTimeoutRef.current !== null) {
        clearTimeout(busyTimeoutRef.current);
      }

      setLocalValue(+items[index]);

      busyTimeoutRef.current = setTimeout(() => {
        onChange(+items[index]);
        setIsBusy(false);
      }, BUSY_END_TIMEOUT_DELAY);
    },
    [items, onChange]
  );

  return (
    <div
      className={styles.timeColumn}
      onScroll={handleScroll}
      ref={columnRef}
      tabIndex={0}
    >
      <div className={styles.timeItem} />
      <div className={styles.timeItem} />
      {items.map((item, index) => (
        <div
          key={item}
          className={clsx(styles.timeItem, {
            [styles.timeItem_active]: item === localValue,
            [styles.timeItem_nearby]:
              Math.abs(
                index - items.findIndex((_item) => _item === localValue)
              ) === 1,
          })}
          onClick={() => onChange(items[index])}
        >
          <Typography className={styles.timeText}>
            {Time.timeUnitToString(item)}
          </Typography>
        </div>
      ))}
      <div className={styles.timeItem} />
      <div className={styles.timeItem} />
    </div>
  );
};

TimeColumn.displayName = 'TimeColumn';

const TimeSelect: FC<TimeSelectProps> = memo(
  ({ value, onChange, className, style }) => {
    const handleHoursChange = useCallback(
      (hours: number) => {
        onChange(
          new Time({
            hours,
            minutes: value.getMinutes(),
          })
        );
      },
      [value, onChange]
    );

    const handleMinutesChange = useCallback(
      (minutes: number) => {
        onChange(
          new Time({
            minutes,
            hours: value.getHours(),
          })
        );
      },
      [value, onChange]
    );

    return (
      <div className={clsx(styles.root, className)} style={style}>
        <TimeColumn
          value={value.getHours()}
          items={HOURS_LIST}
          onChange={handleHoursChange}
        />
        <Typography className={styles.divider}>:</Typography>
        <TimeColumn
          value={value.getMinutes()}
          items={MINUTES_LIST}
          onChange={handleMinutesChange}
        />
        <div className={styles.selection} />
      </div>
    );
  }
);

TimeSelect.displayName = 'TimeSelect';

export { TimeSelect };
