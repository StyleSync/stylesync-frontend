import { privateProcedure, publicProcedure, router } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { defaultBreakSelect } from '@/server/selectors/break';
import { checkScheduleBreakChangePermission } from '@/server/utils/prisma-utils';

const defaultLimit = 10;
const maxLimit = 100;

export const breakRouter = router({
  get: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const scheduleBreak = await prisma.break.findUnique({
        where: { id: input.id },
        select: defaultBreakSelect,
      });

      if (!scheduleBreak) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No break with id '${input.id}'`,
        });
      }

      return scheduleBreak;
    }),
  getScheduleBreaks: privateProcedure
    .input(
      z.object({
        scheduleId: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const scheduleBreak = await prisma.break.findMany({
        where: { scheduleId: input.scheduleId },
        select: defaultBreakSelect,
      });

      if (!scheduleBreak) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No break for schedule with id '${input.scheduleId}'`,
        });
      }

      return scheduleBreak;
    }),
  create: privateProcedure
    .input(
      z.object({
        start: z.string().datetime(),
        end: z.string().datetime(),
        scheduleId: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await checkScheduleBreakChangePermission(ctx, input.scheduleId);

      return prisma.break.create({
        data: { ...input },
        select: defaultBreakSelect,
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        start: z.string().datetime(),
        end: z.string().datetime(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const scheduleBreak = await prisma.break.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          scheduleId: true,
        },
      });

      if (!scheduleBreak) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No break with id '${input.id}'`,
        });
      }

      await checkScheduleBreakChangePermission(ctx, scheduleBreak.scheduleId);

      return prisma.break.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const scheduleBreak = await prisma.break.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          scheduleId: true,
        },
      });

      if (!scheduleBreak) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No break with id '${input.id}'`,
        });
      }

      await checkScheduleBreakChangePermission(ctx, scheduleBreak.scheduleId);

      return prisma.break.delete({
        where: { id: input.id },
      });
    }),
  list: publicProcedure
    .input(
      z.object({
        scheduleId: z.string().min(1, 'Required'),
        limit: z.number().min(1).max(maxLimit).default(defaultLimit),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      return prisma.break.findMany({
        where: {
          scheduleId: input.scheduleId,
        },
        select: defaultBreakSelect,
        take: input.limit,
        skip: input.offset,
      });
    }),
});
