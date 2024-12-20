import { type DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';

export type PointsBookingActionsProps = {
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (item: DropdownItem) => void;
  items: DropdownItem[];
};
