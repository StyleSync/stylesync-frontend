'use client';
import { forwardRef, useRef } from 'react';
import clsx from 'clsx';
// components
import { Icon, Typography } from '@/modules/core/components';
// hooks
import { useRipple } from '@/modules/core/hooks/use-ripple';
import { useCombinedRefs } from '@/modules/core/hooks/use-combined-refs';

import type { ButtonProps, ButtonVariant } from './button.interface';
import styles from './button.module.scss';

const RIPPLE_COLORS: Record<ButtonVariant, string> = {
  primary: styles.ripplePrimaryColor,
  secondary: styles.rippleSecondaryColor,
  unstyled: styles.rippleSecondaryColor,
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
            [styles.base_textless]: !text,
          },
          className
        )}
        ref={combinedRef}
        disabled={disabled}
        style={style}
        {...props}
      >
        {!!icon && <Icon className={styles.icon} name={icon} />}
        {!!text && (
          <Typography className={styles.text} {...typographyProps}>
            {text}
          </Typography>
        )}
        {!!iconEnd && <Icon className={styles.icon} name={iconEnd} />}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
