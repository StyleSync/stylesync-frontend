import {
  type ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';
import { Transition } from 'react-transition-group';
import { useBoolean } from 'usehooks-ts';

import { Button } from '@/modules/core/components/button';
import { Popover } from '@/modules/core/components/popover';
import { TextField } from '@/modules/core/components/text-field';
import { TimeSelect } from '@/modules/core/components/time-select';
import { Time } from '@/modules/core/utils/time.utils';

import type { TimeFieldProps } from './time-field.interface';

import styles from './time-field.module.scss';

const SUBMIT_BUTTON_IN_OUT_DURATION = 200;

export const TimeField: FC<TimeFieldProps> = ({
  value,
  onChange,
  inputProps,
  formatValue,
}) => {
  // state
  const isActive = useBoolean();
  const [time, setTime] = useState(new Time());
  // refs
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (Time.guard(value)) {
      setTime(new Time(value));
    }
  }, [value]);

  useEffect(() => {
    onChange(time.getString());
  }, [time]);

  const startTimeSelection = useCallback(() => {
    isActive.setTrue();
  }, [isActive]);

  const finishTimeSelection = useCallback(() => {
    isActive.setFalse();
    inputRef.current?.blur();

    if (!Time.guard(value)) {
      onChange(new Time().getString());
    }
  }, [isActive, value, onChange]);

  const handleTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (formatValue) return;
      // Remove any non-digit characters from the input value
      const sanitizedValue = e.target.value.replace(/\D/g, '');

      // Format the sanitized value with `:` sign
      let formattedValue = '';

      for (let i = 0; i < sanitizedValue.length; i++) {
        const MAX_LENGTH = 4;
        const DIVIDER_INDEX = 3;

        if (i === DIVIDER_INDEX - 1) {
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
    [onChange, formatValue]
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
            value={formatValue ? formatValue(value) : value}
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
                type='button'
                disabled={!Time.guard(value)}
                onClick={finishTimeSelection}
                className={clsx(styles.submitButton, styles[state])}
              />
            )}
          </Transition>
        </div>
      }
      followTriggerWidth
      disableAutofocus
      disablePortal
    >
      <TimeSelect value={time} onChange={setTime} />
    </Popover>
  );
};
