import { router } from '@/server/trpc-helpers';
import { userRouter } from '@/server/routers/user';
import { professionalRouter } from '@/server/routers/professional';
import { serviceRouter } from '@/server/routers/service';
import { serviceOnProfessionalRouter } from '@/server/routers/service-on-professional';
import { scheduleRouter } from '@/server/routers/schedule';
import { breakRouter } from '@/server/routers/break';
import { portfolioRouter } from '@/server/routers/portfolio';
import { locationRouter } from '@/server/routers/location';
import { bookingRouter } from '@/server/routers/booking';
import { albumRouter } from '@/server/routers/album';

export const appRouter = router({
  user: userRouter,
  professional: professionalRouter,
  service: serviceRouter,
  serviceOnProfessional: serviceOnProfessionalRouter,
  schedule: scheduleRouter,
  break: breakRouter,
  portfolio: portfolioRouter,
  location: locationRouter,
  booking: bookingRouter,
  album: albumRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
