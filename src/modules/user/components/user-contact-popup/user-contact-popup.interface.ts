import type { PopoverProps } from '@/modules/core/components/popover/popover.interface';
import type { Prisma } from '@prisma/client';
import type { Side } from '@radix-ui/react-popper';

export type UserContactPopupProps = Omit<PopoverProps, 'children'> & {
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
  side?: Side;
};
