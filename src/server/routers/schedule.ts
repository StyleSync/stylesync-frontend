import { Day } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { isAfter } from 'date-fns';
import { z } from 'zod';

import { prisma } from '@/server/prisma';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import {
  privateProcedure,
  publicProcedure,
  router,
} from '@/server/trpc-helpers';
import {
  getCursor,
  getProfessionalFromContext,
} from '@/server/utils/prisma-utils';

const defaultLimit = 10;
const maxLimit = 100;

export const scheduleRouter = router({
  get: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const schedule = await prisma.schedule.findUnique({
        where: { id: input.id },
        select: defaultScheduleSelect,
      });

      if (!schedule) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No schedule with id '${input.id}'`,
        });
      }

      return schedule;
    }),
  getSpecificDaySchedule: privateProcedure
    .input(
      z.object({
        professionalId: z.string().min(1, 'Required'),
        specificDay: z.number(),
        specificMonth: z.number(),
        specificYear: z.number(),
      })
    )
    .query(async ({ input }) => {
      const schedule = await prisma.schedule.findMany({
        where: {
          professionalId: input.professionalId,
          isSpecificDay: true,
          specificDay: input.specificDay,
          specificMonth: input.specificMonth,
          specificYear: input.specificYear,
        },
        select: defaultScheduleSelect,
      });

      if (!schedule || schedule.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No schedule for professional'`,
        });
      }

      return schedule[0];
    }),
  getWeekSchedule: privateProcedure
    .input(
      z.object({
        professionalId: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input }) => {
      const schedule = await prisma.schedule.findMany({
        where: { professionalId: input.professionalId, isSpecificDay: false },
        select: defaultScheduleSelect,
      });

      if (!schedule) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No schedule for professional with id '${input.professionalId}'`,
        });
      }

      return schedule;
    }),
  create: privateProcedure
    .input(
      z.object({
        start: z.string().datetime(),
        end: z.string().datetime(),
        day: z.enum([
          Day.MONDAY,
          Day.TUESDAY,
          Day.WEDNESDAY,
          Day.THURSDAY,
          Day.FRIDAY,
          Day.SATURDAY,
          Day.SUNDAY,
        ]),
        isSpecificDay: z.boolean(),
        isDayOff: z.boolean().optional(),
        specificDay: z.number().optional(),
        specificMonth: z.number().optional(),
        specificYear: z.number().optional(),
        breaks: z
          .array(
            z.object({
              start: z.string().datetime(),
              end: z.string().datetime(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (
        input.isSpecificDay &&
        (!input.specificDay ||
          !input.specificMonth ||
          !input.specificYear ||
          input.specificDay === -1 ||
          input.specificMonth === -1 ||
          input.specificYear === -1)
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Specific day schedule must have a date`,
        });
      }

      if (isAfter(new Date(input.start), new Date(input.end))) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `End Date should be after Start Date`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (!input.isSpecificDay) {
        const availableSchedule = await prisma.schedule.findMany({
          where: {
            professionalId: professional.id,
            isSpecificDay: false,
            day: input.day,
          },
        });

        if (availableSchedule.length > 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `There is already a schedule for this day`,
          });
        }
      }

      if (input.isSpecificDay) {
        const existingSchedule = await prisma.schedule.findFirst({
          where: {
            professionalId: professional.id,
            isSpecificDay: input.isSpecificDay,
            specificDay: input.specificDay,
            specificMonth: input.specificMonth,
            specificYear: input.specificYear,
          },
        });

        if (existingSchedule) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `There is already a schedule for this day`,
          });
        }
      }

      const { breaks, ...rest } = input;

      const createResult = await prisma.schedule.create({
        data: {
          ...rest,
          professionalId: professional.id,
        },
        select: defaultScheduleSelect,
      });

      if (breaks) {
        await prisma.break.createMany({
          data: breaks.map((breakItem) => ({
            ...breakItem,
            scheduleId: createResult.id,
          })),
        });
      }

      return createResult;
    }),
  createBulk: privateProcedure
    .input(
      z.object({
        schedules: z.array(
          z.object({
            start: z.string().datetime(),
            end: z.string().datetime(),
            day: z.enum([
              Day.MONDAY,
              Day.TUESDAY,
              Day.WEDNESDAY,
              Day.THURSDAY,
              Day.FRIDAY,
              Day.SATURDAY,
              Day.SUNDAY,
            ]),
            isSpecificDay: z.literal(true),
            isDayOff: z.boolean().optional(),
            specificDay: z.number(),
            specificMonth: z.number(),
            specificYear: z.number(),
            breaks: z
              .array(
                z.object({
                  start: z.string().datetime(),
                  end: z.string().datetime(),
                })
              )
              .optional(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      // Validate all schedules before creating
      for (const schedule of input.schedules) {
        if (isAfter(new Date(schedule.start), new Date(schedule.end))) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `End Date should be after Start Date`,
          });
        }

        if (
          schedule.specificDay === -1 ||
          schedule.specificMonth === -1 ||
          schedule.specificYear === -1
        ) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Specific day is required`,
          });
        }

        const existingSchedule = await prisma.schedule.findFirst({
          where: {
            professionalId: professional.id,
            isSpecificDay: true,
            specificDay: schedule.specificDay,
            specificMonth: schedule.specificMonth,
            specificYear: schedule.specificYear,
          },
          select: {
            id: true,
          },
        });

        if (existingSchedule?.id) {
          await prisma.schedule.delete({
            where: {
              id: existingSchedule.id,
            },
          });
        }
      }

      // Create all schedules in a transaction
      const results = await prisma.$transaction(async (tx) => {
        const createdSchedules: {
          id: string;
          start: Date;
          end: Date;
          day: Day;
          isSpecificDay: boolean;
          specificDay: number | null;
          specificMonth: number | null;
          specificYear: number | null;
          breaks: { id: string; start: Date; end: Date }[];
          createdAt: Date;
          updatedAt: Date;
        }[] = [];

        for (const schedule of input.schedules) {
          const { breaks, ...scheduleData } = schedule;
          const createResult = await tx.schedule.create({
            data: {
              ...scheduleData,
              professionalId: professional.id,
            },
            select: defaultScheduleSelect,
          });

          if (breaks) {
            await tx.break.createMany({
              data: breaks.map((breakItem) => ({
                ...breakItem,
                scheduleId: createResult.id,
              })),
            });
          }

          createdSchedules.push(createResult);
        }

        return createdSchedules;
      });

      return results;
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        start: z.string().datetime().optional(),
        end: z.string().datetime().optional(),
        isDayOff: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      const schedule = await prisma.schedule.findUnique({
        where: { id: input.id },
        select: {
          professionalId: true,
          id: true,
          start: true,
          end: true,
        },
      });

      if (!schedule) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No schedule found with id '${input.id}'`,
        });
      }

      if (schedule.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to update schedule with id '${input.id}'`,
        });
      }

      if (
        isAfter(
          new Date(input.start ?? schedule.start),
          new Date(input.end ?? schedule.end)
        )
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `End Date should be after Start Date`,
        });
      }

      return prisma.schedule.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const schedule = await prisma.schedule.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          professionalId: true,
        },
      });

      if (!schedule) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No schedule found with id '${input.id}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      if (schedule.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to delete service on professional with id '${input.id}'`,
        });
      }

      return prisma.schedule.delete({
        where: { id: input.id },
      });
    }),
  deleteBulk: privateProcedure
    .input(
      z.object({
        ids: z.array(z.string().min(1, 'Required')),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      // First verify all schedules exist and belong to the professional
      const schedules = await prisma.schedule.findMany({
        where: {
          id: { in: input.ids },
        },
        select: {
          id: true,
          professionalId: true,
        },
      });

      // Check if all requested schedules exist
      const foundIds = new Set(schedules.map((s) => s.id));
      const missingIds = input.ids.filter((id) => !foundIds.has(id));

      if (missingIds.length > 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No schedules found with ids: ${missingIds.join(', ')}`,
        });
      }

      // Check if all schedules belong to the professional
      const unauthorizedSchedules = schedules.filter(
        (s) => s.professionalId !== professional.id
      );

      if (unauthorizedSchedules.length > 0) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to delete schedules with ids: ${unauthorizedSchedules.map((s) => s.id).join(', ')}`,
        });
      }

      // Delete all schedules in a transaction
      return prisma.$transaction(
        input.ids.map((id) =>
          prisma.schedule.delete({
            where: { id },
          })
        )
      );
    }),
  list: publicProcedure
    .input(
      z.object({
        professionalId: z.string().min(1, 'Required'),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        limit: z.number().min(1).max(maxLimit).default(defaultLimit),
        offset: z.number().min(0).default(0),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const limit = input?.limit ?? defaultLimit;

      // TODO: Change it so we can work with specificYear, specificMonth and specificDay
      const items = await prisma.schedule.findMany({
        where: {
          isSpecificDay: true,
          professionalId: input.professionalId,
          start: {
            gte: input.startDate ?? new Date(),
            lte: input.endDate ?? new Date(),
          },
          end: {
            gte: input.startDate ?? new Date(),
            lte: input.endDate ?? new Date(),
          },
        },
        select: defaultScheduleSelect,
        take: limit + 1,
        skip: input?.cursor ? undefined : input?.offset ?? 0,
        cursor: input?.cursor ? { id: input?.cursor } : undefined,
      });

      return { items, nextCursor: getCursor(items, limit) };
    }),
  listByDay: publicProcedure
    .input(
      z.object({
        professionalId: z.string().min(1, 'Required'),
        days: z.array(
          z.object({
            specificDay: z.number(),
            specificMonth: z.number(),
            specificYear: z.number(),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      const schedules = await prisma.schedule.findMany({
        where: {
          isSpecificDay: true,
          professionalId: input.professionalId,
          OR: input.days.map((day) => ({
            AND: [
              { specificDay: day.specificDay },
              { specificMonth: day.specificMonth },
              { specificYear: day.specificYear },
            ],
          })),
        },
        select: defaultScheduleSelect,
      });

      return schedules;
    }),
});
