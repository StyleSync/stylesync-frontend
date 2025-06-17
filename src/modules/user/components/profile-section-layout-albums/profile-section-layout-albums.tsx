import { type FC, useState } from 'react';

import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';

import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { AlbumCard } from '@/modules/gallery/components/album-card';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
import { ProfileSectionLayout } from '@/modules/user/components/profile-section-layout';

import { type ProfileSectionLayoutAlbumsProps } from './profile-section-layout-albums.interface';

import styles from './profile-section-layout-albums.module.scss';

export const ProfileSectionLayoutAlbums: FC<
  ProfileSectionLayoutAlbumsProps
> = ({ userId, isOwnProfile }) => {
  const isEdit = useBoolean();

  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: [],
  });

  const {
    data: albumsListQuery,
    isLoading,
    isFetched,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = trpc.album.list.useInfiniteQuery(
    {
      professionalId: professional?.id,
    },
    {
      enabled: !!professional.id,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  if (isFetched && (!albumsListQuery || albumsListQuery.pages.length === 0)) {
    return null;
  }

  const albumList =
    albumsListQuery?.pages.map((page) => page.items).flat() || [];

  if (isLoading) {
    return (
      <div className={styles.root}>
        <div className='skeleton h-[180px] w-full rounded-xl md:h-[330px]' />
        <div className='skeleton h-[180px] w-full rounded-xl md:h-[330px]' />
        <div className='skeleton h-[180px] w-full rounded-xl md:h-[330px]' />
      </div>
    );
  }

  return (
    <ProfileSectionLayout
      edit={isEdit.value}
      title='pro.layout.title.gallery'
      id='profile-albums'
      onEdit={() => isEdit.setTrue()}
      onCancel={() => isEdit.setFalse()}
      isOwnProfile={isOwnProfile}
    >
      {isEdit.value ? (
        <ProfessionalGalleryForm />
      ) : (
        <>
          <div
            className={clsx(styles.root, {
              [styles.root_displayAlbum]: !!activeAlbum,
            })}
          >
            {albumList?.map((album) => (
              <AlbumCard
                isMoreButtonVisible={false}
                album={album}
                key={album.id}
                name={album.title}
                isActive={album.id === activeAlbum}
                hidden={!!activeAlbum && album.id !== activeAlbum}
                onClick={() => setActiveAlbum(album.id)}
                onCloseClick={() => {
                  setActiveAlbum(null);
                }}
              />
            ))}
            <InfinityListController
              hasNextPage={hasNextPage || false}
              onLoadMore={fetchNextPage}
              isNextPageLoading={isFetchingNextPage}
            />
          </div>
        </>
      )}
    </ProfileSectionLayout>
  );
};
