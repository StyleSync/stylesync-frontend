import type { FC } from 'react';

// type
import type { SettingsGalleryProps } from './settings-gallery.interface';

// styles
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import styles from './settings-gallery.module.scss';
import { GalleyImage } from '../settings-gallery-image';

export const SettingsGallery: FC<SettingsGalleryProps> = ({
  images,
  rowImagesCount = 6,
}) => {
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
        {images.map((image, i) => (
          <GalleyImage image={image} key={i} />
        ))}
      </div>
    </>
  );
};
