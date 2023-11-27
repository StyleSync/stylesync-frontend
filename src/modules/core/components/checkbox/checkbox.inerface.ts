import type { ChangeEvent } from 'react';

export type CheckboxProps = {
  value?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'medium';
  classes?: {
    root?: string;
    checkmark?: string;
  };
  error?: boolean;
};
