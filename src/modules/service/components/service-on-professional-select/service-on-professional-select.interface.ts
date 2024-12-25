import type { ServiceOnProfessionalListItem } from '@/modules/service/types/service.types';
import type { AppRouterOutputs } from '@/server/types';

export type ServiceOnProfessionalSelectProps = {
  value: ServiceOnProfessionalListItem | null;
  onChange: (value: ServiceOnProfessionalListItem) => void;
  professional: AppRouterOutputs['professional']['get'];
};
