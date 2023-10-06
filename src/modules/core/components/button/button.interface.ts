import type { ButtonHTMLAttributes } from 'react';
import type { IconName } from '@/modules/core/components/icon';
import type { StylingProps } from '@/styles/styles.types';
import type { TypographyProps } from '@/modules/core/components/typogrpahy/typography.interface';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outlined'
  | 'light'
  | 'danger'
  | 'unstyled';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'style'
> &
  StylingProps & {
    variant?: ButtonVariant;
    text?: string;
    icon?: IconName;
    iconEnd?: IconName;
    rippleColor?: string;
    typographyProps?: Partial<TypographyProps>;
    isLoading?: boolean;
  };
