'use client';
import { type FC, useState } from 'react';

import clsx from 'clsx';

import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { AlbumCard } from '@/modules/gallery/components/album-card';
import { ProfileSectionLayout } from '@/modules/user/components/profile-section-layout';

import type { GallerySectionProps } from './gallery-section.inerface';

import styles from './gallery-section.module.scss';

export const GallerySection: FC<GallerySectionProps> = ({ userId }) => {
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

  return (
    <ProfileSectionLayout
      title={'pro.layout.title.gallery'}
      id='profile-gallery'
      edit={false}
    >
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
    </ProfileSectionLayout>
  );
};
