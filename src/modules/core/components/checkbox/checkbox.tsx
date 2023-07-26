import { useRef, type FC } from 'react';
import clsx from 'clsx';
// hooks
import { useRipple } from '@/modules/core/hooks/use-ripple';

import type { CheckboxProps } from './checkbox.inerface';
import styles from './checkbox.module.scss';

const Checkbox: FC<CheckboxProps> = ({ disabled, onChange, value }) => {
  // refs
  const rootRef = useRef<HTMLLabelElement>(null);

  useRipple(rootRef);

  const handleChange = () => {
    if (onChange) {
      onChange(!value);
    }
  };

  return (
    <label
      className={clsx(styles.container, {
        [styles.container_disabled]: disabled,
      })}
      ref={rootRef}
    >
      <input
        className={styles.input}
        type='checkbox'
        checked={value}
        disabled={disabled}
        onChange={handleChange}
      />
      <span
        className={clsx(styles.checkmark, {
          [styles.checkmark_active]: value,
        })}
      />
    </label>
  );
};

export { Checkbox };
