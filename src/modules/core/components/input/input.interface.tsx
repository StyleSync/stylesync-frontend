import { InputHTMLAttributes } from 'react';
import { ChildrenProp } from '@/modules/core/types/react.types';
import { StylingProps } from '@/styles/styles.types';

export type InputProps = ChildrenProp &
  StylingProps &
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: boolean;
  };
