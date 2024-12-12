import { privateProcedure, publicProcedure, router } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { defaultPortfolioSelect } from '@/server/selectors';
import {
  getCursor,
  getProfessionalFromContext,
} from '@/server/utils/prisma-utils';
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
        albumId: z.string().min(1, 'Required'),
        link: z.string().url('Invalid url'),
        title: z.string().min(1, 'Required').max(maxLargeTextLength),
        description: z.string().max(maxLargeTextLength).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const album = await prisma.album.findUnique({
        where: { id: input.albumId },
        select: { professionalId: true },
      });

      if (!album) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No album found with id '${input.albumId}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (album.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to create portfolio for album with id '${input.albumId}'`,
        });
      }

      return prisma.portfolio.create({
        data: { ...input },
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
        select: { ...defaultPortfolioSelect, albumId: true },
      });

      if (!portfolioItem) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `There was error updating portfolio item '${input.id}'`,
        });
      }

      const album = await prisma.album.findUnique({
        where: { id: portfolioItem.albumId },
        select: { professionalId: true },
      });

      if (!album) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No album found with id '${portfolioItem.albumId}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (album.professionalId !== professional.id) {
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
        select: { ...defaultPortfolioSelect, albumId: true },
      });

      if (!portfolioItem) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No portfolio found with id '${input.id}'`,
        });
      }

      const album = await prisma.album.findUnique({
        where: { id: portfolioItem.albumId },
        select: { professionalId: true },
      });

      if (!album) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No album found with id '${portfolioItem.albumId}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (album.professionalId !== professional.id) {
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
          albumId: z.string().min(1, 'Required').optional(),
          limit: z.number().min(1).max(maxLimit).default(defaultLimit),
          offset: z.number().min(0).default(0),
          cursor: z.string().nullish(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const limit = input?.limit ?? defaultLimit;

      const items = await prisma.portfolio.findMany({
        where: {
          albumId: input?.albumId,
        },
        select: defaultPortfolioSelect,
        take: limit + 1,
        skip: input?.cursor ? undefined : input?.offset ?? 0,
        cursor: input?.cursor ? { id: input?.cursor } : undefined,
      });

      return { items, nextCursor: getCursor(items, limit) };
    }),
});
