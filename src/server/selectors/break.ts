import { Prisma } from '@prisma/client';

export const defaultBreakSelect = Prisma.validator<Prisma.BreakSelect>()({
  id: true,
  start: true,
  end: true,
});
