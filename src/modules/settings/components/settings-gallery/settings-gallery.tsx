import type { FC } from 'react';

// type
import type { SettingsGalleryProps } from './settings-gallery.interface';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';

// styles
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import styles from './settings-gallery.module.scss';
import { GalleyImage } from '../settings-gallery-image';

export const SettingsGallery: FC<SettingsGalleryProps> = ({
  images,
  rowImagesCount = 6,
}) => {
  const deviceType = useDeviceType();

  const gridTemplateColumns =
    deviceType === 'mobile'
      ? '1fr 1fr 1fr'
      : [...new Array(rowImagesCount)].map(() => '1fr').join(' ');

  return (
    <>
      <div className={styles.root} style={{ gridTemplateColumns }}>
        {images.map((image, i) => (
          <GalleyImage image={image} key={i} />
        ))}
      </div>
    </>
  );
};
