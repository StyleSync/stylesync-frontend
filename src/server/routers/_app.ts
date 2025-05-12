import { albumRouter } from '@/server/routers/album';
import { bookingRouter } from '@/server/routers/booking';
import { breakRouter } from '@/server/routers/break';
import { locationRouter } from '@/server/routers/location';
import { portfolioRouter } from '@/server/routers/portfolio';
import { professionalRouter } from '@/server/routers/professional';
import { scheduleRouter } from '@/server/routers/schedule';
import { serviceRouter } from '@/server/routers/service';
import { serviceOnProfessionalRouter } from '@/server/routers/service-on-professional';
import { userRouter } from '@/server/routers/user';
import { router } from '@/server/trpc-helpers';

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
