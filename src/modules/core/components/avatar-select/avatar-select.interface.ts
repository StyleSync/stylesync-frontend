import type { StylingProps } from '@/styles/styles.types';
import type { InputHTMLAttributes } from 'react';

export type AvatarSelectMobileProps = {
  value?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> &
  StylingProps;
