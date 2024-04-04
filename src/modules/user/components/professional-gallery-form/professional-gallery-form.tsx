import { type FC, useMemo } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components/button';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// types
import type { ButtonProps } from '@/modules/core/components/button/button.interface';

import type { ProfessionalGalleryFormProps } from './professional-gallery-form.interface';
import styles from './professional-gallery-form.module.scss';
import { PhotoUploadModal } from '@/modules/settings/components/photo-upload-modal';

export const ProfessionalGalleryForm: FC<ProfessionalGalleryFormProps> = () => {
  // state
  const isFileUploading = useBoolean();
  const windowSizeType = useDeviceType();

  const isOpenUploadPhotoModal = useBoolean();

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
    </div>
  );
};
