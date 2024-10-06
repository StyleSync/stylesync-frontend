import { privateProcedure } from '@/server/trpc-helpers';
import { z } from 'zod';
import { Day } from '@prisma/client';
import type { AvailableBookingTime } from '@/server/types';
import { prisma } from '@/server/prisma';
import { TRPCError } from '@trpc/server';
import { getProfessionalFromContext } from '@/server/utils/prisma-utils';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import { addHours } from 'date-fns';
import {
  getPossibleBookingTimes,
  isTimeWithinPeriods,
  isTimeWithinSchedule,
} from '@/server/utils/helpers';

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

    const currentDaySchedule = await prisma.schedule.findFirst({
      where: {
        professionalId: professional.id,
        isSpecificDay: false,
        day: input.day,
      },
      select: defaultScheduleSelect,
    });

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
      booking.serviceProfessional.duration,
      input.date
    );

    for (const time of possibleBookingTime) {
      if (
        !isTimeWithinPeriods(time.startTime, time.endTime, availableTimeList) &&
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
