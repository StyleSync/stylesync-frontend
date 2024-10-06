import { publicProcedure } from '@/server/trpc-helpers';
import { z } from 'zod';
import { Day } from '@prisma/client';
import type { AvailableBookingTime } from '@/server/types';
import { prisma } from '@/server/prisma';
import { TRPCError } from '@trpc/server';
import { getProfessionalFromServiceOnProfessional } from '@/server/utils/prisma-utils';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import { addHours } from 'date-fns';
import {
  getPossibleBookingTimes,
  isTimeWithinPeriods,
  isTimeWithinSchedule,
} from '@/server/utils/helpers';

export const availableList = publicProcedure
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
    const serviceOnProfessional = await prisma.serviceOnProfessional.findUnique(
      {
        where: { id: input.serviceOnProfessionalId },
        select: {
          id: true,
          duration: true,
        },
      }
    );

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
