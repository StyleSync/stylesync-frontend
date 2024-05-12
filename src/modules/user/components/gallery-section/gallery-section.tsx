'use client';
import { type FC, useEffect, useRef, useState } from 'react';
// components
import { Gallery } from '@/modules/core/components/gallery';
import { Button } from '@/modules/core/components/button';
import { Placeholder } from '@/modules/core/components/placeholder';

// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

import styles from './gallery-section.module.scss';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import type { GallerySectionProps } from './gallery-section.inerface';

const rowsToAdd = 2;
const imagesInRowMobile = 3;
const imagesInRowDefault = 4;

export const GallerySection: FC<GallerySectionProps> = ({ userId }) => {
  const [maxRows, setMaxRows] = useState(2);
  const deviceType = useDeviceType();
  const rowImagesCount =
    deviceType === 'mobile' ? imagesInRowMobile : imagesInRowDefault;

  const [visibleImagesCount, setVisibleImagesCount] = useState<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // query
  const { data: professional } = trpc.professional.get.useQuery({
    id: userId,
    expand: ['user'],
  });

  const { data: portfolioList } = trpc.portfolio.list.useQuery(
    {
      professionalId: professional?.id,
    },
    {
      enabled: !!professional?.id,
    }
  );

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const images = rootRef.current.querySelectorAll('img');

    setVisibleImagesCount(images.length);
  }, [maxRows]);

  const showMoreImages = () => {
    setMaxRows((prevMaxRows) => prevMaxRows + rowsToAdd);
  };

  const hideImages = () => {
    setMaxRows(2);
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.galleryWrapper}>
        <Placeholder
          isActive={portfolioList?.length === 0}
          placeholder={{
            illustration: 'files',
            description: 'No images added',
          }}
          fadeIn
        >
          <div className={styles.galleryWrapper}>
            <Gallery
              //  @ts-ignore
              images={portfolioList || []}
              rowImagesCount={rowImagesCount}
              maxRows={maxRows}
            />
          </div>
        </Placeholder>
      </div>
      <div className={styles.actions}>
        {maxRows > 2 && (
          <Button
            className={styles.showMore}
            text='Hide'
            variant='secondary'
            onClick={hideImages}
          />
        )}

        {portfolioList && visibleImagesCount < portfolioList?.length && (
          <Button
            className={styles.showMore}
            text='Show more'
            variant='primary'
            onClick={showMoreImages}
          />
        )}
      </div>
    </div>
  );
};
