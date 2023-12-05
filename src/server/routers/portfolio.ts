import { privateProcedure, publicProcedure, router } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { defaultPortfolioSelect } from '@/server/selectors';
import { getProfessionalFromContext } from '@/server/utils/prisma-utils';
import { del } from '@vercel/blob';

const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

export const portfolioRouter = router({
  get: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const portfolioItem = await prisma.portfolio.findUnique({
        where: { id: input.id },
        select: defaultPortfolioSelect,
      });

      if (!portfolioItem) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No portfolio item found with id '${input.id}'`,
        });
      }

      return portfolioItem;
    }),
  create: privateProcedure
    .input(
      z.object({
        link: z.string().url('Invalid url'),
        title: z.string().min(1, 'Required').max(maxLargeTextLength),
        description: z.string().max(maxLargeTextLength).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      return prisma.portfolio.create({
        data: { ...input, professionalId: professional.id },
        select: defaultPortfolioSelect,
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        title: z
          .string()
          .min(1, "Title can't he empty")
          .max(maxLargeTextLength)
          .optional(),
        description: z.string().max(maxLargeTextLength).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const portfolioItem = await prisma.portfolio.findUnique({
        where: { id: input.id },
        select: defaultPortfolioSelect,
      });

      if (!portfolioItem) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `There was error updating portfolio item '${input.id}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (portfolioItem.professional.id !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to update portfolio with id '${input.id}'`,
        });
      }

      return prisma.portfolio.update({
        where: { id: input.id },
        data: { ...input },
        select: defaultPortfolioSelect,
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const portfolioItem = await prisma.portfolio.findUnique({
        where: { id: input.id },
        select: defaultPortfolioSelect,
      });

      if (!portfolioItem) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No portfolio found with id '${input.id}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (portfolioItem.professional.id !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to delete portfolio with id '${input.id}'`,
        });
      }

      await del(portfolioItem.link);

      return prisma.portfolio.delete({
        where: { id: input.id },
      });
    }),
  list: publicProcedure
    .input(
      z
        .object({
          professionalId: z.string().min(1, 'Required').optional(),
          limit: z.number().min(1).max(maxLimit).default(defaultLimit),
          offset: z.number().min(0).default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      return prisma.portfolio.findMany({
        where: {
          professionalId: input?.professionalId,
        },
        select: defaultPortfolioSelect,
        take: input?.limit ?? defaultLimit,
        skip: input?.offset ?? 0,
      });
    }),
});
