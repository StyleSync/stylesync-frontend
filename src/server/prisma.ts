/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const initialPrisma: PrismaClient =
  prismaGlobal.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

export const prisma = initialPrisma.$extends(
  createSoftDeleteExtension({
    models: {
      Booking: true,
      ServiceOnProfessional: true,
      Service: true,
    },
    defaultConfig: {
      field: 'deletedAt',
      createValue: (deleted) => {
        if (deleted) return new Date();

        return null;
      },
    },
  })
);

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  prismaGlobal.prisma = prisma;
}
