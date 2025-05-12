import type { InputHTMLAttributes } from 'react';

import type { StylingProps } from '@/styles/styles.types';

export type AvatarSelectProps = {
  value?: string;
  onRemove?: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> &
  StylingProps;
