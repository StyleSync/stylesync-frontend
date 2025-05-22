import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { Icon } from '@/modules/core/components/icon';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { PhotoUploadModal } from '@/modules/gallery/containers/photo-upload-modal';

import type { GalleryImageProps } from './gallery-image.interface';

import styles from './gallery-image.module.scss';

export const GalleyImage: FC<GalleryImageProps> = ({ image }) => {
  const intl = useIntl();
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
            title: intl.formatMessage({
              id: 'galleryImage.toast.error.title',
            }),
            description: intl.formatMessage({
              id: 'galleryImage.toast.error.description',
            }),
          });
        },
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: intl.formatMessage({
              id: 'galleryImage.toast.success.description.delete',
            }),
            description: '',
          });

          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.portfolio.list),
          });
        },
      }
    );
  };

  return (
    <>
      <div
        className={clsx(styles.item, {
          [styles.item_loading]: deletePhotoMutation.isPending,
        })}
        tabIndex={0}
      >
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
