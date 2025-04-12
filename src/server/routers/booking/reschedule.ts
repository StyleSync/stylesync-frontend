import { Day } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { addHours, isAfter } from 'date-fns';
import { z } from 'zod';

import { prisma } from '@/server/prisma';
import {
  defaultBookingSelect,
  defaultServiceOnProfessionalSelect,
} from '@/server/selectors';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import { privateProcedure } from '@/server/trpc-helpers';
import {
  isTimeWithinPeriods,
  isTimeWithinSchedule,
} from '@/server/utils/helpers';
import { checkProfessionalAccessToBooking } from '@/server/utils/prisma-utils';

export const rescheduleBooking = privateProcedure
  .input(
    z.object({
      bookingId: z.string().min(1, 'Required'),
      startTime: z.string().datetime(),
      endTime: z.string().datetime(),
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
      yearTime: z.number().optional(),
      monthTime: z.number().optional(),
      dayTime: z.number().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const professional = await checkProfessionalAccessToBooking(
      ctx,
      input.bookingId
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

    const specificDaySchedule = await prisma.schedule.findFirst({
      where: {
        professionalId: professional.id,
        isSpecificDay: true,
        day: input.day,
        specificDay: input.dayTime ?? -1,
        specificMonth: input.monthTime ?? -1,
        specificYear: input.yearTime ?? -1,
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

    const selectedDaySchedule = specificDaySchedule ?? defaultDaySchedule;

    if (
      selectedDaySchedule &&
      !isTimeWithinSchedule(input.startTime, input.endTime, selectedDaySchedule)
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
        NOT: {
          id: {
            equals: input.bookingId,
          },
        },
        serviceProfessionalId: { in: servicesIds },
        startTime: {
          gte: new Date(input.date),
          lte: addHours(new Date(input.date), 24),
        },
      },
    });

    if (isTimeWithinPeriods(input.startTime, input.endTime, existingBooking)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `There is another booking at this time`,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { day, bookingId, date, ...createData } = input;

    const booking = await prisma.booking.update({
      where: {
        id: input.bookingId,
      },
      data: {
        ...createData,
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
  });
