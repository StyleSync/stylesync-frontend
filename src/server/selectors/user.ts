import { Prisma } from '@prisma/client';

export const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  avatar: true,
  firstName: true,
  lastName: true,
  phone: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  company: true,
  bookings: true,
  professional: true,
  onboardingCompleted: true,
  userType: true,
});

export const publicUserSelect = Prisma.validator<Prisma.UserSelect>()({
  avatar: true,
  firstName: true,
  lastName: true,
  phone: true,
  name: true,
  email: true,
});
