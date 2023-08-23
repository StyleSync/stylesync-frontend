'use client';
import { type ForwardedRef, forwardRef, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';
// fonts
import { fonts } from '@/styles/fonts';
// hooks
import { useCombinedRefs } from '@/modules/core/hooks/use-combined-refs';

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
      endAdornment,
      font = 'SF_PRO_TEXT',
      variant = 'input',
      ...props
    },
    ref
  ) => {
    // state
    const hasText = useBoolean();
    // refs
    const textFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const combinedRefs = useCombinedRefs<
      HTMLInputElement | HTMLTextAreaElement
    >(ref, textFieldRef);

    useEffect(() => {
      const textFieldElement = combinedRefs.current;

      hasText.setValue(Boolean(textFieldElement?.value));

      const onInput = () => {
        const inputValue = textFieldElement?.value.trim();

        hasText.setValue(Boolean(inputValue));
      };

      textFieldElement?.addEventListener('input', onInput);

      return () => {
        textFieldElement?.removeEventListener('input', onInput);
      };
    }, [hasText.setValue, combinedRefs]);

    return (
      <div className={clsx(styles.container, classes?.container)}>
        {isInputProps(variant, props) && (
          <input
            ref={combinedRefs as ForwardedRef<HTMLInputElement>}
            className={clsx(
              className,
              styles.textField,
              styles.input,
              fonts[font].className,
              {
                [styles.textFieldError]: error,
              }
            )}
            {...props}
          />
        )}

        {isTextAreaProps(variant, props) && (
          <textarea
            ref={combinedRefs as ForwardedRef<HTMLTextAreaElement>}
            className={clsx(
              className,
              styles.textField,
              styles.textArea,
              fonts[font].className,
              {
                [styles.textFieldError]: error,
              }
            )}
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
                [styles.labelActive]: hasText.value,
                [styles.labelError]: error,
                [styles.textAreaLabel]: variant === 'textarea',
              },
              classes?.label
            )}
          >
            {label}
          </label>
        )}
        {endAdornment && (
          <div className={styles.endAdornment}>{endAdornment}</div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
