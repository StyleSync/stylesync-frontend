import { trpc } from '@/modules/core/utils/trpc.utils';
import { useEffect, useState } from 'react';
// utils
import { getGroupOfServiceOnProfessionalList } from '@/modules/service/utils/service.utils';
// types
import type { ServiceOnProfessionalGroup } from '@/modules/service/types/service.types';

export const useServiceOnProfessionalGroups = () => {
  // queries
  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  const { data: serviceList, ...serviceListQuery } =
    trpc.serviceOnProfessional.list.useQuery(
      {
        limit: 10,
        offset: 0,
        professionalId: me?.professional?.id,
      },
      {
        enabled: Boolean(me?.professional?.id),
      }
    );
  // state
  const [serviceOnProfessionalGroups, setServiceOnProfessionalGroups] =
    useState<ServiceOnProfessionalGroup[]>([]);

  useEffect(() => {
    if (!serviceList) {
      return;
    }

    setServiceOnProfessionalGroups(
      getGroupOfServiceOnProfessionalList(serviceList)
    );
  }, [serviceList]);

  return {
    groups: serviceOnProfessionalGroups,
    setGroups: setServiceOnProfessionalGroups,
    isGroupsLoading: serviceListQuery.isLoading,
    isGroupsLoadingError: serviceListQuery.isError,
  };
};
