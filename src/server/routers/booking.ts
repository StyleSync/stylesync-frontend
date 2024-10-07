import { privateProcedure, publicProcedure, router } from '../trpc-helpers';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import {
  defaultBookingSelect,
  defaultServiceOnProfessionalSelect,
} from '@/server/selectors';
import uniqueString from 'unique-string';
import {
  checkProfessionalAccessToBooking,
  getProfessionalFromServiceOnProfessional,
} from '@/server/utils/prisma-utils';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import {
  isTimeWithinPeriods,
  isTimeWithinSchedule,
  mergeDates,
} from '@/server/utils/helpers';
import { BookingStatus, Day } from '@prisma/client';
import { addHours, endOfDay, isAfter, startOfDay } from 'date-fns';
import { availableList } from '@/server/routers/booking/available.list';
import { availableReschedule } from '@/server/routers/booking/available.reschedule';
import { rescheduleBooking } from '@/server/routers/booking/reschedule';

const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

export const bookingRouter = router({
  getByCode: publicProcedure
    .input(
      z.object({
        code: z.string().min(1, 'Required'),
        expand: z.array(z.enum(['serviceProfessional'])).optional(),
      })
    )
    .query(async ({ input }) => {
      const booking = await prisma.booking.findUnique({
        where: { code: input.code },
        select: {
          ...defaultBookingSelect,
          serviceProfessional: !!input.expand?.includes(
            'serviceProfessional'
          ) && {
            select: defaultServiceOnProfessionalSelect,
          },
        },
      });

      if (!booking) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No booking found with code '${input.code}'`,
        });
      }

      return booking;
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        expand: z.array(z.enum(['serviceProfessional'])).optional(),
      })
    )
    .query(async ({ input }) => {
      const booking = await prisma.booking.findUnique({
        where: { id: input.id },
        select: {
          ...defaultBookingSelect,
          serviceProfessional: !!input.expand?.includes(
            'serviceProfessional'
          ) && {
            select: defaultServiceOnProfessionalSelect,
          },
        },
      });

      if (!booking) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No booking found with id '${input.id}'`,
        });
      }

      return booking;
    }),
  available: router({
    list: availableList,
    reschedule: availableReschedule,
  }),
  reschedule: rescheduleBooking,
  status: router({
    update: privateProcedure
      .input(
        z.object({
          id: z.string().min(1, 'Required'),
          status: z.enum([
            BookingStatus.APPROVED,
            BookingStatus.REJECTED,
            BookingStatus.MISSED,
            BookingStatus.FINISHED,
          ]),
        })
      )
      .mutation(async ({ input, ctx }) => {
        await checkProfessionalAccessToBooking(ctx, input.id);

        return prisma.booking.update({
          where: { id: input.id },
          data: { status: input.status },
          select: defaultBookingSelect,
        });
      }),
    cancelByCode: publicProcedure
      .input(
        z.object({
          code: z.string().min(1, 'Required'),
        })
      )
      .mutation(async ({ input }) => {
        const booking = await prisma.booking.findUnique({
          where: { code: input.code },
          select: defaultBookingSelect,
        });

        if (!booking) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No booking found with code '${input.code}'`,
          });
        }

        return prisma.booking.update({
          where: { code: input.code },
          data: { status: BookingStatus.CANCELED },
          select: defaultBookingSelect,
        });
      }),
  }),
  create: publicProcedure
    .input(
      z.object({
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
        date: z.string().datetime(),
        userId: z.string().min(1, 'Required').optional(),
        guestFirstName: z.string().min(1, 'Required').max(maxLargeTextLength),
        guestLastName: z.string().max(maxLargeTextLength).optional(),
        guestPhone: z.string().min(1, 'Required').max(maxLargeTextLength),
        guestEmail: z.string().email().or(z.literal('')),
        serviceProfessionalId: z.string().min(1, 'Required'),
        day: z.enum([
          Day.MONDAY,
          Day.TUESDAY,
          Day.WEDNESDAY,
          Day.THURSDAY,
          Day.FRIDAY,
          Day.SATURDAY,
          Day.SUNDAY,
        ]),
      })
    )
    .mutation(async ({ input }) => {
      const professional = await getProfessionalFromServiceOnProfessional(
        input.serviceProfessionalId
      );

      if (isAfter(new Date(input.startTime), new Date(input.endTime))) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `End Date should be after Start Date`,
        });
      }

      if (
        isAfter(new Date(), new Date(mergeDates(input.date, input.startTime)))
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `You have selected a past date`,
        });
      }

      // For now we won't have specific day schedule
      // first we check if we have specific schedule for the day
      // const specificDaySchedule = await prisma.schedule.findFirst({
      //   where: {
      //     professionalId: professional.id,
      //     isSpecificDay: true,
      //     date: startOfDay(new Date(input.date)),
      //   },
      //   select: defaultScheduleSelect,
      // });
      //
      // if (
      //   specificDaySchedule &&
      //   !isTimeWithinSchedule(
      //     input.startTime,
      //     input.endTime,
      //     specificDaySchedule
      //   )
      // ) {
      //   throw new TRPCError({
      //     code: 'BAD_REQUEST',
      //     message: `Time is not within specific schedule`,
      //   });
      // }

      // For now disabled if
      // next we check default schedule for the day
      // if (!specificDaySchedule) {
      const selectedDaySchedule = await prisma.schedule.findFirst({
        where: {
          professionalId: professional.id,
          isSpecificDay: false,
          day: input.day,
        },
        select: defaultScheduleSelect,
      });

      if (
        selectedDaySchedule &&
        !isTimeWithinSchedule(
          input.startTime,
          input.endTime,
          selectedDaySchedule
        )
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Time is not within schedule`,
        });
      }

      if (!selectedDaySchedule) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `This is a day off`,
        });
      }
      // }

      // next we check if our booking is at the same time as another booking
      const allServices = await prisma.serviceOnProfessional.findMany({
        where: {
          professionalId: professional.id,
        },
        select: {
          id: true,
        },
      });
      const servicesIds = allServices.map((service) => service.id);
      const existingBooking = await prisma.booking.findMany({
        where: {
          serviceProfessionalId: { in: servicesIds },
          date: {
            gte: new Date(input.date),
            lte: addHours(new Date(input.date), 24),
          },
        },
      });

      if (
        isTimeWithinPeriods(input.startTime, input.endTime, existingBooking)
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `There is another booking at this time`,
        });
      }

      const inputDate = mergeDates(input.date, input.startTime);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { day, ...createData } = input;

      const booking = await prisma.booking.create({
        data: {
          ...createData,
          status: BookingStatus.PENDING,
          date: inputDate,
          code: uniqueString(),
        },
        select: {
          ...defaultBookingSelect,
          code: true,
          serviceProfessional: { select: defaultServiceOnProfessionalSelect },
        },
      });

      if (!booking) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `There was error creating booking`,
        });
      }

      return booking;
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await checkProfessionalAccessToBooking(ctx, input.id);

      return prisma.booking.delete({
        where: { id: input.id },
      });
    }),
  list: publicProcedure
    .input(
      z
        .object({
          professionalId: z.string().min(1, 'Required').optional(),
          serviceProfessionalId: z.string().min(1, 'Required').optional(),
          date: z.string().datetime().optional(),
          startDate: z.string().datetime().optional(),
          endDate: z.string().datetime().optional(),
          limit: z.number().min(1).max(maxLimit).default(defaultLimit),
          offset: z.number().min(0).default(0),
          expand: z.array(z.enum(['serviceProfessional'])).optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
          sortField: z.enum(['date']).optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const serviceOnProfessionalIds = [];

      if (input?.professionalId) {
        const listServiceOnProfessionals =
          await prisma.serviceOnProfessional.findMany({
            where: {
              professionalId: input.professionalId,
            },
            select: {
              id: true,
            },
          });

        for (const serviceOnProfessional of listServiceOnProfessionals) {
          serviceOnProfessionalIds.push(serviceOnProfessional.id);
        }
      }

      return prisma.booking.findMany({
        where: {
          serviceProfessionalId: !!input?.serviceProfessionalId
            ? input?.serviceProfessionalId
            : { in: serviceOnProfessionalIds },
          AND: [
            input?.date
              ? {
                  date: {
                    gte: startOfDay(new Date(input.date)),
                    lte: endOfDay(new Date(input.date)),
                  },
                }
              : {},
            input?.startDate ? { date: { gte: input.startDate } } : {},
            input?.endDate ? { date: { lte: input.endDate } } : {},
          ],
        },
        select: {
          ...defaultBookingSelect,
          serviceProfessional: !!input?.expand?.includes(
            'serviceProfessional'
          ) && {
            select: defaultServiceOnProfessionalSelect,
          },
        },
        orderBy: input?.sortField && {
          [input.sortField]: input.sortDirection ?? 'asc',
        },
        take: input?.limit ?? defaultLimit,
        skip: input?.offset ?? 0,
      });
    }),
});
