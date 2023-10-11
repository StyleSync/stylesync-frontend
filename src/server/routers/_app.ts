import { router } from '@/server/trpc-helpers';
import { userRouter } from '@/server/routers/user';

export const appRouter = router({
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
