import { Prisma } from '@prisma/client';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import type { Context } from './context';
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/v10/data-transformers
   */
  transformer: superjson,
  /**
   * @see https://trpc.io/docs/v10/error-formatting
   */
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zod:
          error.cause instanceof ZodError
            ? error.cause.flatten().fieldErrors
            : null,
        prisma:
          error.cause instanceof Prisma.PrismaClientKnownRequestError
            ? {
                // `fields` contains the names of the fields that caused the error
                // For unique constraints, this will be the field(s) that violated the constraint
                // For required fields, this will be the field that was missing
                fields: error.cause.meta?.target || [],
                // `code` contains the Prisma error code. Common codes include:
                // P2002: Unique constraint violation
                // P2014: Required field violation
                // P2003: Foreign key constraint violation
                code: error.cause.code,
              }
            : null,
      },
    };
  },
});

// Base router and procedure helpers
export const router = t.router;

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure;

/**
 * @see https://trpc.io/docs/v10/middlewares
 */
export const middleware = t.middleware;

/**
 * @see https://trpc.io/docs/v10/merging-routers
 */
export const mergeRouters = t.mergeRouters;

/**
 * Create an private procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const privateProcedure = t.procedure.use((opts) => {
  if (!opts.ctx.user?.id) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You have to be logged in to do this',
    });
  }

  return opts.next({
    ctx: {
      user: opts.ctx.user,
    },
  });
});
