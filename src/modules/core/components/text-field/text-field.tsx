import { type ForwardedRef, forwardRef, useEffect, useRef } from 'react';

import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';

import { Typography } from '@/modules/core/components/typogrpahy';
import { useCombinedRefs } from '@/modules/core/hooks/use-combined-refs';
import { fonts } from '@/styles/fonts';

import {
  isInputProps,
  isTextAreaProps,
  type TextFieldProps,
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
      startAdornment,
      endAdornment,
      font = 'INTER',
      variant = 'input',
      charCount,
      showCharacterCount = false,
      maxCharacterCount = 1000,
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

      const onChange = () => {
        const inputValue = textFieldElement?.value.trim() || '';

        hasText.setValue(Boolean(inputValue));
      };

      textFieldElement?.addEventListener('change', onChange);

      return () => {
        textFieldElement?.removeEventListener('input', onChange);
      };
    }, [hasText.setValue, combinedRefs]);

    return (
      <div
        className={clsx(
          styles.root,
          { [styles.active]: hasText.value },
          { [styles.error]: !!error },
          { [styles.labelStartAdornment]: startAdornment },
          classes?.container
        )}
      >
        {startAdornment && (
          <div className={clsx(styles.startAdornment)}>{startAdornment}</div>
        )}
        {isInputProps(variant, props) && (
          <input
            ref={combinedRefs as ForwardedRef<HTMLInputElement>}
            id={props.id}
            aria-label={label}
            className={clsx(
              className,
              styles.textField,
              styles.input,
              {
                [styles.small]: props.fieldSize === 'small',
                [styles.medium]: props.fieldSize === 'medium',
                [styles.high]: props.fieldSize === 'high',
              },
              fonts[font].className
            )}
            {...props}
          />
        )}

        {isTextAreaProps(variant, props) && (
          <textarea
            ref={combinedRefs as ForwardedRef<HTMLTextAreaElement>}
            aria-label={label}
            id={props.id}
            className={clsx(
              className,
              styles.textField,
              styles.textArea,
              fonts[font].className
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
                [styles.textAreaLabel]: variant === 'textarea',
              },
              classes?.label
            )}
          >
            {label}
          </label>
        )}
        {endAdornment && (
          <div className={clsx(styles.endAdornment, classes?.endAdornment)}>
            {endAdornment}
          </div>
        )}
        <fieldset className={clsx(styles.fieldset, classes?.fieldset)}>
          <legend className={styles.legend}>
            {!!label && <Typography>{label}</Typography>}
          </legend>
        </fieldset>

        {typeof error === 'string' && (
          <Typography
            variant='small'
            className={clsx(styles.errorText, classes?.errorText)}
          >
            {error}
          </Typography>
        )}

        {showCharacterCount && (
          <div
            className={clsx('absolute bottom-1 right-3 text-sm text-gray', {
              'text-red-500': (charCount || 0) > maxCharacterCount,
            })}
          >
            {charCount || 0} / {maxCharacterCount}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
