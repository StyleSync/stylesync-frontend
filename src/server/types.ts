import type { inferRouterOutputs } from '@trpc/server';
import type { appRouter } from '@/server/routers/_app';

export type AvailableBookingTime = {
  startTime: string;
  endTime: string;
};

export type AppRouterOutputs = inferRouterOutputs<typeof appRouter>;
