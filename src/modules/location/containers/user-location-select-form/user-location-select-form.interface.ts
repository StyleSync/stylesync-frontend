import type { Location } from '@prisma/client';

export type UserLocationSelectFormProps = {
  location?: Omit<Location, 'createdAt' | 'updatedAt' | 'professionalId'>;
};
