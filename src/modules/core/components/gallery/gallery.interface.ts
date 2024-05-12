import { type PortfolioExtendedProfessional } from '@/modules/settings/components/settings-gallery/settings-gallery.interface';

export type GalleryImage = {
  src: string;
  original: string;
  width: number;
  height: number;
  caption?: string;
};

export type GalleryProps = {
  images: PortfolioExtendedProfessional[];
  maxRows?: number;
  rowImagesCount?: number;
};
