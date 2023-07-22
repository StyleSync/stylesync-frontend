import { forwardRef } from 'react';
import clsx from 'clsx';
// fonts
import { fonts } from '@/styles/fonts';

import type { TypographyProps } from './typography.interface';
import styles from './typography.module.scss';

const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      className,
      style,
      variant = 'body2',
      weight = 'regular',
      As = 'span',
      font = 'SF_PRO_TEXT',
    },
    ref
  ) => {
    return (
      <As
        className={clsx(
          styles.base,
          fonts[font].className,
          styles[variant],
          styles[weight],
          className
        )}
        // @ts-ignore
        ref={ref}
        style={style}
      >
        {children}
      </As>
    );
  }
);

Typography.displayName = 'Typography';

export { Typography };
