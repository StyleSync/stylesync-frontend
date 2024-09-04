import { type FC, useMemo } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useBoolean } from 'usehooks-ts';
// containets
import { PhotoUploadModal } from '@/modules/gallery/containers/photo-upload-modal/photo-upload-modal';
// components
import { Button } from '@/modules/core/components/button';
import { Spinner } from '@/modules/core/components/spinner';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
import { SettingsGallery } from '@/modules/settings/components/settings-gallery';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import { type ButtonProps } from '@/modules/core/components/button/button.interface';
import { type AlbumDetailsProps } from './album-details.interface';
// style
import styles from './album-details.module.scss';

export const AlbumDetails: FC<AlbumDetailsProps> = ({
  onClickClose,
  activeAlbumId,
}) => {
  const intl = useIntl();
  const isOpenUploadPhotoModal = useBoolean();
  const windowSizeType = useDeviceType();
  const isFileUploding = useBoolean();

  // memo
  const buttonProps = useMemo<Partial<ButtonProps>>(() => {
    if (windowSizeType === 'mobile') {
      return {
        icon: 'plus',
        variant: 'primary',
      };
    }

    return {
      text: intl.formatMessage({ id: 'album.details.addImage' }),
      variant: 'outlined',
    };
  }, [windowSizeType, intl]);

  const { data: album } = trpc.album.get.useQuery({
    id: activeAlbumId,
  });

  const { data: imagesList, ...imagesData } = trpc.portfolio.list.useQuery(
    {
      albumId: activeAlbumId,
    },
    { enabled: !!activeAlbumId }
  );

  return (
    <div className={styles.root}>
      <Button
        text={album?.title}
        icon='chevron-left'
        variant='unstyled'
        onClick={onClickClose}
        className={styles.btnBack}
      />

      <Placeholder
        className='h-full'
        isActive={imagesList?.length === 0}
        placeholder={{
          illustration: 'files',
          description: intl.formatMessage({ id: 'album.details.noImages' }),
          action: (
            <PhotoUploadModal
              albumId={activeAlbumId}
              isOpen={isOpenUploadPhotoModal.value}
              onOpenChange={isOpenUploadPhotoModal.setValue}
              trigger={
                <Button
                  isLoading={isFileUploding.value}
                  className={clsx('mobileActionBtn', styles.trigger)}
                  {...buttonProps}
                />
              }
            />
          ),
        }}
        fadeIn
      >
        <div className={styles.content}>
          <PhotoUploadModal
            albumId={activeAlbumId}
            isOpen={isOpenUploadPhotoModal.value}
            onOpenChange={isOpenUploadPhotoModal.setValue}
            trigger={
              <Button
                disabled={imagesData.isLoading}
                isLoading={isFileUploding.value}
                className={clsx('mobileActionBtn', styles.trigger)}
                {...buttonProps}
              />
            }
          />

          <div className='mt-8'>
            <SettingsGallery images={imagesList || []} />
          </div>
          {imagesData.isLoading && (
            <div className={styles.spinnerContainer}>
              <Spinner size='medium' />
              <Typography className={styles.loadingLabel}>
                {intl.formatMessage({ id: 'album.details.dowlandImage' })}
              </Typography>
            </div>
          )}
        </div>
      </Placeholder>
    </div>
  );
};
