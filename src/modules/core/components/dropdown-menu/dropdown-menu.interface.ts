import type { FC, ReactNode } from 'react';

import type { IconName } from '@/modules/core/components/icon';
import type { PopoverProps } from '@/modules/core/components/popover/popover.interface';
import type { TypographyProps } from '@/modules/core/components/typogrpahy/typography.interface';

export type DropdownItem<Data = undefined> = {
  id: string;
  text: string;
  icon?: IconName;
  startSlot?: ReactNode;
  variant?: 'default' | 'danger' | 'primary';
  className?: string;
  disabled?: boolean;
  data?: Data;
};

export type DropdownMenuProps<OptionData = undefined> = {
  items: DropdownItem<OptionData>[];
  trigger: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  onSelect?: (item: DropdownItem<OptionData>) => void;
  render?: FC<DropdownItem<OptionData>>;
  popoverProps?: Partial<Omit<PopoverProps, 'onClose' | 'isOpen' | 'trigger'>>;
  typographyProps?: TypographyProps;
  classes?: {
    option?: string;
  };
};
