import type { PopoverProps } from '@/modules/core/components/popover/popover.interface';
import type { Prisma } from '@prisma/client';

export type UserContactPopupProps = Omit<PopoverProps, 'children'> & {
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
};
