import { type FC, useRef } from 'react';
import clsx from 'clsx';
// components
import { Icon, Typography } from '@/modules/core/components';
// hooks
import { useRipple } from '@/modules/core/hooks/use-ripple';

import type { ButtonProps, ButtonVariant } from './button.interface';
import styles from './button.module.scss';

const RIPPLE_COLORS: Record<ButtonVariant, string> = {
  primary: styles.ripplePrimaryColor,
  secondary: styles.rippleSecondaryColor,
  unstyled: styles.rippleSecondaryColor,
};

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  text,
  disabled,
  icon,
  iconEnd,
  className,
  style,
  rippleColor,
  ...props
}) => {
  // refs
  const buttonRef = useRef<HTMLButtonElement>(null);

  useRipple(buttonRef, {
    disabled,
    rippleColor: rippleColor ?? RIPPLE_COLORS[variant],
    animationLength: 500,
  });

  return (
    <button
      className={clsx(styles.base, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
        [styles.base_textless]: !text,
        className,
      })}
      ref={buttonRef}
      disabled={disabled}
      style={style}
      {...props}
    >
      {!!icon && <Icon className={styles.icon} name={icon} />}
      {!!text && <Typography className={styles.text}>{text}</Typography>}
      {!!iconEnd && <Icon className={styles.icon} name={iconEnd} />}
    </button>
  );
};
