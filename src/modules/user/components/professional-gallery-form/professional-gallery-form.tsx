import { type FC, useMemo } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components/button';
import { SettingsGallery } from '@/modules/settings/components/settings-gallery/settings-gallery';
import { Placeholder } from '@/modules/core/components/placeholder';
import { PhotoUploadModal } from '@/modules/settings/components/photo-upload-modal';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// types
// import type { GalleryImage } from '@/modules/core/components/gallery/gallery.interface';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';
import type { ProfessionalGalleryFormProps } from './professional-gallery-form.interface';
// style
import styles from './professional-gallery-form.module.scss';

export const ProfessionalGalleryForm: FC<ProfessionalGalleryFormProps> = () => {
  // state
  // const [images, setImages] = useState<File[]>([]);
  const isFileUploading = useBoolean();
  const windowSizeType = useDeviceType();
  const isOpenUploadPhotoModal = useBoolean();
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

  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  // query
  const { data: images } = trpc.portfolio.list.useQuery(
    {
      professionalId: me?.professional?.id,
    },
    {
      enabled: !!me?.professional?.id,
    }
  );

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

      <Placeholder
        isActive={images?.length === 0}
        placeholder={{
          illustration: 'files',
          description: 'No images added',
        }}
        fadeIn
      >
        <div className={styles.galleryWrapper}>
          {/* @ts-ignore */}
          <SettingsGallery images={images || []} />
        </div>
      </Placeholder>
    </div>
  );
};
