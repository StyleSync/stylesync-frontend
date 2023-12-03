import type { ChildrenProp } from '@/modules/core/types/react.types';

export type BottomActionsProps = ChildrenProp & {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};
