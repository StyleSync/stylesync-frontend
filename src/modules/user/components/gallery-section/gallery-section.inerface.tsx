import type { Portfolio, Professional } from '@prisma/client';

export type PortfolioExtendedProfessional = Omit<
  Portfolio,
  'professionalId' | 'createdAt' | 'updatedAt'
> & {
  professional: Professional;
};

export type GalleryImage = {
  src: string;
  original: string;
  width: number;
  height: number;
  caption?: string;
};

export type GallerySectionProps = {};
