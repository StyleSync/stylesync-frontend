import { forwardRef, useRef } from 'react';
import clsx from 'clsx';
// components
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Spinner } from '@/modules/core/components/spinner';
// hooks
import { useRipple } from '@/modules/core/hooks/use-ripple';
import { useCombinedRefs } from '@/modules/core/hooks/use-combined-refs';

import type { ButtonProps, ButtonVariant } from './button.interface';
import styles from './button.module.scss';

const RIPPLE_COLORS: Record<ButtonVariant, string> = {
  primary: styles.ripplePrimaryColor,
  secondary: styles.rippleSecondaryColor,
  outlined: styles.rippleOutlinedColor,
  unstyled: styles.rippleSecondaryColor,
  danger: styles.rippleDangerColor,
};

const SPINNER_COLORS: Record<ButtonVariant, string> = {
  primary: styles.spinnerPrimaryColor,
  secondary: styles.spinnerSecondaryColor,
  outlined: styles.spinnerOutlinedColor,
  unstyled: styles.spinnerSecondaryColor,
  danger: styles.spinnerDangerColor,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      text,
      disabled,
      icon,
      iconEnd,
      className,
      style,
      rippleColor,
      typographyProps,
      isLoading,
      classes,
      ...props
    },
    ref
  ) => {
    // refs
    const buttonRef = useRef<HTMLButtonElement>(null);
    const combinedRef = useCombinedRefs<HTMLButtonElement>(buttonRef, ref);

    useRipple(combinedRef, {
      disabled,
      rippleColor: rippleColor ?? RIPPLE_COLORS[variant],
      animationLength: 500,
    });

    return (
      <button
        className={clsx(
          styles.base,
          {
            [styles.primary]: variant === 'primary',
            [styles.secondary]: variant === 'secondary',
            [styles.outlined]: variant === 'outlined',
            [styles.danger]: variant === 'danger',
            [styles.base_textless]: !text,
          },
          className,
          classes?.root
        )}
        ref={combinedRef}
        disabled={disabled || isLoading}
        style={style}
        type='button'
        {...props}
      >
        {!!isLoading && (
          <Spinner size='small' color={SPINNER_COLORS[variant]} />
        )}
        {!!icon && !isLoading && (
          <Icon className={clsx(styles.icon, classes?.icon)} name={icon} />
        )}
        {!!text && (
          <Typography
            className={clsx(styles.text, classes?.text)}
            {...typographyProps}
          >
            {text}
          </Typography>
        )}
        {!!iconEnd && (
          <Icon
            className={clsx(styles.icon, classes?.iconEnd)}
            name={iconEnd}
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
