import { router, privateProcedure } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { Role } from '@prisma/client';
import {
  defaultBookingSelect,
  defaultCompanySelect,
  defaultProfessionalSelect,
  defaultUserSelect,
} from '@/server/selectors';

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
  get: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        expand: z
          .array(z.enum(['professional', 'company', 'bookings']))
          .nullable(),
      })
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.id },
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
});
