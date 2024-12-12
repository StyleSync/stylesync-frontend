import type { Context } from '@/server/context';
import { prisma } from '@/server/prisma';
import {
  defaultBookingSelect,
  defaultProfessionalSelect,
  defaultServiceOnProfessionalSelect,
} from '@/server/selectors';
import { TRPCError } from '@trpc/server';

export const getProfessionalFromContext = async (ctx: Context) => {
  const { id } = ctx.user;
  const professional = await prisma.professional.findUnique({
    where: { userId: id },
    select: defaultProfessionalSelect,
  });

  if (!professional) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `No professional for user with id '${id}'`,
    });
  }

  return professional;
};

export const getProfessionalFromServiceOnProfessional = async (
  serviceOnProfessionalId: string
) => {
  const serviceOnProfessional = await prisma.serviceOnProfessional.findUnique({
    where: { id: serviceOnProfessionalId },
    select: defaultServiceOnProfessionalSelect,
  });

  if (!serviceOnProfessional) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `No service on professional with id '${serviceOnProfessionalId}'`,
    });
  }

  return serviceOnProfessional.professional;
};

export const checkScheduleBreakChangePermission = async (
  ctx: Context,
  id: string
) => {
  const schedule = await prisma.schedule.findUnique({
    where: { id },
    select: {
      id: true,
      professionalId: true,
    },
  });

  if (!schedule) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `No schedule found with id '${id}'`,
    });
  }

  const professional = await getProfessionalFromContext(ctx);

  if (schedule.professionalId !== professional.id) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `You dont have permission to do this action`,
    });
  }
};

export const checkProfessionalAccessToBooking = async (
  ctx: Context,
  id: string
) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    select: {
      ...defaultBookingSelect,
      serviceProfessionalId: true,
      serviceProfessional: {
        select: {
          professionalId: true,
        },
      },
    },
  });

  if (!booking) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `No booking found with id '${id}'`,
    });
  }

  const professional = await getProfessionalFromContext(ctx);

  if (booking.serviceProfessional.professionalId !== professional.id) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `You dont have permission to delete booking with id '${id}'`,
    });
  }

  return professional;
};

export const getCursor = <T extends { id: string }>(
  items: T[],
  limit: number
) => {
  let nextCursor: string | undefined;

  if (items.length > limit) {
    const nextItem = items.pop();

    nextCursor = nextItem!.id;
  }

  return nextCursor;
};
