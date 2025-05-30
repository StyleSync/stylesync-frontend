import type { SpringConfig } from '@react-spring/web';
import type { CSSProperties, ReactNode } from 'react';

import type { ChildrenProp } from '@/modules/core/types/react.types';

type EntityAnimationConfig = {
  cssOpen: CSSProperties;
  cssHidden: CSSProperties;
  getCssByVisibilityPercent: (percent: number) => CSSProperties;
  springConfig: SpringConfig;
};

export type DialogFullScreenAnimationConfig = {
  overlay: EntityAnimationConfig;
  content: EntityAnimationConfig;
};

export type DialogFullScreenProps = ChildrenProp & {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  animationConfig?: Partial<DialogFullScreenAnimationConfig>;
  trigger?: ReactNode;
  classes?: {
    content?: string;
    overlay?: string;
  };
  // useful if modal contains elements that portals outside modal (eg popups) and should not trigger modal closing
  closeOnOutsideClick?: boolean;
  applyMobileBottomTabPadding?: boolean;
};
