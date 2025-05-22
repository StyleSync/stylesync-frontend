import { TRPCClientError } from '@trpc/client';

import type { AppRouter } from '@/server/routers/_app';

export const onQueryRetry = (
  retryCount: number,
  error: TRPCClientError<AppRouter>
) => {
  if (error.data?.code === 'NOT_FOUND') {
    return false;
  }

  return retryCount <= 2;
};
