import { Prisma } from '@prisma/client';

export const defaultServiceSelect = Prisma.validator<Prisma.ServiceSelect>()({
  id: true,
  name: true,
  icon: true,
  createdAt: true,
  updatedAt: true,
});
