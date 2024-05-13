import { type FC, useMemo, useState } from 'react';
import { useBoolean } from 'usehooks-ts';
// components
import { Button } from '@/modules/core/components/button';
import { Placeholder } from '@/modules/core/components/placeholder';
import { AlbumAddModal } from '@/modules/settings/components/album-add-modal';
import { AlbumCard } from '@/modules/gallery/components/album-card';
import { AlbumDetails } from '@/modules/gallery/components/album-details';
import { Spinner } from '@/modules/core/components/spinner';
import { Typography } from '@/modules/core/components/typogrpahy';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// types
import type { ButtonProps } from '@/modules/core/components/button/button.interface';
import type { ProfessionalGalleryFormProps } from './professional-gallery-form.interface';
import type { Album } from '@prisma/client';

// style
import styles from './professional-gallery-form.module.scss';

export const ProfessionalGalleryForm: FC<ProfessionalGalleryFormProps> = () => {
  // state
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [albumToEdit, setAlbunToEdit] = useState<Album | null>(null);

  const windowSizeType = useDeviceType();
  const isModalOpen = useBoolean();
  // memo
  const buttonProps = useMemo<Partial<ButtonProps>>(() => {
    if (windowSizeType === 'mobile') {
      return {
        icon: 'plus',
        variant: 'primary',
      };
    }

    return {
      text: 'Create album',
      variant: 'secondary',
    };
  }, [windowSizeType]);

  // query

  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  const { data: albumsList, ...albumData } = trpc.album.list.useQuery(
    {
      professionalId: me?.professional?.id,
    },
    {
      enabled: !!me?.professional?.id,
    }
  );

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
        isActive={albumsList?.length === 0}
        placeholder={{
          illustration: 'files',
          description: 'No albums added',
          action: (
            <AlbumAddModal
              onOpenChange={isModalOpen.setValue}
              isOpen={isModalOpen.value}
              trigger={<Button variant='secondary' {...buttonProps} />}
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
            trigger={<Button variant='secondary' {...buttonProps} />}
          />
          <div className='grid xl:grid-cols-5 sm:grid-cols-3 gap-4 mt-8'>
            {albumsList?.map((album) => (
              <AlbumCard
                isMoreButtonVisible
                onEditClick={setAlbunToEdit}
                album={album}
                key={album.id}
                name={album.title}
                onClick={() => setActiveAlbum(album)}
              />
            ))}
          </div>
        </>
      </Placeholder>
      {albumData.isLoading && (
        <div className={styles.spinnerContainer}>
          <Spinner size='medium' />
          <Typography className={styles.loadingLabel}>
            Download albums...
          </Typography>
        </div>
      )}
    </div>
  );
};
