import { useMutation } from '@tanstack/react-query';
import { trpc } from '@/modules/core/utils/trpc.utils';
// utils
import { isServiceOnProfessionalEqual } from '@/modules/service/utils/service.utils';
import { getCrudActionsOfList } from '@/modules/core/utils/crud.utils';
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
      const { create, update, remove } = getCrudActionsOfList(
        params.base,
        params.next,
        isServiceOnProfessionalEqual
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
