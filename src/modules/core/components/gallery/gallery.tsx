'use client';

import { type FC, useCallback, useMemo, useState } from 'react';
import { Gallery as ReactGridGallery } from 'react-grid-gallery';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import type { GalleryProps } from './gallery.interface';
import './gallery.global.scss';

export const Gallery: FC<GalleryProps> = ({ images, galleryProps }) => {
  const [index, setIndex] = useState<number>(-1);
  // memo
  const slides = useMemo(
    () =>
      images.map(({ original }) => ({
        src: original,
      })),
    [images]
  );

  const handleImageClick = useCallback((i: number) => {
    setIndex(i);
  }, []);

  return (
    <>
      <ReactGridGallery
        images={images}
        onClick={handleImageClick}
        enableImageSelection={false}
        {...galleryProps}
      />
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails]}
        thumbnails={{
          borderRadius: 12,
          imageFit: 'cover',
        }}
      />
    </>
  );
};
