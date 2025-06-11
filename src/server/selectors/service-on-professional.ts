import { Prisma } from '@prisma/client';

import { defaultProfessionalSelect } from '@/server/selectors/professional';
import { defaultServiceSelect } from '@/server/selectors/service';

export const defaultServiceOnProfessionalSelect =
  Prisma.validator<Prisma.ServiceOnProfessionalSelect>()({
    id: true,
    title: true,
    price: true,
    currency: true,
    duration: true,
    description: true,
    position: true,
    service: { select: defaultServiceSelect },
    professional: { select: defaultProfessionalSelect },
  });
