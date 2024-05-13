import { Prisma } from '@prisma/client';
import { defaultPortfolioSelect } from '@/server/selectors/portfolio';

export const defaultAlbumSelect = Prisma.validator<Prisma.AlbumSelect>()({
  id: true,
  title: true,
  portfolios: { select: defaultPortfolioSelect },
  createdAt: true,
  updatedAt: true,
  professionalId: true,
});
