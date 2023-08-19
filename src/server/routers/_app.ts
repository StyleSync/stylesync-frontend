import { z } from 'zod';
import { procedure, router } from '@/server/trpc-helpers';
import { prisma } from '@/server/prisma';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  userList: procedure.query(async () => {
    return prisma.user.findMany({
      take: 10,
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
