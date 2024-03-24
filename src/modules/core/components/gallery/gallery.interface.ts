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
