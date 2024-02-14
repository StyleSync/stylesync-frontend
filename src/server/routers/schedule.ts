import { privateProcedure, publicProcedure, router } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { Day } from '@prisma/client';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import { getProfessionalFromContext } from '@/server/utils/prisma-utils';
import { mapDateToDayEnum } from '@/server/utils/helpers';
import { isAfter, startOfDay } from 'date-fns';

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
        date: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const inputDate = input.date
        ? startOfDay(new Date(input.date))
        : input.date;

      if (input.isSpecificDay && !input.date) {
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

      if (input.date && mapDateToDayEnum(input.date) !== input.day) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Day and date do not match`,
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

      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          professionalId: professional.id,
          isSpecificDay: input.isSpecificDay,
          day: input.day,
          date: inputDate,
        },
      });

      if (existingSchedule) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `There is already a schedule for this day`,
        });
      }

      return prisma.schedule.create({
        data: {
          ...input,
          date: inputDate,
          professionalId: professional.id,
        },
        select: defaultScheduleSelect,
      });
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        start: z.string().datetime().optional(),
        end: z.string().datetime().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      const schedule = await prisma.schedule.findUnique({
        where: { id: input.id },
        select: {
          professionalId: true,
          id: true,
          date: true,
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
  list: publicProcedure
    .input(
      z.object({
        professionalId: z.string().min(1, 'Required'),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        limit: z.number().min(1).max(maxLimit).default(defaultLimit),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      return prisma.schedule.findMany({
        where: {
          isSpecificDay: true,
          professionalId: input.professionalId,
          date: {
            gte: input.startDate,
            lte: input.endDate,
          },
        },
        select: defaultScheduleSelect,
        take: input.limit,
        skip: input.offset,
      });
    }),
});
