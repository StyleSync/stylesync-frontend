import { createNextApiHandler } from '@trpc/server/adapters/next';
import { createTRPCContext } from '@/server/context';
import { appRouter } from '@/server/routers/_app';

export default createNextApiHandler({
  router: appRouter,
  createContext(opts) {
    return createTRPCContext({
      type: 'api',
      ...opts,
    });
  },
});
