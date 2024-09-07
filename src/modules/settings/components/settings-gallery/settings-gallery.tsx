import type { FC } from 'react';
// type
import type { SettingsGalleryProps } from './settings-gallery.interface';
// styles
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import styles from './settings-gallery.module.scss';
import { GalleyImage } from '../settings-gallery-image';

export const SettingsGallery: FC<SettingsGalleryProps> = ({ images }) => {
  return (
    <>
      <div className={styles.root}>
        {images.map((image, i) => (
          <GalleyImage image={image} key={i} />
        ))}
      </div>
    </>
  );
};
