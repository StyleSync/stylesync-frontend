import { type FC } from 'react';
import clsx from 'clsx';
// fonts
import { fonts } from '@/styles/fonts';

import type { TypographyProps } from './typography.interface';
import styles from './typography.module.css';

export const Typography: FC<TypographyProps> = ({
  children,
  className,
  style,
  variant = 'body2',
  weight = 'regular',
  As = 'span',
  font = 'SF_PRO_TEXT',
}) => {
  return (
    <As
      className={clsx(
        styles.base,
        fonts[font].className,
        styles[variant],
        styles[weight],
        className
      )}
      style={style}
    >
      {children}
    </As>
  );
};
