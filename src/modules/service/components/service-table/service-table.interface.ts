import type { SupportedService } from '@/modules/service/types/service.types';

export type ServicesTableProps = {
  service: SupportedService;
  userServices: {
    id: string;
    name: string;
    duration: string;
    price: string;
  }[];
};
