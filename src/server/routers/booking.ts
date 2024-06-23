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
  getProfessionalFromContext,
  getProfessionalFromServiceOnProfessional,
} from '@/server/utils/prisma-utils';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import {
  getPossibleBookingTimes,
  isTimeWithinPeriods,
  isTimeWithinSchedule,
  mergeDates,
} from '@/server/utils/helpers';
import type { AvailableBookingTime } from '@/server/types';
import { BookingStatus, Day } from '@prisma/client';
import { addHours, endOfDay, isAfter, startOfDay } from 'date-fns';

const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

export const bookingRouter = router({
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
    list: publicProcedure
      .input(
        z.object({
          serviceOnProfessionalId: z.string().min(1, 'Required'),
          date: z.string().datetime(),
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
      .query(async ({ input }) => {
        const availableTimeList: AvailableBookingTime[] = [];
        const serviceOnProfessional =
          await prisma.serviceOnProfessional.findUnique({
            where: { id: input.serviceOnProfessionalId },
            select: {
              id: true,
              duration: true,
            },
          });

        if (!serviceOnProfessional) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No service on professional found with id '${input.serviceOnProfessionalId}'`,
          });
        }

        const professional = await getProfessionalFromServiceOnProfessional(
          serviceOnProfessional.id
        );

        // first we check if we have specific schedule for the day
        // temporary commented out as we don't have specific day schedule yet
        // const specificDaySchedule = await prisma.schedule.findFirst({
        //   where: {
        //     professionalId: professional.id,
        //     isSpecificDay: true,
        //     day: input.day,
        //   },
        //   select: defaultScheduleSelect,
        // });

        const defaultDaySchedule = await prisma.schedule.findFirst({
          where: {
            professionalId: professional.id,
            isSpecificDay: false,
            day: input.day,
          },
          select: defaultScheduleSelect,
        });

        // commented out until we return specific day schedule
        // const currentDaySchedule = specificDaySchedule ?? defaultDaySchedule;
        const currentDaySchedule = defaultDaySchedule;

        if (!currentDaySchedule) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `No schedule found for this day`,
          });
        }

        const allServiceOnProfessional =
          await prisma.serviceOnProfessional.findMany({
            where: {
              professionalId: professional.id,
            },
            select: {
              id: true,
            },
          });

        const bookings = await prisma.booking.findMany({
          where: {
            serviceProfessionalId: {
              in: allServiceOnProfessional.map((s) => s.id),
            },
            date: {
              gte: new Date(input.date),
              lte: addHours(new Date(input.date), 24),
            },
          },
          select: {
            startTime: true,
            endTime: true,
          },
        });

        const possibleBookingTime = getPossibleBookingTimes(
          currentDaySchedule,
          serviceOnProfessional.duration,
          input.date
        );

        for (const time of possibleBookingTime) {
          if (
            !isTimeWithinPeriods(
              time.startTime,
              time.endTime,
              availableTimeList
            ) &&
            isTimeWithinSchedule(
              time.startTime,
              time.endTime,
              currentDaySchedule
            ) &&
            !isTimeWithinPeriods(time.startTime, time.endTime, bookings)
          ) {
            availableTimeList.push(time);
          }
        }

        return availableTimeList;
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
        guestLastName: z
          .string()
          .min(1, 'Required')
          .max(maxLargeTextLength)
          .optional(),
        guestPhone: z.string().min(1, 'Required').max(maxLargeTextLength),
        guestEmail: z
          .string()
          .min(1, 'Required')
          .max(maxLargeTextLength)
          .optional(),
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
      const booking = await prisma.booking.findUnique({
        where: { id: input.id },
        select: { ...defaultBookingSelect, serviceProfessionalId: true },
      });

      if (!booking) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No booking found with id '${input.id}'`,
        });
      }

      const professional = await getProfessionalFromContext(ctx);

      const bookingProfessional =
        await getProfessionalFromServiceOnProfessional(
          booking.serviceProfessionalId
        );

      if (bookingProfessional.id !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You dont have permission to delete booking with id '${input.id}'`,
        });
      }

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
          serviceProfessionalId:
            serviceOnProfessionalIds.length > 0
              ? { in: serviceOnProfessionalIds }
              : input?.serviceProfessionalId,
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
