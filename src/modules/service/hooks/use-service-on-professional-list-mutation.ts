import { useMutation } from '@tanstack/react-query';
import { trpc } from '@/modules/core/utils/trpc.utils';
// utils
import { syncServiceOnProfessionalLists } from '@/modules/service/utils/service.utils';
// types
import type { ServiceOnProfessional } from '@/modules/service/types/service.types';

const MUTATION_KEY = 'SERVICE_ON_PROFESSIONAL_LIST_MUTATION_KEY';

export const useServiceOnProfessionalListMutation = () => {
  const createMutation = trpc.serviceOnProfessional.create.useMutation();
  const updateMutation = trpc.serviceOnProfessional.update.useMutation();
  const deleteMutation = trpc.serviceOnProfessional.delete.useMutation();

  return useMutation(
    [MUTATION_KEY],
    async (params: {
      base: ServiceOnProfessional[];
      next: ServiceOnProfessional[];
    }) => {
      const { create, update, remove } = syncServiceOnProfessionalLists(
        params.base,
        params.next
      );

      await Promise.all([
        ...create.map((i) =>
          createMutation.mutateAsync({ serviceId: i.service.id, ...i })
        ),
        ...update.map((i) => updateMutation.mutateAsync(i)),
        ...remove.map((i) => deleteMutation.mutateAsync({ id: i.id })),
      ]);
    }
  );
};
