import { type PortfolioExtendedProfessional } from '@/modules/settings/components/settings-gallery/settings-gallery.interface';

export type GalleryProps = {
  images: PortfolioExtendedProfessional[];
  maxRows?: number;
  rowImagesCount?: number;
};
