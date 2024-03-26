import { type ServiceOnProfessional } from '@/modules/service/types/service.types';

export type BaseCardWithRadioButtonProps = {
  value: string;
  serviceOnProfessional: ServiceOnProfessional;
  onClick?: (name: string) => void;
};
