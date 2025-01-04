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
  getCursor,
  getProfessionalFromContext,
  getProfessionalFromServiceOnProfessional,
} from '@/server/utils/prisma-utils';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import {
  isTimeWithinPeriods,
  isTimeWithinSchedule,
} from '@/server/utils/helpers';
import { BookingStatus, Day } from '@prisma/client';
import { addHours, endOfDay, isAfter, startOfDay } from 'date-fns';
import { availableList } from '@/server/routers/booking/available.list';
import { availableReschedule } from '@/server/routers/booking/available.reschedule';
import { rescheduleBooking } from '@/server/routers/booking/reschedule';
import { SmsService } from '@/server/services/sms.service';

const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

const smsLimitForMonth = 50;

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
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromServiceOnProfessional(
        input.serviceProfessionalId
      );

      if (isAfter(new Date(input.startTime), new Date(input.endTime))) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `End Date should be after Start Date`,
        });
      }

      if (isAfter(new Date(), new Date(input.startTime))) {
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
          startTime: {
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { day, date, ...createData } = input;

      const booking = await prisma.booking.create({
        data: {
          ...createData,
          userId: ctx?.user?.id,
          status: BookingStatus.PENDING,
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

      if (professional.isBetaUser) {
        const foundSmsUsage = await prisma.smsUsage.findFirst({
          where: {
            userId: professional.userId,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
          },
        });

        // if we have reached the limit of sms for the month then we stop here
        if (foundSmsUsage && foundSmsUsage.count >= smsLimitForMonth) {
          return booking;
        }

        if (!foundSmsUsage) {
          await prisma.smsUsage.create({
            data: {
              userId: professional.userId,
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              count: 1,
            },
          });
        }

        if (foundSmsUsage) {
          await prisma.smsUsage.update({
            where: { id: foundSmsUsage.id },
            data: { count: foundSmsUsage.count + 1 },
          });
        }

        await SmsService.sendSms({
          phone: createData.guestPhone,
          // TODO: think about translations for thsi message
          message: `Vashe bronjuvannya: ${process.env.SMS_REDIRECT_URL}/bookings/${booking.code}`,
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
  list: privateProcedure
    .input(
      z
        .object({
          serviceProfessionalId: z.string().min(1, 'Required').optional(),
          date: z.string().datetime().optional(),
          startDate: z.string().datetime().optional(),
          endDate: z.string().datetime().optional(),
          limit: z.number().min(1).max(maxLimit).default(defaultLimit),
          offset: z.number().min(0).default(0),
          cursor: z.string().nullish(),
          expand: z.array(z.enum(['serviceProfessional'])).optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
          sortField: z.enum(['startTime']).optional(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      const serviceOnProfessionalIds = [];
      const limit = input?.limit ?? defaultLimit;
      const professional = await getProfessionalFromContext(ctx);

      if (professional.id) {
        const listServiceOnProfessionals =
          await prisma.serviceOnProfessional.findMany({
            where: {
              professionalId: professional.id,
            },
            select: {
              id: true,
            },
          });

        for (const serviceOnProfessional of listServiceOnProfessionals) {
          serviceOnProfessionalIds.push(serviceOnProfessional.id);
        }
      }

      const items = await prisma.booking.findMany({
        where: {
          serviceProfessionalId: !!input?.serviceProfessionalId
            ? input?.serviceProfessionalId
            : { in: serviceOnProfessionalIds },
          AND: [
            input?.date
              ? {
                  startTime: {
                    gte: startOfDay(new Date(input.date)),
                    lte: endOfDay(new Date(input.date)),
                  },
                }
              : {},
            input?.startDate ? { startTime: { gte: input.startDate } } : {},
            input?.endDate ? { endTime: { lte: input.endDate } } : {},
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
        take: limit + 1,
        skip: input?.cursor ? undefined : input?.offset ?? 0,
        cursor: input?.cursor ? { id: input?.cursor } : undefined,
      });

      return { items, nextCursor: getCursor(items, limit) };
    }),
  myBookings: privateProcedure
    .input(
      z
        .object({
          date: z.string().datetime().optional(),
          startDate: z.string().datetime().optional(),
          endDate: z.string().datetime().optional(),
          limit: z.number().min(1).max(maxLimit).default(defaultLimit),
          offset: z.number().min(0).default(0),
          cursor: z.string().nullish(),
          expand: z.array(z.enum(['serviceProfessional'])).optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
          sortField: z.enum(['startTime']).optional(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      const { id } = ctx.user;
      const limit = input?.limit ?? defaultLimit;

      const items = await prisma.booking.findMany({
        where: {
          userId: id,
          AND: [
            input?.date
              ? {
                  startTime: {
                    gte: startOfDay(new Date(input.date)),
                    lte: endOfDay(new Date(input.date)),
                  },
                }
              : {},
            input?.startDate ? { startTime: { gte: input.startDate } } : {},
            input?.endDate ? { endTime: { lte: input.endDate } } : {},
          ],
        },
        select: {
          ...defaultBookingSelect,
          code: true,
          serviceProfessional: !!input?.expand?.includes(
            'serviceProfessional'
          ) && {
            select: defaultServiceOnProfessionalSelect,
          },
        },
        orderBy: input?.sortField && {
          [input.sortField]: input.sortDirection ?? 'asc',
        },
        take: limit + 1,
        skip: input?.cursor ? undefined : input?.offset ?? 0,
        cursor: input?.cursor ? { id: input?.cursor } : undefined,
      });

      return { items, nextCursor: getCursor(items, limit) };
    }),
});
