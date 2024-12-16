'use client';
import { type FC, useState } from 'react';
import { useIntl } from 'react-intl';
// components
import { AlbumCard } from '@/modules/gallery/components/album-card';

import styles from './gallery-section.module.scss';
import clsx from 'clsx';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ProfileSectionLayout } from '@/modules/user/components/profile-section-layout';
import type { GallerySectionProps } from './gallery-section.inerface';

export const GallerySection: FC<GallerySectionProps> = ({ userId }) => {
  const intl = useIntl();

  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: [],
  });

  const {
    data: albumsList,
    isLoading,
    isFetched,
  } = trpc.album.list.useQuery(
    {
      professionalId: professional?.id,
    },
    {
      enabled: !!professional.id,
    }
  );

  if (isLoading) {
    return (
      <ProfileSectionLayout
        title={intl.formatMessage({ id: 'pro.layout.title.gallery' })}
        id='profile-gallery'
      >
        <div className={styles.root}>
          <div className='skeleton h-[180px] w-full rounded-xl md:h-[330px]' />
          <div className='skeleton h-[180px] w-full rounded-xl md:h-[330px]' />
          <div className='skeleton h-[180px] w-full rounded-xl md:h-[330px]' />
        </div>
      </ProfileSectionLayout>
    );
  }

  if (isFetched && (!albumsList || albumsList.length === 0)) {
    return null;
  }

  return (
    <ProfileSectionLayout
      title={intl.formatMessage({ id: 'pro.layout.title.gallery' })}
      id='profile-gallery'
    >
      <div
        className={clsx(styles.root, {
          [styles.root_displayAlbum]: !!activeAlbum,
        })}
      >
        {albumsList?.items.map((album) => (
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
