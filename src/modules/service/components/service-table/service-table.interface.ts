import type { SupportedServiceKey } from '@/modules/service/types/service.types';

export type ServicesTableProps = {
  service: SupportedServiceKey;
  userServices: {
    id: string;
    name: string;
    duration: string;
    price: string;
  }[];
};
