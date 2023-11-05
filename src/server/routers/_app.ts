import { router } from '@/server/trpc-helpers';
import { userRouter } from '@/server/routers/user';
import { professionalRouter } from '@/server/routers/professional';
import { serviceRouter } from '@/server/routers/service';
import { serviceOnProfessionalRouter } from '@/server/routers/service-on-professional';

export const appRouter = router({
  user: userRouter,
  professional: professionalRouter,
  service: serviceRouter,
  serviceOnProfessional: serviceOnProfessionalRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
