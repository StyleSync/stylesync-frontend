import type { ServiceOnProfessionalGroup } from '@/modules/service/types/service.types';
import type { Dispatch, SetStateAction } from 'react';

export type ProfessionalServicesFormProps = {
  serviceOnProfessionalGroups: ServiceOnProfessionalGroup[];
  setServiceOnProfessionalGroups: Dispatch<
    SetStateAction<ServiceOnProfessionalGroup[]>
  >;
};
