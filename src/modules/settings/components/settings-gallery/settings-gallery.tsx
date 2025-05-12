import type { FC } from 'react';

import { GalleyImage } from '@/modules/settings/components/settings-gallery-image';

import type { SettingsGalleryProps } from './settings-gallery.interface';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import styles from './settings-gallery.module.scss';

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
