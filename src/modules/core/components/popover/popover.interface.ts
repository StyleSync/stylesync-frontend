import type { PopperContentProps } from '@radix-ui/react-popper';
import type { MouseEvent, ReactNode } from 'react';

import type { ChildrenProp } from '@/modules/core/types/react.types';

export type PopoverProps = ChildrenProp & {
  isOpen: boolean;
  onClose: () => void;
  trigger: ReactNode;
  align?: PopperContentProps['align'];
  alignOffset?: number;
  side?: PopperContentProps['side'];
  sideOffset?: number;
  id?: string;
  followTriggerWidth?: boolean;
  forceTriggerWidth?: boolean;
  disableAutofocus?: boolean;
  disablePortal?: boolean;
  backgroundBlurEffect?: boolean;
  classes?: {
    content?: string;
  };
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void;
};
