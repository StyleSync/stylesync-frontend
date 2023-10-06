import type { ReactNode } from 'react';
import type { StylingProps } from '@/styles/styles.types';

export type HeaderProps = {
  centralSlot?: ReactNode;
  rightSlot?: ReactNode;
} & StylingProps;
