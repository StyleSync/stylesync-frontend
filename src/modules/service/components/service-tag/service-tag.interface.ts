import type { StylingProps } from '@/styles/styles.types';
import type { SupportedServiceKey } from '@/modules/service/types/service.types';

export type ServiceTagProps = StylingProps & {
  service: SupportedServiceKey;
};
