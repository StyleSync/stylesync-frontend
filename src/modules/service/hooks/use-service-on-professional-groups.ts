import { trpc } from '@/modules/core/utils/trpc.utils';
import { useCallback, useEffect, useState } from 'react';
// utils
import { useServiceOnProfessionalListMutation } from '@/modules/service/hooks/use-service-on-professional-list-mutation';
import { getGroupOfServiceOnProfessionalList } from '@/modules/service/utils/service.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
// types
import type { ServiceOnProfessionalGroup } from '@/modules/service/types/service.types';

type Options = {
  onSaved?: () => void;
};

export const useServiceOnProfessionalGroups = (options?: Options) => {
  // queries
  const { data: serviceList, ...serviceListQuery } =
    trpc.serviceOnProfessional.list.useQuery({
      limit: 10,
      offset: 0,
    });
  const serviceOnProfessionalListMutation =
    useServiceOnProfessionalListMutation();
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

  const save = useCallback(async () => {
    const serviceOnProfessionalList = serviceOnProfessionalGroups
      .map((group) => group.serviceOnProfessionalList)
      .flat();

    serviceOnProfessionalListMutation.mutate(
      {
        base: serviceList ?? [],
        next: serviceOnProfessionalList,
      },
      {
        onSuccess: () => {
          serviceListQuery.refetch();

          options?.onSaved && options.onSaved();
        },
        onError: () => {
          showToast({
            variant: 'error',
            title: 'Ooops, something went wrong :(',
            description: 'Please review the entered data or try again later :)',
          });
        },
      }
    );
  }, [
    serviceList,
    serviceListQuery,
    serviceOnProfessionalGroups,
    serviceOnProfessionalListMutation,
  ]);

  return {
    groups: serviceOnProfessionalGroups,
    setGroups: setServiceOnProfessionalGroups,
    isGroupsLoading: serviceListQuery.isLoading,
    isGroupsLoadingError: serviceListQuery.isError,
    save,
    isSaveDisabled: !serviceList,
    isSaveLoading: serviceOnProfessionalListMutation.isLoading,
  };
};
