import { Prisma } from '@prisma/client';

export const defaultCompanySelect = Prisma.validator<Prisma.CompanySelect>()({
  id: true,
  name: true,
  address: true,
  phone: true,
  email: true,
  website: true,
});
