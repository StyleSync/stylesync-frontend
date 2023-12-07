import { createTRPCNextLayout } from '@/../@trpc/next-layout';
import { appRouter } from '@/server/routers/_app';
import { getUser } from './getUser';
import superjson from 'superjson';
import { createTRPCContext } from '@/server/context';

export const rsc = createTRPCNextLayout({
  router: appRouter,
  transformer: superjson,
  createContext() {
    return createTRPCContext({
      type: 'rsc',
      getUser,
    });
  },
});
