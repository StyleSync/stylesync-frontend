import { Prisma } from '@prisma/client';
import { defaultServiceSelect } from '@/server/selectors/service';
import { defaultProfessionalSelect } from '@/server/selectors/professional';

export const defaultServiceOnProfessionalSelect =
  Prisma.validator<Prisma.ServiceOnProfessionalSelect>()({
    id: true,
    title: true,
    price: true,
    currency: true,
    duration: true,
    service: { select: defaultServiceSelect },
    professional: { select: defaultProfessionalSelect },
  });
