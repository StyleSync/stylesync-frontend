import { ChangeEvent, forwardRef, useState } from 'react';
import clsx from 'clsx';
import { InputProps } from './input.interface';
import styles from './input.module.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className,
      containerClassName,
      labelClassName,
      value,
      onChange,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      value || defaultValue || ''
    );
    const internalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
    };

    return (
      <div className={clsx(styles.container, containerClassName)}>
        <input
          ref={ref}
          className={clsx(className, styles.input, {
            [styles.inputError]: error,
          })}
          value={value ?? internalValue}
          onChange={onChange ?? internalOnChange}
          {...props}
        />
        {label && !props.placeholder && (
          <label
            htmlFor={props.id}
            className={clsx(
              styles.label,
              {
                [styles.labelActive]: Boolean(value || internalValue),
                [styles.labelError]: error,
              },
              labelClassName
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
