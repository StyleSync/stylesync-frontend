import { type FC, useCallback, useMemo, useState } from 'react';

import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import { Typography } from '@/modules/core/components/typogrpahy';

import type { GalleryProps } from './gallery.interface';

import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import './gallery.global.scss';
import styles from './gallery.module.scss';

export const Gallery: FC<GalleryProps> = ({
  images,
  maxRows,
  rowImagesCount = 4,
}) => {
  const [index, setIndex] = useState<number>(-1);
  // memo
  const slides = useMemo(
    () =>
      images?.map(({ link, description, title }) => ({
        src: link,
        origin: link,
        description,
        title,
      })),
    [images]
  );

  const imagesToDisplay = useMemo(() => {
    if (!maxRows) {
      return images;
    }

    return images.slice(0, maxRows * rowImagesCount);
  }, [images, maxRows, rowImagesCount]);

  const handleImageClick = useCallback(
    (i: number) => () => {
      setIndex(i);
    },
    []
  );

  return (
    <>
      <div
        className={styles.root}
        style={{
          gridTemplateColumns: [...new Array(rowImagesCount)]
            .map(() => '1fr')
            .join(' '),
        }}
      >
        {imagesToDisplay?.map((image, i) => (
          <div
            className={styles.item}
            key={i}
            tabIndex={0}
            onClick={handleImageClick(i)}
          >
            <div className={styles.container}>
              <Image
                className={styles.image}
                src={image.link}
                alt={image.title}
                width={150}
                height={150}
              />
              <Typography className={styles.title}>{image.title}</Typography>
            </div>
          </div>
        ))}
      </div>
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails, Captions]}
        thumbnails={{
          borderRadius: 12,
          imageFit: 'cover',
        }}
      />
    </>
  );
};
