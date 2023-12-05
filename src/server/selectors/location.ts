import { Prisma } from '@prisma/client';

export const defaultLocationSelect = Prisma.validator<Prisma.LocationSelect>()({
  id: true,
  name: true,
  address: true,
  postalCode: true,
  latitude: true,
  longitude: true,
});
