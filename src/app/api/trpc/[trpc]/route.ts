import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { createTRPCContext } from '@/server/context';
import { appRouter } from '@/server/routers/_app';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // TODO: I didn't find a way how to type this part, as tRPC uses specific types that works for the pages,
    // but not working for the app directory, I think they will fix it in the future.
    // @ts-ignore
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
