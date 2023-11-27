// utils
import { isObjEqualDeep } from '@/modules/core/utils/object.utils';
// types
import type {
  ServiceOnProfessional,
  ServiceOnProfessionalGroup,
} from '@/modules/service/types/service.types';

export const isServiceOnProfessionalEqual = (
  s1: Partial<ServiceOnProfessional>,
  s2: Partial<ServiceOnProfessional>
): boolean => {
  return (
    isObjEqualDeep(s1, s2, ['id', 'title', 'price', 'currency', 'duration']) &&
    s1?.service?.id === s2?.service?.id
  );
};

export const getGroupOfServiceOnProfessionalList = (
  list: ServiceOnProfessional[]
): ServiceOnProfessionalGroup[] => {
  const next: ServiceOnProfessionalGroup[] = [];

  list.forEach((serviceOnProfessional) => {
    const group = next.find(
      (item) => item.service.id === serviceOnProfessional.service.id
    );

    if (group) {
      group.serviceOnProfessionalList.push(serviceOnProfessional);

      return;
    }

    next.push({
      service: serviceOnProfessional.service,
      serviceOnProfessionalList: [serviceOnProfessional],
    });
  });

  return next;
};
