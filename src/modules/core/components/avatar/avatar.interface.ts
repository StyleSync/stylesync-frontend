import { type ReactNode } from 'react';

export type AvatarProps = {
  url?: string;
  size?: AvatarSize; // default - small
  fallback?: ReactNode; // default - user icon
  shadow?: boolean; // default - false
  shape?: 'circle' | 'rect'; // default - sircle
};

export type AvatarSize = 'small' | 'medium' | 'large';
