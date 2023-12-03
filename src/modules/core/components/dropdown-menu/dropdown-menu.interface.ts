import type { IconName } from '@/modules/core/components/icon';
import type { FC, ReactNode } from 'react';
import type { PopoverProps } from '@/modules/core/components/popover/popover.interface';
import type { TypographyProps } from '@/modules/core/components/typogrpahy/typography.interface';

export type DropdownItem = {
  id: string;
  text: string;
  icon?: IconName;
  variant?: 'default' | 'danger' | 'primary';
  className?: string;
  disabled?: boolean;
};

export type DropdownMenuProps = {
  items: DropdownItem[];
  trigger: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  onSelect?: (item: DropdownItem) => void;
  render?: FC<DropdownItem>;
  popoverProps?: Partial<Omit<PopoverProps, 'onClose' | 'isOpen' | 'trigger'>>;
  typographyProps?: TypographyProps;
};
