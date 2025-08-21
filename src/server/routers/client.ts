import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/server/prisma';
import { defaultProfessionalClientSelect } from '@/server/selectors';
import { privateProcedure, router } from '@/server/trpc-helpers';
import {
  getCursor,
  getProfessionalFromContext,
} from '@/server/utils/prisma-utils';

const maxLargeTextLength = 140;
const defaultLimit = 10;
const maxLimit = 100;

export const clientRouter = router({
  get: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .query(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      const client = await prisma.professionalClient.findUnique({
        where: { id: input.id },
        select: defaultProfessionalClientSelect,
      });

      if (!client) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No client found with id '${input.id}'`,
        });
      }

      // Check if the client belongs to the professional
      if (client.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You don't have permission to access this client`,
        });
      }

      // Get booking statistics for the client
      const bookingStats = await prisma.booking.aggregate({
        where: {
          clientId: input.id,
          serviceProfessional: {
            professionalId: professional.id,
          },
        },
        _count: {
          id: true,
        },
      });

      // Get cancelled booking count
      const cancelledBookingsCount = await prisma.booking.count({
        where: {
          clientId: input.id,
          status: 'CANCELED',
          serviceProfessional: {
            professionalId: professional.id,
          },
        },
      });

      // Get total revenue from completed bookings
      const completedBookings = await prisma.booking.findMany({
        where: {
          clientId: input.id,
          status: 'FINISHED',
          serviceProfessional: {
            professionalId: professional.id,
          },
        },
        select: {
          serviceProfessional: {
            select: {
              price: true,
            },
          },
        },
      });

      const totalRevenue = completedBookings.reduce(
        (sum, booking) => sum + booking.serviceProfessional.price,
        0
      );

      return {
        ...client,
        bookingStats: {
          totalBookings: bookingStats._count.id,
          cancelledBookings: cancelledBookingsCount,
          totalRevenue,
        },
      };
    }),
  create: privateProcedure
    .input(
      z.object({
        firstName: z.string().max(maxLargeTextLength).optional(),
        lastName: z.string().max(maxLargeTextLength).optional(),
        phone: z.string().max(maxLargeTextLength).optional(),
        name: z.string().max(maxLargeTextLength).optional(),
        email: z.string().email().or(z.literal('')).optional(),
        image: z.string().max(maxLargeTextLength).optional(),
        notes: z.string().max(maxLargeTextLength).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      const client = await prisma.professionalClient.create({
        data: { ...input, professionalId: professional.id },
        select: defaultProfessionalClientSelect,
      });

      if (!client) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `There was error creating client`,
        });
      }

      return client;
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
        firstName: z.string().max(maxLargeTextLength).optional(),
        lastName: z.string().max(maxLargeTextLength).optional(),
        phone: z.string().max(maxLargeTextLength).optional(),
        name: z.string().max(maxLargeTextLength).optional(),
        email: z.string().email().or(z.literal('')).optional(),
        image: z.string().max(maxLargeTextLength).optional(),
        notes: z.string().max(maxLargeTextLength).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      const client = await prisma.professionalClient.findUnique({
        where: { id: input.id },
        select: defaultProfessionalClientSelect,
      });

      if (!client) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No client found with id '${input.id}'`,
        });
      }

      // Check if the client belongs to the professional
      if (client.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You don't have permission to update this client`,
        });
      }

      return prisma.professionalClient.update({
        where: { id: input.id },
        data: { ...input },
        select: defaultProfessionalClientSelect,
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      const client = await prisma.professionalClient.findUnique({
        where: { id: input.id },
        select: defaultProfessionalClientSelect,
      });

      if (!client) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No client found with id '${input.id}'`,
        });
      }

      // Check if the client belongs to the professional
      if (client.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You don't have permission to delete this client`,
        });
      }

      return prisma.professionalClient.delete({
        where: { id: input.id },
      });
    }),
  list: privateProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(maxLimit).default(defaultLimit),
          offset: z.number().min(0).default(0),
          cursor: z.string().nullish(),
          search: z.string().optional(),
          sortFields: z
            .array(
              z.object({
                field: z.enum([
                  'createdAt',
                  'updatedAt',
                  'firstName',
                  'lastName',
                  'name',
                  'phone',
                  'email',
                ]),
                order: z.enum(['asc', 'desc']),
              })
            )
            .default([{ field: 'createdAt', order: 'desc' }]),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);
      const limit = input?.limit ?? defaultLimit;

      const items = await prisma.professionalClient.findMany({
        where: {
          professionalId: professional.id,
          ...(input?.search && {
            OR: [
              { firstName: { contains: input.search, mode: 'insensitive' } },
              { lastName: { contains: input.search, mode: 'insensitive' } },
              { name: { contains: input.search, mode: 'insensitive' } },
              { phone: { contains: input.search, mode: 'insensitive' } },
              { email: { contains: input.search, mode: 'insensitive' } },
            ],
          }),
        },
        select: defaultProfessionalClientSelect,
        take: limit + 1,
        skip: input?.cursor ? undefined : input?.offset ?? 0,
        cursor: input?.cursor ? { id: input?.cursor } : undefined,
        orderBy: input?.sortFields.map((sortField) => ({
          [sortField.field]: sortField.order,
        })),
      });

      return { items, nextCursor: getCursor(items, limit) };
    }),
  connectToBooking: privateProcedure
    .input(
      z.object({
        clientId: z.string().min(1, 'Required'),
        bookingId: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      // Check if the client belongs to the professional
      const client = await prisma.professionalClient.findUnique({
        where: { id: input.clientId },
        select: defaultProfessionalClientSelect,
      });

      if (!client) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No client found with id '${input.clientId}'`,
        });
      }

      if (client.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You don't have permission to use this client`,
        });
      }

      // Check if the booking belongs to the professional
      const booking = await prisma.booking.findUnique({
        where: { id: input.bookingId },
        select: {
          id: true,
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
          message: `No booking found with id '${input.bookingId}'`,
        });
      }

      if (booking.serviceProfessional.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You don't have permission to modify this booking`,
        });
      }

      return prisma.booking.update({
        where: { id: input.bookingId },
        data: { clientId: input.clientId },
        select: {
          id: true,
          clientId: true,
          client: {
            select: defaultProfessionalClientSelect,
          },
        },
      });
    }),
  disconnectFromBooking: privateProcedure
    .input(
      z.object({
        bookingId: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      // Check if the booking belongs to the professional
      const booking = await prisma.booking.findUnique({
        where: { id: input.bookingId },
        select: {
          id: true,
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
          message: `No booking found with id '${input.bookingId}'`,
        });
      }

      if (booking.serviceProfessional.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You don't have permission to modify this booking`,
        });
      }

      return prisma.booking.update({
        where: { id: input.bookingId },
        data: { clientId: null },
        select: {
          id: true,
          clientId: true,
        },
      });
    }),
  connectBookingsByPhone: privateProcedure
    .input(
      z.object({
        clientId: z.string().min(1, 'Required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const professional = await getProfessionalFromContext(ctx);

      // Check if the client belongs to the professional
      const client = await prisma.professionalClient.findUnique({
        where: { id: input.clientId },
        select: {
          ...defaultProfessionalClientSelect,
          phone: true,
        },
      });

      if (!client) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No client found with id '${input.clientId}'`,
        });
      }

      if (client.professionalId !== professional.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `You don't have permission to use this client`,
        });
      }

      if (!client.phone) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Client does not have a phone number to match bookings`,
        });
      }

      // Get all service IDs for the professional
      const serviceIds = await prisma.serviceOnProfessional.findMany({
        where: { professionalId: professional.id },
        select: { id: true },
      });

      const serviceIdsArray = serviceIds.map((service) => service.id);

      // Find all bookings that match the client's phone number and belong to the professional
      const matchingBookings = await prisma.booking.findMany({
        where: {
          serviceProfessionalId: { in: serviceIdsArray },
          guestPhone: client.phone,
          clientId: null, // Only connect bookings that don't already have a client
        },
        select: {
          id: true,
          guestPhone: true,
          guestFirstName: true,
          guestLastName: true,
        },
      });

      if (matchingBookings.length === 0) {
        return {
          message: 'No bookings found with matching phone number',
          connectedCount: 0,
        };
      }

      // Update all matching bookings to connect them to the client
      const updateResult = await prisma.booking.updateMany({
        where: {
          id: { in: matchingBookings.map((booking) => booking.id) },
        },
        data: { clientId: input.clientId },
      });

      return {
        message: `Successfully connected ${updateResult.count} bookings to client`,
        connectedCount: updateResult.count,
      };
    }),
});
