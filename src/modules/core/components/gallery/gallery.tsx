import { type FC, useCallback, useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import type { GalleryProps } from './gallery.interface';
import styles from './gallery.module.scss';
import './gallery.global.scss';

export const Gallery: FC<GalleryProps> = ({
  images,
  maxRows,
  rowImagesCount = 4,
}) => {
  const [index, setIndex] = useState<number>(-1);
  // memo
  const slides = useMemo(
    () =>
      images.map(({ original }) => ({
        src: original,
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
        {imagesToDisplay.map((image, i) => (
          <div
            className={styles.item}
            key={i}
            tabIndex={0}
            onClick={handleImageClick(i)}
          >
            <img className={styles.image} src={image.src} alt='gallery image' />
          </div>
        ))}
      </div>
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
