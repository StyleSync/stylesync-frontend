import type {
  ServiceData,
  SupportedServiceKey,
} from '@/modules/service/types/service.types';

export type ServiceConstructorTableProps = {
  serviceKey: SupportedServiceKey;
  services: ServiceData[];
  onChange: (serviceKey: SupportedServiceKey, services: ServiceData[]) => void;
  onRemoveClick: (serviceKey: SupportedServiceKey) => void;
};
