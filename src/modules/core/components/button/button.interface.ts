import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { IconName } from '@/modules/core/components/icon';
import type { StylingProps } from '@/styles/styles.types';
import type { TypographyProps } from '@/modules/core/components/typogrpahy/typography.interface';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outlined'
  | 'danger'
  | 'unstyled'
  | 'text'
  | 'light'
  | 'success';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'style'
> &
  StylingProps & {
    variant?: ButtonVariant;
    text?: string;
    icon?: IconName | null;
    iconEnd?: IconName;
    rippleColor?: string;
    typographyProps?: Partial<TypographyProps>;
    isLoading?: boolean;
    classes?: {
      root?: string;
      icon?: string;
      iconEnd?: string;
      text?: string;
    };
    slot?: ReactNode;
    slotEnd?: ReactNode;
  };
