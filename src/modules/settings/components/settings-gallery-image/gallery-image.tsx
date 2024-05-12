import type { FC } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

// components
import { Icon } from '@/modules/core/components/icon';
import { PhotoUploadModal } from '@/modules/gallery/containers/photo-upload-modal';
// utils
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
// hooks
import { useBoolean } from 'usehooks-ts';
// type
import type { GalleryImageProps } from './gallery-image.interface';
// style
import styles from './gallery-image.module.scss';

export const GalleyImage: FC<GalleryImageProps> = ({ image }) => {
  const isOpen = useBoolean();
  // mutation
  const deletePhotoMutation = trpc.portfolio.delete.useMutation();

  const queryClient = useQueryClient();

  const handleDeletePhoto = () => {
    deletePhotoMutation.mutate(
      {
        id: image.id,
      },
      {
        onError: () => {
          showToast({
            variant: 'error',
            title: 'Oops, error',
            description: 'Oops',
          });
        },
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: 'Good!',
            description: 'Photo deleted',
          });

          queryClient.invalidateQueries({
            queryKey: trpc.portfolio.list.getQueryKey(),
          });
        },
      }
    );
  };

  return (
    <>
      <div className={styles.item} tabIndex={0}>
        <Image
          className={styles.image}
          src={image.link}
          alt='gallery image'
          width={150}
          height={150}
        />
        <div className={styles.actionContainer}>
          <button className={styles.actionButton} onClick={handleDeletePhoto}>
            <Icon name='close' />
          </button>

          <button className={styles.actionButton} onClick={isOpen.setTrue}>
            <Icon name='pencil' />
          </button>
        </div>
      </div>
      <PhotoUploadModal
        portfolioId={image.id}
        onOpenChange={isOpen.setValue}
        isOpen={isOpen.value}
      />
    </>
  );
};
