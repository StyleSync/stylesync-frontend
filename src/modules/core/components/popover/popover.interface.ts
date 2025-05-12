import type { Align, Side } from '@radix-ui/react-popper';
import type { ReactNode } from 'react';

import type { ChildrenProp } from '@/modules/core/types/react.types';

export type PopoverProps = ChildrenProp & {
  isOpen: boolean;
  onClose: () => void;
  trigger: ReactNode;
  align?: Align;
  alignOffset?: number;
  side?: Side;
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
};
