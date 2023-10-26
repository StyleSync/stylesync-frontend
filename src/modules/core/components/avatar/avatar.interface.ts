import { type ReactNode } from 'react';
import type { StylingProps } from '@/styles/styles.types';

export type AvatarProps = StylingProps & {
  url?: string | null;
  size?: AvatarSize;
  fallback?: ReactNode;
  shadow?: boolean;
  shape?: 'circle' | 'rect';
};

export type AvatarSize = 'small' | 'medium' | 'large';
