import { privateProcedure } from '@/server/trpc-helpers';
import { z } from 'zod';
import { Day } from '@prisma/client';
import { prisma } from '@/server/prisma';
import { TRPCError } from '@trpc/server';
import { checkProfessionalAccessToBooking } from '@/server/utils/prisma-utils';
import { defaultScheduleSelect } from '@/server/selectors/schedule';
import { addHours, isAfter } from 'date-fns';
import {
  isTimeWithinPeriods,
  isTimeWithinSchedule,
  mergeDates,
} from '@/server/utils/helpers';
import {
  defaultBookingSelect,
  defaultServiceOnProfessionalSelect,
} from '@/server/selectors';

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

    if (
      isAfter(new Date(), new Date(mergeDates(input.date, input.startTime)))
    ) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `You have selected a past date`,
      });
    }

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
        date: {
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

    const inputDate = mergeDates(input.date, input.startTime);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { day, bookingId, ...createData } = input;

    const booking = await prisma.booking.update({
      where: {
        id: input.bookingId,
      },
      data: {
        ...createData,
        date: inputDate,
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
