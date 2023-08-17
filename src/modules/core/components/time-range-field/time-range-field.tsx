import {
  type FC,
  type ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useBoolean, useUpdateEffect } from 'usehooks-ts';
import { Transition } from 'react-transition-group';
import clsx from 'clsx';
// components
import {
  Popover,
  TextField,
  TimeSelect,
  Button,
} from '@/modules/core/components';
// utils
import {
  formatTimeRange,
  isTimeRangeString,
  parseTimeRange,
  Time,
} from '@/modules/core/utils/time.utils';

import type { TimeRangeFieldInterface } from './time-range-field.interface';
import styles from './time-range-field.module.scss';

const SUBMIT_BUTTON_IN_OUT_DURATION = 200;

export const TimeRangeField: FC<TimeRangeFieldInterface> = ({
  value,
  onChange,
  inputProps,
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

  useUpdateEffect(() => {
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
        <div className={styles.root} ref={rootRef}>
          <TextField
            {...inputProps}
            ref={inputRef}
            value={value}
            onChange={handleTextFieldChange}
            onFocus={startTimeSelection}
            variant='input'
          />
          <Transition
            timeout={SUBMIT_BUTTON_IN_OUT_DURATION}
            in={isActive.value}
            unmountOnExit
          >
            {(state) => (
              <Button
                variant='secondary'
                icon='check-mark'
                disabled={!isTimeRangeString(value)}
                onClick={finishTimeSelection}
                className={clsx(styles.submitButton, styles[state])}
              />
            )}
          </Transition>
        </div>
      }
      followTriggerWidth
    >
      <div className={styles.selectors}>
        <TimeSelect value={startTime} onChange={setStartTime} />
        <div className={styles.divider} />
        <TimeSelect value={endTime} onChange={setEndTime} />
      </div>
    </Popover>
  );
};