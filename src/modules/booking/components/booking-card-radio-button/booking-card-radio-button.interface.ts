import type { ServiceOnProfessionalListItem } from '@/modules/service/types/service.types';

export type BaseCardWithRadioButtonProps = {
  value: string;
  serviceOnProfessional: ServiceOnProfessionalListItem;
  onClick?: (name: string) => void;
};
