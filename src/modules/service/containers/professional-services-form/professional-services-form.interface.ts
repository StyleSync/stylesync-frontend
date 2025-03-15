import type { Dispatch, SetStateAction } from 'react';

import type { ServiceOnProfessionalGroup } from '@/modules/service/types/service.types';

export type ProfessionalServicesFormProps = {
  serviceOnProfessionalGroups: ServiceOnProfessionalGroup[];
  setServiceOnProfessionalGroups: Dispatch<
    SetStateAction<ServiceOnProfessionalGroup[]>
  >;
};
