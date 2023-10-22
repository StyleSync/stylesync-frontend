import { privateProcedure, publicProcedure, router } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { Role } from '@prisma/client';
import {
  defaultPortfolioSelect,
  defaultProfessionalSelect,
  defaultServiceSelect,
  defaultUserSelect,
} from '@/server/selectors';

const maxTextLength = 32;
const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

export const professionalRouter = router({
  get: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        expand: z.array(z.enum(['portfolios', 'services', 'user'])).nullable(),
      })
    )
    .query(async ({ input }) => {
      const professional = await prisma.professional.findUnique({
        where: { id: input.id },
        select: {
          ...defaultProfessionalSelect,
          portfolios: !!input?.expand?.includes('portfolios') && {
            select: defaultPortfolioSelect,
          },
          services: !!input?.expand?.includes('services') && {
            select: defaultServiceSelect,
          },
          user: !!input?.expand?.includes('user') && {
            select: defaultUserSelect,
          },
        },
      });

      if (!professional) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No professional for user with id '${input.id}'`,
        });
      }

      return professional;
    }),
  create: privateProcedure
    .input(
      z.object({
        facebook: z
          .string()
          .url('Invalid url')
          .min(1, 'Required')
          .max(maxTextLength)
          .nullish(),
        instagram: z
          .string()
          .url('Invalid url')
          .min(1, 'Required')
          .max(maxTextLength)
          .nullish(),
        about: z.string().min(1, 'Required').max(maxLargeTextLength).nullish(),
        schedule: z.string().min(1, 'Required').max(maxTextLength).nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const professional = await prisma.professional.create({
        data: { ...input, userId: id },
        select: defaultProfessionalSelect,
      });

      if (!professional) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No professional for user with id '${id}'`,
        });
      }

      await prisma.user.update({
        where: { id },
        data: { userType: Role.PROFESSIONAL },
        select: defaultUserSelect,
      });

      return professional;
    }),
  update: privateProcedure
    .input(
      z.object({
        facebook: z
          .string()
          .url('Invalid url')
          .min(1, 'Required')
          .max(maxTextLength)
          .nullish(),
        instagram: z
          .string()
          .url('Invalid url')
          .min(1, 'Required')
          .max(maxTextLength)
          .nullish(),
        about: z.string().min(1, 'Required').max(maxLargeTextLength).nullish(),
        schedule: z.string().min(1, 'Required').max(maxTextLength).nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const professional = await prisma.professional.update({
        where: { userId: id },
        data: { ...input },
        select: defaultProfessionalSelect,
      });

      if (!professional) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No professional for user with id '${id}'`,
        });
      }

      return professional;
    }),
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(maxLimit).default(defaultLimit),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      return prisma.professional.findMany({
        select: {
          ...defaultProfessionalSelect,
          user: {
            select: defaultUserSelect,
          },
        },
        take: input.limit,
        skip: input.offset,
      });
    }),
});
