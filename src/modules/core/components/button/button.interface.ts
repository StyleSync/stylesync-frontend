import type { ButtonHTMLAttributes } from 'react';
import type { IconName } from '@/modules/core/components';
import type { StylingProps } from '@/styles/styles.types';

export type ButtonVariant = 'primary' | 'secondary' | 'unstyled';

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
  };
