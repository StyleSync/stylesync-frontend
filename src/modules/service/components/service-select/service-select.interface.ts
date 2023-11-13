import type { Service } from '@prisma/client';

export type ServiceSelectProps = {
  services: Service[];
  onServiceSelect?: (service: Service) => void;
  isLoading?: boolean;
  blackList?: string[];
};
