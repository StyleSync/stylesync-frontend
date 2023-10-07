import {
  type FC,
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import { Button, Gallery, Placeholder } from '@/modules/core/components';
// hooks
import { useWindowSizeType } from '@/modules/core/hooks/use-window-size-type';
// types
import type { GalleryImage } from '@/modules/core/components/gallery/gallery.interface';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';

import type { ProfessionalGalleryFormProps } from './professional-gallery-form.interface';
import styles from './professional-gallery-form.module.scss';

export const ProfessionalGalleryForm: FC<ProfessionalGalleryFormProps> = () => {
  // state
  const [images, setImages] = useState<File[]>([]);
  const isFileUploading = useBoolean();
  const windowSizeType = useWindowSizeType();
  // memo
  // @ts-ignore todo: map BE images that should contain width & height
  const galleryImages = useMemo<GalleryImage[]>(() => {
    return images.map((image) => ({
      original: URL.createObjectURL(image),
      src: URL.createObjectURL(image),
    }));
  }, [images]);
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
  // refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {}, [images]);

  const handleImageSelectClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageSelected = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (!files || files.length === 0) {
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);

        if (!file) {
          return;
        }

        isFileUploading.setTrue();

        const QUERY_DELAY = 1000;

        await new Promise((res) => setTimeout(() => res(true), QUERY_DELAY));

        isFileUploading.setFalse();

        setImages((current) => [...current, file]);
      }
    },
    [isFileUploading]
  );

  return (
    <div className={styles.root}>
      <Button
        isLoading={isFileUploading.value}
        onClick={handleImageSelectClick}
        className={clsx('mobileActionBtn', styles.trigger)}
        {...buttonProps}
      />
      <input
        className='visibilityHidden'
        ref={fileInputRef}
        type='file'
        onChange={handleImageSelected}
        multiple
      />
      <Placeholder
        isActive={images.length === 0}
        placeholder={{
          illustration: 'files',
          description: 'No images added',
        }}
        fadeIn
      >
        <div className={styles.galleryWrapper}>
          <Gallery
            images={galleryImages}
            galleryProps={{
              rowHeight: 200,
              margin: 4,
            }}
          />
        </div>
      </Placeholder>
    </div>
  );
};
