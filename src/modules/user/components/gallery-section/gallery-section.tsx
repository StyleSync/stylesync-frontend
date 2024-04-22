'use client';
import { useState } from 'react';
// components
import { AlbumCard } from '@/modules/gallery/components/album-card';

import styles from './gallery-section.module.scss';
import clsx from 'clsx';

type AlbumData = {
  id: string;
  name: string;
};

const albums: AlbumData[] = [
  {
    id: '1',
    name: 'Mane & Makeup Portfolio',
  },
  {
    id: '2',
    name: 'Makeup Catalog',
  },
  {
    id: '3',
    name: 'Just like it :)',
  },
];

export const GallerySection = () => {
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  return (
    <>
      <div
        className={clsx(styles.root, {
          [styles.root_displayAlbum]: !!activeAlbum,
        })}
      >
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            name={album.name}
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
