import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';

export const onQueryRetry = <T extends DefaultErrorShape>(
  retryCount: number,
  error: TRPCClientErrorBase<T>
) => {
  if (error.data?.code === 'NOT_FOUND') {
    return false;
  }

  return retryCount <= 2;
};
