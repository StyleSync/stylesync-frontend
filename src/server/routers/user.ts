import { Role } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/server/prisma';
import {
  defaultBookingSelect,
  defaultCompanySelect,
  defaultProfessionalSelect,
  defaultUserSelect,
} from '@/server/selectors';
import { publicUserSelect } from '@/server/selectors/user';
import {
  privateProcedure,
  publicProcedure,
  router,
} from '@/server/trpc-helpers';

const maxTextLength = 32;

export const userRouter = router({
  me: privateProcedure
    .input(
      z
        .object({
          expand: z
            .array(z.enum(['professional', 'company', 'bookings']))
            .nullable(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          ...defaultUserSelect,
          professional: !!input?.expand?.includes('professional') && {
            select: defaultProfessionalSelect,
          },
          company: !!input?.expand?.includes('company') && {
            select: defaultCompanySelect,
          },
          bookings: !!input?.expand?.includes('bookings') && {
            select: defaultBookingSelect,
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${id}'`,
        });
      }

      return user;
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        expand: z.array(z.enum(['professional', 'company'])).nullable(),
      })
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.id },
        select: {
          ...publicUserSelect,
          professional: !!input?.expand?.includes('professional') && {
            select: defaultProfessionalSelect,
          },
          company: !!input?.expand?.includes('company') && {
            select: defaultCompanySelect,
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${input.id}'`,
        });
      }

      return user;
    }),
  update: privateProcedure
    .input(
      z.object({
        firstName: z.string().min(1, 'Required').max(maxTextLength).nullish(),
        lastName: z.string().min(1, 'Required').max(maxTextLength).nullish(),
        onboardingCompleted: z.boolean().optional(),
        userType: z.enum([Role.PROFESSIONAL, Role.CUSTOMER]).nullish(),
        phone: z.string().min(1, 'Required').max(maxTextLength).nullish(),
        email: z
          .string()
          .email('Invalid email')
          .min(1, 'Required')
          .max(maxTextLength)
          .nullish(),
        nickname: z.string().min(1, 'Required').max(maxTextLength).nullish(),
        image: z
          .string()
          .url('Invalid url')
          .min(1, 'Required')
          .max(maxTextLength)
          .nullish(),
        avatar: z.string().url('Invalid url').min(1, 'Required').nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;

      const user = await prisma.user.update({
        where: { id },
        data: { ...input },
        select: defaultUserSelect,
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${id}'`,
        });
      }

      return user;
    }),
  checkNickname: publicProcedure
    .input(
      z.object({
        nickname: z.string().min(1, 'Required').max(maxTextLength),
      })
    )
    .query(async ({ input }) => {
      const existingUser = await prisma.user.findUnique({
        where: { nickname: input.nickname },
        select: { id: true },
      });

      return {
        available: !existingUser,
        userId: existingUser?.id,
        userExist: !!existingUser,
      };
    }),
});
