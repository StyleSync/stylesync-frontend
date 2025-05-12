'use client';

import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';

import type { AppRouter } from '@/server/routers/_app';
const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  const defaultPort = 3000;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? defaultPort}`;
};

function makeQueryClient() {
  return new QueryClient({
    /* ...opts */
  });
}

let clientQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  if (!clientQueryClient) clientQueryClient = makeQueryClient();

  return clientQueryClient;
}

/**
 * Currently TRPC doesn't support Next 13 yet, so we need to use this provider.
 * @link https://github.com/trpc/next-13/tree/3992fb41ec4b1134d596d94007fdea51453445dd for reference
 */
export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          fetch: async (input, init?) => {
            const fetch = getFetch();

            return fetch(input, {
              ...init,
              credentials: 'include',
            });
          },
        }),
      ],
      transformer: superjson,
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
