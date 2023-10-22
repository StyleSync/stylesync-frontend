import { Prisma } from '@prisma/client';

export const defaultProfessionalSelect =
  Prisma.validator<Prisma.ProfessionalSelect>()({
    id: true,
    facebook: true,
    instagram: true,
    about: true,
    schedule: true,
  });
