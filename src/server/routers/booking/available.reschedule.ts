import { Day } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { addHours } from 'date-fns';
import { z } from 'zod';

import { prisma } from '@/server/prisma';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import { privateProcedure } from '@/server/trpc-helpers';
import type { AvailableBookingTime } from '@/server/types';
import {
  getPossibleBookingTimes,
  isTimeWithinPeriods,
  isTimeWithinSchedule,
} from '@/server/utils/helpers';
import { getProfessionalFromContext } from '@/server/utils/prisma-utils';

export const availableReschedule = privateProcedure
  .input(
    z.object({
      bookingId: z.string().min(1, 'Required'),
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
      yearTime: z.number(),
      monthTime: z.number(),
      dayTime: z.number(),
    })
  )
  .query(async ({ input, ctx }) => {
    const availableTimeList: AvailableBookingTime[] = [];
    const professional = await getProfessionalFromContext(ctx);

    if (!professional) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Professional not found`,
      });
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: input.bookingId,
      },
      select: {
        serviceProfessionalId: true,
        serviceProfessional: {
          select: {
            duration: true,
            professionalId: true,
          },
        },
      },
    });

    if (!booking) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Booking not found`,
      });
    }

    if (professional.id !== booking.serviceProfessional.professionalId) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `You dont have permission to do this action`,
      });
    }

    // first we check if we have specific schedule for the day
    const specificDaySchedule = await prisma.schedule.findFirst({
      where: {
        professionalId: professional.id,
        isSpecificDay: true,
        day: input.day,
        specificDay: input.dayTime,
        specificMonth: input.monthTime,
        specificYear: input.yearTime,
      },
      select: defaultScheduleSelect,
    });

    const defaultDaySchedule = await prisma.schedule.findFirst({
      where: {
        professionalId: professional.id,
        isSpecificDay: false,
        day: input.day,
      },
      select: defaultScheduleSelect,
    });

    const currentDaySchedule = specificDaySchedule ?? defaultDaySchedule;

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
        NOT: {
          id: {
            equals: input.bookingId,
          },
        },
        serviceProfessionalId: {
          in: allServiceOnProfessional.map((s) => s.id),
        },
        startTime: {
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
      booking.serviceProfessional.duration,
      input.yearTime,
      input.monthTime,
      input.dayTime
    );

    for (const time of possibleBookingTime) {
      if (
        // !isTimeWithinPeriods(time.startTime, time.endTime, availableTimeList) &&
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
  });
