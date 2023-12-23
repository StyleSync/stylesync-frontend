import { privateProcedure, publicProcedure, router } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { defaultLocationSelect } from '@/server/selectors';
import { getProfessionalFromContext } from '@/server/utils/prisma-utils';

const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

export const locationRouter = router({
  get: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const location = await prisma.location.findUnique({
        where: { id: input.id },
        select: defaultLocationSelect,
      });

      if (!location) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No location found with id '${input.id}'`,
        });
      }

      return location;
    }),
  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Required').max(maxLargeTextLength),
        address: z
          .string()
          .min(1, 'Required')
          .max(maxLargeTextLength)
          .optional(),
        postalCode: z
          .string()
          .min(1, 'Required')
          .max(maxLargeTextLength)
          .optional(),
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      const professionLocation = await prisma.location.findUnique({
        where: { professionalId: professional.id },
      });

      if (professionLocation) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You already have location`,
        });
      }

      return prisma.location.create({
        data: { ...input, professionalId: professional.id },
        select: defaultLocationSelect,
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        name: z.string().min(1, 'Required').max(maxLargeTextLength).optional(),
        address: z
          .string()
          .min(1, 'Required')
          .max(maxLargeTextLength)
          .optional(),
        postalCode: z
          .string()
          .min(1, 'Required')
          .max(maxLargeTextLength)
          .optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      const location = await prisma.location.findUnique({
        where: { id: input.id },
        select: { professional: { select: { id: true } } },
      });

      if (!location) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `There was no location with '${input.id}'`,
        });
      }

      if (location.professional.id !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to delete location with id '${input.id}'`,
        });
      }

      return prisma.location.update({
        where: { id: input.id },
        data: { ...input },
        select: defaultLocationSelect,
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const location = await prisma.location.findUnique({
        where: { id: input.id },
        select: { professional: { select: { id: true } } },
      });

      if (!location) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No location found with id '${input.id}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (location.professional.id !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to delete location with id '${input.id}'`,
        });
      }

      return prisma.location.delete({
        where: { id: input.id },
      });
    }),
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(maxLimit).default(defaultLimit),
          offset: z.number().min(0).default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      return prisma.location.findMany({
        select: defaultLocationSelect,
        take: input?.limit ?? defaultLimit,
        skip: input?.offset ?? 0,
      });
    }),
  getByProfessionalId: publicProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const location = await prisma.location.findUnique({
        where: { professionalId: input.id },
        select: defaultLocationSelect,
      });

      if (!location) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No location found with id '${input.id}'`,
        });
      }

      return location;
    }),
});
