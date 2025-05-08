import { Currency } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/server/prisma';
import { defaultServiceOnProfessionalSelect } from '@/server/selectors';
import {
  privateProcedure,
  publicProcedure,
  router,
} from '@/server/trpc-helpers';
import {
  getCursor,
  getProfessionalFromContext,
} from '@/server/utils/prisma-utils';

const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

export const serviceOnProfessionalRouter = router({
  get: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const serviceOnProfessional =
        await prisma.serviceOnProfessional.findUnique({
          where: { id: input.id },
          select: defaultServiceOnProfessionalSelect,
        });

      if (!serviceOnProfessional) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No service on professional found with id '${input.id}'`,
        });
      }

      return serviceOnProfessional;
    }),
  create: privateProcedure
    .input(
      z.object({
        title: z.string().min(1, 'Required').max(maxLargeTextLength),
        price: z.number().min(1, 'Required'),
        currency: z.enum([Currency.USD, Currency.UAH, Currency.EUR]),
        duration: z.number().min(1, 'Required'),
        description: z.string().optional(),
        serviceId: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      const serviceOnProfessional = await prisma.serviceOnProfessional.create({
        data: { ...input, professionalId: professional.id },
        select: defaultServiceOnProfessionalSelect,
      });

      if (!serviceOnProfessional) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `There was error creating service on professional '${input.title}'`,
        });
      }

      return serviceOnProfessional;
    }),
  createBulk: privateProcedure
    .input(
      z.array(
        z.object({
          title: z.string().min(1, 'Required').max(maxLargeTextLength),
          price: z.number().min(1, 'Required'),
          currency: z.enum([Currency.USD, Currency.UAH, Currency.EUR]),
          duration: z.number().min(1, 'Required'),
          serviceId: z.string().min(1, 'Required'),
          description: z.string().optional(),
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      return prisma.serviceOnProfessional.createMany({
        data: input.map((item) => ({
          ...item,
          professionalId: professional.id,
        })),
        skipDuplicates: true,
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        title: z.string().min(1, 'Required').max(maxLargeTextLength).optional(),
        price: z.number().min(1, 'Required').optional(),
        currency: z.enum([Currency.USD, Currency.UAH, Currency.EUR]).optional(),
        duration: z.number().min(1, 'Required').optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const serviceOnProfessional =
        await prisma.serviceOnProfessional.findUnique({
          where: { id: input.id },
          select: defaultServiceOnProfessionalSelect,
        });

      if (!serviceOnProfessional) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `There was error updating service '${input.id}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (serviceOnProfessional.professional.id !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to delete service on professional with id '${input.id}'`,
        });
      }

      return prisma.serviceOnProfessional.update({
        where: { id: input.id },
        data: { ...input },
        select: defaultServiceOnProfessionalSelect,
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const serviceOnProfessional =
        await prisma.serviceOnProfessional.findUnique({
          where: { id: input.id },
          select: defaultServiceOnProfessionalSelect,
        });

      if (!serviceOnProfessional) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No service on professional found with id '${input.id}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (serviceOnProfessional.professional.id !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to delete service on professional with id '${input.id}'`,
        });
      }

      return prisma.serviceOnProfessional.delete({
        where: { id: input.id },
      });
    }),
  list: publicProcedure
    .input(
      z
        .object({
          serviceId: z.string().min(1, 'Required').optional(),
          professionalId: z.string().min(1, 'Required').optional(),
          limit: z.number().min(1).max(maxLimit).default(defaultLimit),
          offset: z.number().min(0).default(0),
          cursor: z.string().nullish(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const limit = input?.limit ?? defaultLimit;

      const items = await prisma.serviceOnProfessional.findMany({
        where: {
          serviceId: input?.serviceId,
          professionalId: input?.professionalId,
        },
        select: defaultServiceOnProfessionalSelect,
        take: limit + 1,
        skip: input?.cursor ? undefined : input?.offset ?? 0,
        cursor: input?.cursor ? { id: input?.cursor } : undefined,
      });

      return { items, nextCursor: getCursor(items, limit) };
    }),
});
