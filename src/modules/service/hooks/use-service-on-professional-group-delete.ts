import { useMutation } from '@tanstack/react-query';

import { trpc } from '@/modules/core/utils/trpc.utils';

const MUTATION_KEY = 'SERVICE_ON_PROFESSIONAL_GROUP_DELETE';

export const useServiceOnProfessionalGroupDelete = () => {
  const deleteMutation = trpc.serviceOnProfessional.delete.useMutation();

  return useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: async (ids: string[]) => {
      for (const id of ids) {
        await deleteMutation.mutateAsync({ id });
      }
    },
  });
};
