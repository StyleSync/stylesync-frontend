import { type ForwardedRef, forwardRef, useState } from 'react';
import clsx from 'clsx';
// fonts
import { fonts } from '@/styles/fonts';

import {
  type TextFieldProps,
  isInputProps,
  isTextAreaProps,
} from './text-field.interface';
import styles from './text-field.module.scss';

export const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(
  (
    {
      label,
      error,
      className,
      classes,
      font = 'SF_PRO_TEXT',
      variant = 'input',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      props.value || props.defaultValue || ''
    );
    const internalOnChange = (e: { target: { value: string } }) => {
      setInternalValue(e.target.value);
    };

    return (
      <div className={clsx(styles.container, classes?.container)}>
        {isInputProps(variant, props) && (
          <input
            ref={ref as ForwardedRef<HTMLInputElement>}
            className={clsx(
              className,
              styles.textField,
              styles.input,
              fonts[font].className,
              {
                [styles.textFieldError]: error,
              }
            )}
            value={props.value ?? internalValue}
            onChange={props.onChange ?? internalOnChange}
            {...props}
          />
        )}

        {isTextAreaProps(variant, props) && (
          <textarea
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            className={clsx(
              className,
              styles.textField,
              styles.textArea,
              fonts[font].className,
              {
                [styles.textFieldError]: error,
              }
            )}
            value={props.value ?? internalValue}
            onChange={props.onChange ?? internalOnChange}
            {...props}
          />
        )}
        {label && !props.placeholder && (
          <label
            htmlFor={props.id}
            className={clsx(
              styles.label,
              fonts[font].className,
              {
                [styles.labelActive]: Boolean(props.value || internalValue),
                [styles.labelError]: error,
                [styles.textAreaLabel]: variant === 'textarea',
              },
              classes?.label
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
