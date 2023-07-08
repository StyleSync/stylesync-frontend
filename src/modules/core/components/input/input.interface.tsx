import { InputHTMLAttributes } from 'react';
import { StylingProps } from '@/styles/styles.types';

export type InputProps = StylingProps &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: boolean;
    containerClassName?: string;
    labelClassName?: string;
  };
