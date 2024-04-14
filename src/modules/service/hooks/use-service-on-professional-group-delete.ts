import { trpc } from '@/modules/core/utils/trpc.utils';
import { useMutation } from '@tanstack/react-query';

const MUTATION_KEY = 'SERVICE_ON_PROFESSIONAL_GROUP_DELETE';

export const useServiceOnProfessionalGroupDelete = () => {
  const deleteMutation = trpc.serviceOnProfessional.delete.useMutation({
    useErrorBoundary: false,
  });

  return useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: async (ids: string[]) => {
      for (const id of ids) {
        await deleteMutation.mutateAsync({ id });
      }
    },
  });
};
