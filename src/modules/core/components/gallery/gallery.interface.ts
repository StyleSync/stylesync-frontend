import type { GalleryProps as ReactGridGalleryProps } from 'react-grid-gallery';

export type GalleryImage = {
  src: string;
  original: string;
  width: number;
  height: number;
  caption?: string;
};

export type GalleryProps = {
  images: GalleryImage[];
  maxRows?: number;
  rowImagesCount?: number;
};
