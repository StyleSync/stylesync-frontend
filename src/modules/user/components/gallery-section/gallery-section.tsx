'use client';
import { type FC, useState } from 'react';
// components
import { AlbumCard } from '@/modules/gallery/components/album-card';

import styles from './gallery-section.module.scss';
import clsx from 'clsx';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ProfileSectionLayout } from '@/modules/user/components/profile-section-layout';
import type { GallerySectionProps } from './gallery-section.inerface';

export const GallerySection: FC<GallerySectionProps> = ({ userId }) => {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: ['user'],
  });

  const {
    data: albumsList,
    isLoading,
    isFetched,
  } = trpc.album.list.useQuery(
    {
      professionalId: professional.id,
    },
    {
      enabled: !!professional.id,
    }
  );

  if (isLoading) {
    // todo: add skeleton
    return null;
  }

  if (isFetched && (!albumsList || albumsList.length === 0)) {
    return null;
  }

  return (
    <ProfileSectionLayout title='Gallery' id='profile-gallery'>
      <div
        className={clsx(styles.root, {
          [styles.root_displayAlbum]: !!activeAlbum,
        })}
      >
        {albumsList?.map((album) => (
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
      </div>
    </ProfileSectionLayout>
  );
};
