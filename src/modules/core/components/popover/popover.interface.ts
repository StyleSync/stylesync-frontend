import type { ReactNode } from 'react';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { Align } from '@radix-ui/react-popper';

export type PopoverProps = ChildrenProp & {
  isOpen: boolean;
  onClose: () => void;
  trigger: ReactNode;
  align?: Align;
  id?: string;
  followTriggerWidth?: boolean;
};
