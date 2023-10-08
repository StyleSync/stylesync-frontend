// types
import type { SupportedServiceKey } from '@/modules/service/types/service.types';
import type { IconName } from '@/modules/core/components/icon';

export const SERVICE_METADATA: Record<
  SupportedServiceKey,
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
