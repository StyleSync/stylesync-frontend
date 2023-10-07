import type { ServiceData } from '@/modules/service/types/service.types';

export type ServiceConstructorRowProps = {
  data: ServiceData;
  onChange: (data: ServiceData) => void;
  onDelete: (id: string) => void;
};
