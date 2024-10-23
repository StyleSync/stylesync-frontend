import { privateProcedure, publicProcedure, router } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { Day, Role } from '@prisma/client';
import {
  defaultProfessionalSelect,
  defaultServiceOnProfessionalSelect,
  defaultUserSelect,
} from '@/server/selectors';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import { defaultLocationSelect } from '@/server/selectors/location';
import { publicUserSelect } from '@/server/selectors/user';
import { defaultAlbumSelect } from '@/server/selectors/album';

const maxTextLength = 100;
const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

export const professionalRouter = router({
  get: publicProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        expand: z
          .array(z.enum(['albums', 'services', 'user', 'schedule', 'location']))
          .nullable(),
      })
    )
    .query(async ({ input }) => {
      const professional = await prisma.professional.findUnique({
        where: { userId: input.id },
        select: {
          ...defaultProfessionalSelect,
          albums: !!input?.expand?.includes('albums') && {
            select: defaultAlbumSelect,
          },
          services: !!input?.expand?.includes('services') && {
            select: defaultServiceOnProfessionalSelect,
          },
          user: !!input?.expand?.includes('user') && {
            select: publicUserSelect,
          },
          schedule: !!input?.expand?.includes('schedule') && {
            select: defaultScheduleSelect,
            take: 7,
            where: { isSpecificDay: false },
          },
          location: !!input?.expand?.includes('location') && {
            select: defaultLocationSelect,
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
        facebook: z.string().max(maxTextLength).nullish(),
        instagram: z.string().max(maxTextLength).nullish(),
        about: z.string().max(maxLargeTextLength).optional(),
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
        facebook: z.string().max(maxTextLength).nullish(),
        instagram: z.string().max(maxTextLength).nullish(),
        about: z.string().max(maxLargeTextLength).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.user;

      return prisma.professional.update({
        where: { userId: id },
        data: { ...input },
        select: defaultProfessionalSelect,
      });
    }),
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(maxLimit).default(defaultLimit),
        offset: z.number().min(0).default(0),
        serviceIds: z.array(z.string()).optional(),
        day: z
          .enum([
            Day.MONDAY,
            Day.TUESDAY,
            Day.WEDNESDAY,
            Day.THURSDAY,
            Day.FRIDAY,
            Day.SATURDAY,
            Day.SUNDAY,
          ])
          .optional(),
        query: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        precision: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const defaultPrecision = 0.3;
      const precision = input.precision || defaultPrecision;

      return prisma.professional.findMany({
        select: {
          ...defaultProfessionalSelect,
          user: {
            select: defaultUserSelect,
          },
        },
        where: {
          OR: [
            {
              user: {
                firstName: {
                  contains: input.query,
                  mode: 'insensitive',
                },
              },
            },
            {
              user: {
                lastName: {
                  contains: input.query,
                  mode: 'insensitive',
                },
              },
            },
            {
              services: {
                some: {
                  title: {
                    contains: input.query,
                    mode: 'insensitive',
                  },
                },
              },
            },
          ],
          ...(input.serviceIds && {
            services: {
              some: {
                serviceId: {
                  in: input.serviceIds,
                },
              },
            },
          }),
          ...(input.day && {
            schedule: {
              some: {
                isSpecificDay: false,
                day: input.day,
              },
            },
          }),
          ...(input.latitude &&
            input.longitude && {
              AND: [
                {
                  location: {
                    latitude: {
                      gte: input.latitude - precision,
                      lte: input.latitude + precision,
                    },
                  },
                },
                {
                  location: {
                    longitude: {
                      gte: input.longitude - precision,
                      lte: input.longitude + precision,
                    },
                  },
                },
              ],
            }),
        },
        take: input.limit,
        skip: input.offset,
      });
    }),
  getProfileCompletionStatus: publicProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const professional = await prisma.professional.findUnique({
        where: { userId: input.id },
        select: {
          ...defaultProfessionalSelect,
          services: {
            select: defaultServiceOnProfessionalSelect,
          },
          user: {
            select: publicUserSelect,
          },
          schedule: {
            select: defaultScheduleSelect,
            take: 7,
            where: { isSpecificDay: false },
          },
        },
      });

      const requirements: {
        requirementCompleted: boolean;
        requirementTitle: string;
      }[] = [];

      if (!professional) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No professional for user with id '${input.id}'`,
        });
      }

      // profile data requirement
      requirements.push({
        requirementCompleted:
          !!professional.user.phone && !!professional.user.avatar,
        requirementTitle:
          'professional.settings.profileRequirements.profileData',
      });

      // at least 1 service requirement
      requirements.push({
        requirementCompleted: professional.services.length > 0,
        requirementTitle: 'professional.settings.profileRequirements.services',
      });

      // schedule
      requirements.push({
        requirementCompleted: professional.schedule.length > 0,
        requirementTitle: 'professional.settings.profileRequirements.schedule',
      });

      return {
        requirements,
        completedCount: requirements.filter(
          (requirement) => requirement.requirementCompleted
        ).length,
        isAllCompleted: requirements.every(
          (requirement) => requirement.requirementCompleted
        ),
      };
    }),
});
