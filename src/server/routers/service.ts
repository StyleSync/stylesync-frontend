import { privateProcedure, publicProcedure, router } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { defaultServiceSelect } from '@/server/selectors';
import type { Service } from '@prisma/client';
import { getCursor } from '@/server/utils/prisma-utils';

const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

export const serviceRouter = router({
  get: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const service = await prisma.service.findUnique({
        where: { id: input.id },
        select: defaultServiceSelect,
      });

      if (!service) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No service found with id '${input.id}'`,
        });
      }

      return service;
    }),
  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Required').max(maxLargeTextLength),
        icon: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.service.create({
        data: { ...input },
        select: defaultServiceSelect,
      });
    }),
  createBulk: privateProcedure
    .input(
      z.array(
        z.object({
          name: z.string().min(1, 'Required').max(maxLargeTextLength),
          icon: z.string().min(1, 'Required'),
        })
      )
    )
    .mutation(async ({ input }) => {
      return prisma.service.createMany({
        data: input,
        skipDuplicates: true,
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        name: z.string().min(1, 'Required').max(maxLargeTextLength),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.service.update({
        where: { id: input.id },
        data: { ...input },
        select: defaultServiceSelect,
      });
    }),
  updateBulk: privateProcedure
    .input(
      z.array(
        z.object({
          id: z.string().min(1, 'Required'),
          name: z.string().min(1, 'Required').max(maxLargeTextLength),
        })
      )
    )
    .mutation(async ({ input }) => {
      const services: Service[] = [];
      const errors: unknown[] = [];

      for (const service of input) {
        try {
          const s = await prisma.service.update({
            where: { id: service.id },
            data: { ...service },
            select: defaultServiceSelect,
          });

          services.push(s);
        } catch (e) {
          errors.push(e);
        }
      }

      return { count: services.length, errors };
    }),
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(maxLimit).default(defaultLimit),
          offset: z.number().min(0).default(0),
          cursor: z.string().nullish(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const limit = input?.limit ?? defaultLimit;

      const items = await prisma.service.findMany({
        select: defaultServiceSelect,
        take: limit + 1,
        skip: input?.cursor ? undefined : input?.offset ?? 0,
        cursor: input?.cursor ? { id: input?.cursor } : undefined,
      });

      return { items, nextCursor: getCursor(items, limit) };
    }),
});
