import type { Location } from '@prisma/client';
import type { Address } from '@/modules/location/types/address.types';

export type UserLocationSelectFormProps = {
  location?: Omit<Location, 'createdAt' | 'updatedAt' | 'professionalId'>;
};

export type UserLocationSelectFormHandle = {
  getAddress: () => Address | null;
};
