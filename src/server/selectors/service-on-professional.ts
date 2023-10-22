import { Prisma } from '@prisma/client';

export const defaultServiceOnProfessionalSelect =
  Prisma.validator<Prisma.ServiceOnProfessionalSelect>()({
    id: true,
    title: true,
    price: true,
    currency: true,
    duration: true,
    service: true,
  });
