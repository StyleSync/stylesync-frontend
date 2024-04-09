import { type ButtonVariant } from '@/modules/core/components/button/button.interface';
import type { Prisma } from '@prisma/client';

export type CreateBookingProps = {
  isLoadingTrigger?: boolean;
  btnVariant?: ButtonVariant;
  selectedService?: string;
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
};
