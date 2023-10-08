import type { IconName } from '@/modules/core/components/icon';
import type { FC, ReactNode } from 'react';
import type { PopoverProps } from '@/modules/core/components/popover/popover.interface';

type DropdownItem = {
  id: string;
  text: string;
  icon?: IconName;
};

export type DropdownMenuProps = {
  items: DropdownItem[];
  trigger: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (item: DropdownItem) => void;
  render?: FC<DropdownItem>;
  popoverProps?: Partial<Omit<PopoverProps, 'onClose' | 'isOpen' | 'trigger'>>;
};
