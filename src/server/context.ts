/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as trpc from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import { type getUser } from '@/../server-rsc/getUser';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export interface User {
  id: string;
  email: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  user: User | null;
  rsc: boolean;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(opts: CreateContextOptions) {
  return {
    user: opts.user,
  };
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createTRPCContext(
  opts:
    | {
        type: 'rsc';
        getUser: typeof getUser;
      }
    | (trpcNext.CreateNextContextOptions & { type: 'api' })
) {
  if (opts.type === 'rsc') {
    // RSC
    return {
      type: opts.type,
      user: await opts.getUser(),
    };
  }

  // not RSC
  const session = await getServerSession(authOptions);

  return {
    type: opts.type,
    user: session?.user as User,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>;
