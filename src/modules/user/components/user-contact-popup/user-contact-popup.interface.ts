import type { Side } from '@radix-ui/react-popper';

import type { PopoverProps } from '@/modules/core/components/popover/popover.interface';
import type { AppRouterOutputs } from '@/server/types';

export type UserContactPopupProps = Omit<PopoverProps, 'children'> & {
  professional: AppRouterOutputs['professional']['get'];
  side?: Side;
};
