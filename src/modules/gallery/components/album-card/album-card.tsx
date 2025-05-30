import React, { type FC, useCallback, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { Button } from '@/modules/core/components/button';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import type { DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';
import { Gallery } from '@/modules/core/components/gallery';
import { Typography } from '@/modules/core/components/typogrpahy';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { AlbumAddModal } from '@/modules/settings/components/album-add-modal';

import type { AlbumCardProps } from './album-card.interface';

import styles from './album-card.module.scss';

const IMAGES_PREVIEW_LENGTH = 4;
const VIEW_IMAGES_THREE = 3;
const VIEW_IMAGES_FIVE = 5;

export const AlbumCard: FC<AlbumCardProps> = ({
  isActive,
  hidden,
  name,
  onClick,
  onCloseClick,
  album,
  onEditClick,
  isMoreButtonVisible,
}) => {
  const intl = useIntl();
  const rootRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const isAlbumModalOpen = useBoolean();
  const isOpenDropMenu = useBoolean();
  const deviceType = useDeviceType();
  const imagesCountPrev =
    deviceType === 'mobile' ? VIEW_IMAGES_THREE : VIEW_IMAGES_FIVE;

  // mutation
  const deleteAlbumMutation = trpc.album.delete.useMutation();

  const handleSelect = useCallback(
    ({ id }: DropdownItem) => {
      if (!album) {
        return;
      }

      if (id === 'delete') {
        isOpenDropMenu.setFalse();
        deleteAlbumMutation.mutate(
          {
            id: album.id,
          },
          {
            onError: () => {
              showToast({
                variant: 'error',
                title: intl.formatMessage({
                  id: 'album.card.toast.error.title',
                }),
                description: intl.formatMessage({
                  id: 'album.card.toast.error.description',
                }),
              });
            },
            onSuccess: () => {
              showToast({
                variant: 'success',
                title: intl.formatMessage({
                  id: 'album.card.toast.success.description',
                }),
                description: '',
              });

              queryClient.invalidateQueries({
                queryKey: getQueryKey(trpc.portfolio.list),
              });

              queryClient.invalidateQueries({
                queryKey: getQueryKey(trpc.album.list),
              });
            },
          }
        );
      }

      if (id === 'rename' && onEditClick) {
        isOpenDropMenu.setFalse();
        onEditClick(album);
      }
    },
    [deleteAlbumMutation, queryClient, album, onEditClick, isOpenDropMenu, intl]
  );

  return (
    <div
      className={clsx(styles.root, {
        [styles.root_hidden]: hidden,
        [styles.root_active]: isActive,
        [styles.root_loading]: deleteAlbumMutation.isLoading,
      })}
      ref={rootRef}
      onClick={!isActive ? onClick : undefined}
    >
      <div className={styles.info}>
        <div className={styles.header}>
          <Typography variant='body1'>{name}</Typography>
          {isMoreButtonVisible && (
            <DropdownMenu
              onSelect={handleSelect}
              isOpen={isOpenDropMenu.value}
              onClose={isOpenDropMenu.setFalse}
              trigger={
                <Button
                  aria-label='Album options'
                  aria-haspopup='true'
                  className='!h-6 !w-6'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    isOpenDropMenu.toggle();
                  }}
                  variant='unstyled'
                  icon='points'
                />
              }
              items={[
                {
                  id: 'rename',
                  variant: 'primary',
                  icon: 'pencil',
                  text: intl.formatMessage({ id: 'album.card.menu.rename' }),
                },
                {
                  id: 'delete',
                  variant: 'danger',
                  icon: 'trash',
                  text: intl.formatMessage({ id: 'album.card.menu.delete' }),
                },
              ]}
              popoverProps={{
                align: deviceType === 'mobile' ? 'end' : 'center',
                backgroundBlurEffect: false,
              }}
            />
          )}
        </div>
        <Typography
          className={styles.photoCount}
          variant='body2'
          weight='medium'
        >
          {album?.portfolios.length}{' '}
          {intl.formatMessage({ id: 'album.card.photoCount' })}
        </Typography>
      </div>
      {isActive && (
        <Button
          className={styles.closeButton}
          icon='close'
          variant='unstyled'
          onClick={onCloseClick}
          rippleColor='#fafbfc'
        />
      )}
      <div
        className={clsx(styles.images, { [styles.images_active]: isActive })}
      >
        {isActive && !!album?.portfolios ? (
          <Gallery images={album.portfolios} rowImagesCount={imagesCountPrev} />
        ) : (
          album?.portfolios
            .slice(0, IMAGES_PREVIEW_LENGTH)
            .map((image, index) => (
              <div key={image.id} className={styles.imageWrapper}>
                <Image
                  className={styles.image}
                  src={image.link}
                  alt='image'
                  height={250}
                  width={250}
                />
                {index === VIEW_IMAGES_THREE && (
                  <div className={styles.meta}>
                    <Typography variant='subtitle'>
                      +{album?.portfolios.length - VIEW_IMAGES_THREE}
                    </Typography>
                  </div>
                )}
              </div>
            ))
        )}
      </div>
      <AlbumAddModal
        isOpen={isAlbumModalOpen.value}
        onOpenChange={isAlbumModalOpen.setValue}
      />
    </div>
  );
};
