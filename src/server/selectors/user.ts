import { Prisma } from '@prisma/client';

export const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  avatar: true,
  firstName: true,
  lastName: true,
  phone: true,
  name: true,
  email: true,
  nickname: true,
  emailVerified: true,
  image: true,
  company: true,
  bookings: true,
  professional: true,
  onboardingCompleted: true,
  userType: true,
});

export const professionalUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  avatar: true,
  firstName: true,
  lastName: true,
  phone: true,
  email: true,
  name: true,
  image: true,
  nickname: true,
  userType: true,
});

export const publicUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  nickname: true,
  userType: true,
});
