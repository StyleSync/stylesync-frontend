import type { InputHTMLAttributes } from 'react';

import type { ChildrenProp } from '@/modules/core/types/react.types';

export type ImageSelectorProps = {
  label?: string;
  classes?: {
    container?: string;
    label?: string;
  };
  width?: number;
  height?: number;
  disablePreview?: boolean;
  onImageSelected?: (file: File[]) => void;
} & InputHTMLAttributes<HTMLInputElement> &
  Partial<ChildrenProp>;
