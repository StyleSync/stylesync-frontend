import type { SupportedServiceKey } from '@/modules/service/types/service.types';

export type ServiceSelectProps = {
  onServiceSelect?: (serviceKey: SupportedServiceKey) => void;
  blackList?: SupportedServiceKey[];
};
