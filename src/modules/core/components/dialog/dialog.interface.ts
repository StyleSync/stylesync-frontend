import { type ReactNode } from 'react';
import type { ChildrenProp } from '@/modules/core/types/react.types';

export type ModalProps = ChildrenProp & {
  trigger?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  fullScreen?: boolean;
};
