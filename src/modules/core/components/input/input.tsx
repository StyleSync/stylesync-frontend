import { forwardRef } from 'react';
import clsx from 'clsx';
import { InputProps } from './input.interface';
import styles from './input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className={styles.container}>
      <input
        ref={ref}
        className={clsx(className, styles.input, {
          [styles.inputError]: error,
        })}
        {...props}
      />
      {label && !props.placeholder && (
        <label
          htmlFor={props.id}
          className={clsx(styles.label, {
            [styles.labelActive]: props.value || props.defaultValue,
          })}
        >
          {label}
        </label>
      )}
    </div>
  )
);

Input.displayName = 'Input';
