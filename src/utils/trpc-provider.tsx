'use client';

import React, { useState } from 'react';
import superjson from 'superjson';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, getFetch, loggerLink } from '@trpc/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// utils
import { trpc } from '@/utils/trpc';

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

/**
 * Currently TRPC doesn't support Next 13 yet, so we need to use this provider.
 * @link https://github.com/trpc/next-13/tree/3992fb41ec4b1134d596d94007fdea51453445dd for reference
 */
export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      })
  );

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
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
