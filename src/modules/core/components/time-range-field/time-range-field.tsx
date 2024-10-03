import {
  type FC,
  type ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import { Popover } from '@/modules/core/components/popover';
import { TextField } from '@/modules/core/components/text-field';
import { TimeSelect } from '@/modules/core/components/time-select';
import { Button } from '@/modules/core/components/button';
// utils
import {
  formatTimeRange,
  isTimeRangeString,
  parseTimeRange,
  Time,
} from '@/modules/core/utils/time.utils';

import type { TimeRangeFieldInterface } from './time-range-field.interface';
import styles from './time-range-field.module.scss';

export const TimeRangeField: FC<TimeRangeFieldInterface> = ({
  value,
  onChange,
  inputProps,
  className,
  style,
}) => {
  // state
  const isActive = useBoolean();
  const [startTime, setStartTime] = useState(new Time());
  const [endTime, setEndTime] = useState(new Time());
  // refs
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTimeRangeString(value)) {
      const [_startTime, _endTime] = parseTimeRange(value);

      setStartTime(_startTime);
      setEndTime(_endTime);
    }
  }, [value]);

  useEffect(() => {
    onChange(formatTimeRange(startTime, endTime));
  }, [startTime, endTime]);

  const startTimeSelection = useCallback(() => {
    isActive.setTrue();
  }, [isActive]);

  const finishTimeSelection = useCallback(() => {
    isActive.setFalse();
    inputRef.current?.blur();

    if (!isTimeRangeString(value)) {
      setStartTime(new Time());
      setEndTime(new Time());
    }
  }, [isActive, value]);

  const toggleTimeSelection = useCallback(() => {
    isActive.value ? finishTimeSelection() : startTimeSelection();
  }, [finishTimeSelection, isActive.value, startTimeSelection]);

  const handleTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Remove any non-digit characters from the input value
      const sanitizedValue = e.target.value.replace(/\D/g, '');

      // Format the sanitized value with `:`, `-` signs
      let formattedValue = '';

      for (let i = 0; i < sanitizedValue.length; i++) {
        const MAX_LENGTH = 8;
        const TIME_DIVIDER_1_INDEX = 3;
        const TIME_DIVIDER_2_INDEX = 7;
        const TIME_RANGE_DIVIDER_INDEX = 5;

        if (i === TIME_DIVIDER_1_INDEX - 1) {
          formattedValue += ':';
        }

        if (i === TIME_RANGE_DIVIDER_INDEX - 1) {
          formattedValue += ' - ';
        }

        if (i === TIME_DIVIDER_2_INDEX - 1) {
          formattedValue += ':';
        }

        if (i >= MAX_LENGTH) {
          formattedValue = formattedValue.slice(0, -1) + sanitizedValue[i];
        } else {
          formattedValue += sanitizedValue[i];
        }
      }

      onChange(formattedValue);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        finishTimeSelection();
      }
    },
    [finishTimeSelection]
  );

  useEffect(() => {
    if (isActive.value) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isActive.value]);

  return (
    <Popover
      isOpen={isActive.value}
      onClose={finishTimeSelection}
      trigger={
        <div
          className={clsx(styles.root, className)}
          style={style}
          ref={rootRef}
        >
          <TextField
            {...inputProps}
            ref={inputRef}
            value={value}
            onChange={handleTextFieldChange}
            onFocus={startTimeSelection}
            variant='input'
          />
          <Button
            variant='secondary'
            icon={isActive.value ? 'check-mark' : 'pencil'}
            type='button'
            disabled={!isTimeRangeString(value)}
            onClick={toggleTimeSelection}
            className={clsx(styles.submitButton, {
              [styles.small]: inputProps?.fieldSize === 'small',
              [styles.error]: inputProps?.error === true,
              [styles.active]: isActive.value,
            })}
          />
        </div>
      }
      followTriggerWidth
      disableAutofocus
    >
      <div className={styles.selectors}>
        <TimeSelect value={startTime} onChange={setStartTime} />
        <div className={styles.divider} />
        <TimeSelect value={endTime} onChange={setEndTime} />
      </div>
    </Popover>
  );
};
