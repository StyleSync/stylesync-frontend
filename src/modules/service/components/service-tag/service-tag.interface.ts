import type { StylingProps } from '@/styles/styles.types';
import type { Service } from '@prisma/client';

export type ServiceTagProps = StylingProps & {
  data: Service;
};
