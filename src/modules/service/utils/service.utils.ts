import type {
  ServiceOnProfessional,
  ServiceOnProfessionalGroup,
} from '@/modules/service/types/service.types';

// todo: use lib to compare objects
const isServiceOnProfessionalEqual = (
  s1: ServiceOnProfessional,
  s2: ServiceOnProfessional
): boolean => {
  return (
    s1.id === s2.id &&
    s1.title === s2.title &&
    s1.price === s2.price &&
    s1.currency === s2.currency &&
    s1.duration === s2.duration &&
    s1.service.id === s2.service.id
  );
};

export const syncServiceOnProfessionalLists = (
  base: ServiceOnProfessional[],
  next: ServiceOnProfessional[]
) => {
  const skip: ServiceOnProfessional[] = [];
  const create: ServiceOnProfessional[] = [];
  const update: ServiceOnProfessional[] = [];
  const remove: ServiceOnProfessional[] = [];

  // find skip,create,update
  for (const nextItem of next) {
    const baseEquivalent = base.find((item) => item.id === nextItem.id);

    if (!baseEquivalent) {
      create.push(nextItem);
      continue;
    }

    const isEqual = isServiceOnProfessionalEqual(nextItem, baseEquivalent);

    isEqual ? skip.push(nextItem) : update.push(nextItem);
  }

  // find remove
  for (const baseItem of base) {
    const nextEquivalent = next.find((item) => item.id === baseItem.id);

    if (!nextEquivalent) {
      remove.push(baseItem);
    }
  }

  return {
    skip,
    create,
    update,
    remove,
  };
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
