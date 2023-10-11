import { router, privateProcedure } from '../trpc-helpers';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';

/**
 * Default selector for User.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  avatar: true,
  firstName: true,
  lastName: true,
  phone: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  company: true,
  bookings: true,
  professional: true,
});

const defaultProfessionalSelect = Prisma.validator<Prisma.ProfessionalSelect>()(
  {
    id: true,
    facebook: true,
    instagram: true,
    about: true,
    schedule: true,
  }
);

const maxTextLength = 32;
const maxLargeTextLength = 140;

export const userRouter = router({
  me: privateProcedure.query(async ({ ctx }) => {
    const { id } = ctx.user;
    const user = await prisma.user.findUnique({
      where: { id },
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
  update: privateProcedure
    .input(
      z.object({
        firstName: z.string().min(1, 'Required').max(maxTextLength).nullish(),
        lastName: z.string().min(1, 'Required').max(maxTextLength).nullish(),
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
  professionalData: privateProcedure.query(async ({ ctx }) => {
    const { id } = ctx.user;
    const professional = await prisma.professional.findUnique({
      where: { userId: id },
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
  professionalCreate: privateProcedure
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

      return professional;
    }),
  professionalUpdate: privateProcedure
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
});
