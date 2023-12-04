import { Prisma } from '@prisma/client';
import { defaultProfessionalSelect } from '@/server/selectors/professional';

export const defaultPortfolioSelect =
  Prisma.validator<Prisma.PortfolioSelect>()({
    id: true,
    title: true,
    description: true,
    link: true,
    professional: { select: defaultProfessionalSelect },
  });
