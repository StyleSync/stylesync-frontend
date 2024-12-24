import { trpc } from '@/modules/core/utils/trpc.utils';
import { useEffect, useMemo, useState } from 'react';
// utils
import { getGroupOfServiceOnProfessionalList } from '@/modules/service/utils/service.utils';
// types
import type { ServiceOnProfessionalGroup } from '@/modules/service/types/service.types';

export const useServiceOnProfessionalGroups = () => {
  // queries
  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  const { data: serviceListQuery, ...serviceListData } =
    trpc.serviceOnProfessional.list.useInfiniteQuery(
      {
        limit: 10,
        offset: 0,
        professionalId: me?.professional?.id,
      },
      {
        enabled: Boolean(me?.professional?.id),
      }
    );

  const serviceList = useMemo(() => {
    return serviceListQuery?.pages.map((page) => page.items).flat() || [];
  }, [serviceListQuery?.pages]);

  // state
  const [serviceOnProfessionalGroups, setServiceOnProfessionalGroups] =
    useState<ServiceOnProfessionalGroup[]>([]);

  useEffect(() => {
    if (!serviceList.length) {
      return;
    }

    setServiceOnProfessionalGroups(
      getGroupOfServiceOnProfessionalList(serviceList)
    );
  }, [serviceList]);

  return {
    groups: serviceOnProfessionalGroups,
    setGroups: setServiceOnProfessionalGroups,
    isGroupsLoading: serviceListData.isLoading,
    isGroupsLoadingError: serviceListData.isError,
  };
};
