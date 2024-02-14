import { Prisma } from '@prisma/client';

export const defaultBookingSelect = Prisma.validator<Prisma.BookingSelect>()({
  id: true,
  startTime: true,
  endTime: true,
  date: true,
  guestFirstName: true,
  guestLastName: true,
  guestPhone: true,
  guestEmail: true,
  guestComment: true,
  status: true,
});
