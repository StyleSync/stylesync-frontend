import { type FC, useState } from 'react';
import { useIntl } from 'react-intl';

// components
import { Button } from '@/modules/core/components/button';
import { Placeholder } from '@/modules/core/components/placeholder';
import { AlbumAddModal } from '@/modules/settings/components/album-add-modal';
import { AlbumCard } from '@/modules/gallery/components/album-card';
import { AlbumDetails } from '@/modules/gallery/components/album-details';
import { Spinner } from '@/modules/core/components/spinner';
import { Typography } from '@/modules/core/components/typogrpahy';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
// hooks
import { useBoolean } from 'usehooks-ts';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// types
import type { ProfessionalGalleryFormProps } from './professional-gallery-form.interface';
import type { Album } from '@prisma/client';

// style
import styles from './professional-gallery-form.module.scss';

export const ProfessionalGalleryForm: FC<ProfessionalGalleryFormProps> = () => {
  const intl = useIntl();
  const isModalOpen = useBoolean();
  // state
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [albumToEdit, setAlbunToEdit] = useState<Album | null>(null);
  // queries
  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  const { data: albumsListQuery, ...albumData } =
    trpc.album.list.useInfiniteQuery(
      {
        professionalId: me?.professional?.id,
      },
      {
        enabled: !!me?.professional?.id,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const albumsList =
    albumsListQuery?.pages.map((page) => page.items).flat() || [];

  const handleCloseAlbum = () => {
    setActiveAlbum(null);
  };

  if (activeAlbum) {
    return (
      <AlbumDetails
        activeAlbumId={activeAlbum.id}
        onClickClose={handleCloseAlbum}
      />
    );
  }

  return (
    <div className={styles.root}>
      <Placeholder
        className='h-full'
        isActive={albumsListQuery?.pages.length === 0}
        placeholder={{
          illustration: 'files',
          description: intl.formatMessage({
            id: 'user.professional.gallery.form.noAlbumsAdded',
          }),
          action: !albumData.isLoading && (
            <AlbumAddModal
              onOpenChange={isModalOpen.setValue}
              isOpen={isModalOpen.value}
              trigger={
                <Button
                  variant='outlined'
                  text={intl.formatMessage({
                    id: 'user.professional.gallery.form.createAlbum',
                  })}
                />
              }
            />
          ),
        }}
        fadeIn
      >
        <>
          <AlbumAddModal
            album={albumToEdit || undefined}
            isOpen={isModalOpen.value || !!albumToEdit}
            onOpenChange={(isOpen) => {
              isModalOpen.setValue(isOpen);
              if (!isOpen) {
                setAlbunToEdit(null);
              }
            }}
            trigger={
              <Button
                text={intl.formatMessage({
                  id: 'user.professional.gallery.form.createAlbum',
                })}
                variant='outlined'
              />
            }
          />
          <div className='mt-5 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-3 xl:grid-cols-5'>
            {albumsList?.map((album) => (
              <>
                <AlbumCard
                  isMoreButtonVisible
                  onEditClick={setAlbunToEdit}
                  album={album}
                  key={album.id}
                  name={album.title}
                  onClick={() => setActiveAlbum(album)}
                />
                <InfinityListController
                  hasNextPage={albumData.hasNextPage || false}
                  onLoadMore={albumData.fetchNextPage}
                  isNextPageLoading={albumData.isFetchingNextPage}
                />
              </>
            ))}
          </div>
        </>
      </Placeholder>
      {albumData.isLoading && (
        <div className={styles.spinnerContainer}>
          <Spinner size='medium' />
          <Typography className={styles.loadingLabel}>
            {intl.formatMessage({
              id: 'user.professional.gallery.form.loadingAlbums',
            })}
          </Typography>
        </div>
      )}
    </div>
  );
};
