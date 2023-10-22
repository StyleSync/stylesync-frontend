import { router } from '@/server/trpc-helpers';
import { userRouter } from '@/server/routers/user';
import { professionalRouter } from '@/server/routers/professional';

export const appRouter = router({
  user: userRouter,
  professional: professionalRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
