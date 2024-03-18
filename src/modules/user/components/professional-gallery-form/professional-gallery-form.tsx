import {
  type FC,
  // type ChangeEvent,
  // useCallback,
  useMemo,
  // useRef,
  // useState,
} from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components/button';
// import { Gallery } from '@/modules/core/components/gallery';
// import { Placeholder } from '@/modules/core/components/placeholder';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// types
// import type { GalleryImage } from '@/modules/core/components/gallery/gallery.interface';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';

import type { ProfessionalGalleryFormProps } from './professional-gallery-form.interface';
import styles from './professional-gallery-form.module.scss';
import { PhotoUploadModal } from '@/modules/settings/components/photo-upload-modal';

export const ProfessionalGalleryForm: FC<ProfessionalGalleryFormProps> = () => {
  // state
  // const [images, setImages] = useState<File[]>([]);
  const isFileUploading = useBoolean();
  const windowSizeType = useDeviceType();

  const isOpenUploadPhotoModal = useBoolean();
  // memo
  // @ts-ignore todo: map BE images that should contain width & height
  // const galleryImages = useMemo<GalleryImage[]>(() => {
  //   return images.map((image) => ({
  //     original: URL.createObjectURL(image),
  //     src: URL.createObjectURL(image),
  //   }));
  // }, [images]);
  // memo
  const buttonProps = useMemo<Partial<ButtonProps>>(() => {
    if (windowSizeType === 'mobile') {
      return {
        icon: 'plus',
        variant: 'primary',
      };
    }

    return {
      text: 'Add gallery image',
      variant: 'outlined',
      icon: 'image',
    };
  }, [windowSizeType]);

  return (
    <div className={styles.root}>
      <PhotoUploadModal
        onOpenChange={isOpenUploadPhotoModal.setValue}
        isOpen={isOpenUploadPhotoModal.value}
        trigger={
          <Button
            isLoading={isFileUploading.value}
            className={clsx('mobileActionBtn', styles.trigger)}
            {...buttonProps}
          />
        }
      />

      {/* <Placeholder
        // isActive={images.length === 0}
        placeholder={{
          illustration: 'files',
          description: 'No images added',
        }}
        fadeIn
      >
        <div className={styles.galleryWrapper}>
          <Gallery images={galleryImages} />
        </div>
      </Placeholder> */}
    </div>
  );
};
