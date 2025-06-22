import type { InputHTMLAttributes } from 'react';

import type { StylingProps } from '@/styles/styles.types';

export type AvatarSelectProps = {
  value?: string;
  onRemove?: () => void;
  hideActions?: boolean;
  isLoading?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> &
  StylingProps;
