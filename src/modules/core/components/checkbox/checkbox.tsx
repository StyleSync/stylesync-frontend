import { forwardRef, useRef } from 'react';

import clsx from 'clsx';

import { useRipple } from '@/modules/core/hooks/use-ripple';

import type { CheckboxProps } from './checkbox.inerface';

import styles from './checkbox.module.scss';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ disabled, onChange, value, classes, error, size = 'medium' }, ref) => {
    // refs
    const rootRef = useRef<HTMLLabelElement>(null);

    useRipple(rootRef);

    return (
      <label
        className={clsx(
          styles.container,
          {
            [styles.container_disabled]: disabled,
            [styles.container_error]: error,
          },
          classes?.root
        )}
        ref={rootRef}
      >
        <input
          className={styles.input}
          type='checkbox'
          checked={value}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
        />
        <span
          className={clsx(
            styles.checkmark,
            { [styles.checkmark_active]: value },
            { [styles.small]: size === 'small' },
            { [styles.medium]: size === 'medium' },
            classes?.checkmark
          )}
        />
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
