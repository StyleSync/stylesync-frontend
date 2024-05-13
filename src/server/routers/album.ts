import { privateProcedure, publicProcedure, router } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { getProfessionalFromContext } from '@/server/utils/prisma-utils';
import { defaultAlbumSelect } from '@/server/selectors/album';

const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

export const albumRouter = router({
  get: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const albumItem = await prisma.album.findUnique({
        where: { id: input.id },
        select: defaultAlbumSelect,
      });

      if (!albumItem) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No album item found with id '${input.id}'`,
        });
      }

      return albumItem;
    }),
  create: privateProcedure
    .input(
      z.object({
        title: z.string().min(1, 'Required').max(maxLargeTextLength),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      return prisma.album.create({
        data: { ...input, professionalId: professional.id },
        select: defaultAlbumSelect,
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
      })
    )
    .mutation(async ({ input, ctx }) => {
      const albumItem = await prisma.album.findUnique({
        where: { id: input.id },
        select: { ...defaultAlbumSelect, professionalId: true },
      });

      if (!albumItem) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `There was error updating album item '${input.id}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (albumItem.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to update album with id '${input.id}'`,
        });
      }

      return prisma.album.update({
        where: { id: input.id },
        data: { ...input },
        select: defaultAlbumSelect,
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const albumItem = await prisma.album.findUnique({
        where: { id: input.id },
        select: { ...defaultAlbumSelect, professionalId: true },
      });

      if (!albumItem) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No album found with id '${input.id}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (albumItem.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to delete album with id '${input.id}'`,
        });
      }

      return prisma.album.delete({
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
      return prisma.album.findMany({
        where: {
          professionalId: input?.professionalId,
        },
        select: defaultAlbumSelect,
        take: input?.limit ?? defaultLimit,
        skip: input?.offset ?? 0,
      });
    }),
});
