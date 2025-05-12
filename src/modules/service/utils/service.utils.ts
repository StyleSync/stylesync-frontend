import { alphabetCompare } from '@/modules/core/utils/array.utils';
import { isObjEqualDeep } from '@/modules/core/utils/object.utils';
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
  list: ServiceOnProfessional[] | undefined
): ServiceOnProfessionalGroup[] => {
  if (!Array.isArray(list)) {
    return [];
  }

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

export const sortServiceOnProfessionalGroups = (
  groups: ServiceOnProfessionalGroup[]
) => {
  const next: ServiceOnProfessionalGroup[] = [...groups];

  next.sort((group1, group2) =>
    alphabetCompare(group1.service.name, group2.service.name)
  );

  next.forEach((group) => {
    group.serviceOnProfessionalList.sort((s1, s2) =>
      alphabetCompare(s1.title, s2.title)
    );
  });

  return next;
};

export const isServiceOnProfessionalValid = ({
  title,
  id,
  duration,
  currency,
  price,
}: ServiceOnProfessional): boolean => {
  return (
    !!title &&
    title.length > 0 &&
    duration > 0 &&
    price > 0 &&
    !!currency &&
    !!id
  );
};
