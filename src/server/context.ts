/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as trpc from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export interface User {
  id: string;
  email: string;
  name: string;
}

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
  opts: trpcNext.CreateNextContextOptions & { type: 'api' }
) {
  // not RSC
  const session = await getServerSession(authOptions);

  return {
    type: opts.type,
    user: session?.user as User,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>;
