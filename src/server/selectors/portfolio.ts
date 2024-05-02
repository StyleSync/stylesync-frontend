import { Prisma } from '@prisma/client';

export const defaultPortfolioSelect =
  Prisma.validator<Prisma.PortfolioSelect>()({
    id: true,
    title: true,
    description: true,
    link: true,
    createdAt: true,
    updatedAt: true,
    albumId: true,
  });
