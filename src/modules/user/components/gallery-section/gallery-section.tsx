'use client';
import { useState } from 'react';
// components
import { AlbumCard } from '@/modules/gallery/components/album-card';

import styles from './gallery-section.module.scss';
import clsx from 'clsx';
import { trpc } from '@/modules/core/utils/trpc.utils';

export const GallerySection = () => {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  const { data: albumsList } = trpc.album.list.useQuery(
    {
      professionalId: me?.professional?.id,
    },
    {
      enabled: !!me?.professional?.id,
    }
  );

  return (
    <>
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
    </>
  );
};
