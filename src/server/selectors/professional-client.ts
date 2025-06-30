import { Prisma } from '@prisma/client';

export const defaultProfessionalClientSelect =
  Prisma.validator<Prisma.ProfessionalClientSelect>()({
    id: true,
    firstName: true,
    lastName: true,
    phone: true,
    name: true,
    email: true,
    image: true,
    professionalId: true,
    notes: true,
    createdAt: true,
    updatedAt: true,
  });
