import type { StylingProps } from '@/styles/styles.types';
import type { InputHTMLAttributes } from 'react';

export type AvatarSelectProps = {
  value?: string;
  onRemove?: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> &
  StylingProps;
