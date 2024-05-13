import { type Portfolio } from '@prisma/client';

export type GalleryImage = {
  src: string;
  original: string;
  width: number;
  height: number;
  caption?: string;
};

export type GalleryProps = {
  images: Portfolio[];
  maxRows?: number;
  rowImagesCount?: number;
};
