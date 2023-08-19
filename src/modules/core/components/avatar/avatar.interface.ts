import { type ReactNode } from 'react';

export type AvatarProps = {
  url?: string;
  size?: AvatarSize;
  fallback?: ReactNode;
  shadow?: boolean;
  shape?: 'circle' | 'rect';
};

export type AvatarSize = 'small' | 'medium' | 'large';
