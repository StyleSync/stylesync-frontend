// types
import type { SupportedService } from '@/modules/service/types/service.types';
import type { IconName } from '@/modules/core/components';

export const SERVICE_METADATA: Record<
  SupportedService,
  {
    icon: IconName;
    name: string;
  }
> = {
  hair: {
    icon: 'haircut',
    name: 'Hair',
  },
  makeup: {
    icon: 'makeup',
    name: 'Makeup',
  },
  nails: {
    icon: 'nails',
    name: 'Nails',
  },
};