import { type FC, useMemo } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useBoolean } from 'usehooks-ts';
// containers
import { PhotoUploadModal } from '@/modules/gallery/containers/photo-upload-modal/photo-upload-modal';
// components
import { Button } from '@/modules/core/components/button';
import { Spinner } from '@/modules/core/components/spinner';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
import { SettingsGallery } from '@/modules/settings/components/settings-gallery';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
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

  const { data: imagesListQuery, ...imagesData } =
    trpc.portfolio.list.useInfiniteQuery(
      {
        albumId: activeAlbumId,
      },
      {
        enabled: !!activeAlbumId,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const imagesList =
    imagesListQuery?.pages.map((pages) => pages.items).flat() || [];

  return (
    <div className={styles.root}>
      <Button
        text={album?.title}
        icon='chevron-left'
        variant='unstyled'
        onClick={onClickClose}
        className='!px-0 !py-0'
      />
      <Placeholder
        className='h-[calc(100%-40px)]'
        isActive={imagesListQuery?.pages.length === 0}
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
                text={intl.formatMessage({ id: 'album.details.addImage' })}
                variant='outlined'
              />
            }
          />
          <div className='mt-5 md:mt-8'>
            <SettingsGallery images={imagesList || []} />
            <InfinityListController
              hasNextPage={imagesData.hasNextPage || false}
              onLoadMore={imagesData.fetchNextPage}
              isNextPageLoading={imagesData.isFetchingNextPage}
            />
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
