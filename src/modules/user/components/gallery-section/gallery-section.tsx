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

// const imagesData = [
//   {
//     caption: 'After Rain (Jeshu John - designerspics.com)',
//     height: 174,
//     original: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
//     src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Boats (Jeshu John - designerspics.com)',
//     height: 212,
//     original: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
//     src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Color Pencils (Jeshu John - designerspics.com)',
//     height: 212,
//     original: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
//     src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Red Apples with other Red Fruit (foodiesfeed.com)',
//     height: 213,
//     original: 'https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg',
//     src: 'https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg',
//     width: 320,
//   },
//   {
//     caption: '37H (gratispgraphy.com)',
//     height: 183,
//     original: 'https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg',
//     src: 'https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg',
//     width: 320,
//   },
//   {
//     caption: '8H (gratisography.com)',
//     height: 320,
//     original: 'https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg',
//     src: 'https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg',
//     width: 240,
//   },
//   {
//     caption: '286H (gratisography.com)',
//     height: 190,
//     original: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg',
//     src: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg',
//     width: 320,
//   },
//   {
//     caption: '315H (gratisography.com)',
//     height: 148,
//     original: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg',
//     src: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg',
//     width: 320,
//   },
//   {
//     caption: '201H (gratisography.com)',
//     height: 213,
//     original: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg',
//     src: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Big Ben (Tom Eversley - isorepublic.com)',
//     height: 320,
//     original: 'https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg',
//     src: 'https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg',
//     width: 248,
//   },
//   {
//     caption: 'Red Zone - Paris (Tom Eversley - isorepublic.com)',
//     height: 113,
//     original: 'https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg',
//     src: 'https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Wood Glass (Tom Eversley - isorepublic.com)',
//     height: 320,
//     original: 'https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg',
//     src: 'https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg',
//     width: 313,
//   },
//   {
//     caption: 'Flower Interior Macro (Tom Eversley - isorepublic.com)',
//     height: 213,
//     original: 'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
//     src: 'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Old Barn (Tom Eversley - isorepublic.com)',
//     height: 194,
//     original: 'https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg',
//     src: 'https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Cosmos Flower Macro (Tom Eversley - isorepublic.com)',
//     height: 213,
//     original: 'https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg',
//     src: 'https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Orange Macro (Tom Eversley - isorepublic.com)',
//     height: 320,
//     original: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
//     src: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
//     width: 271,
//   },
//   {
//     caption: 'Surfer Sunset (Tom Eversley - isorepublic.com)',
//     height: 213,
//     original: 'https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg',
//     src: 'https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Man on BMX (Tom Eversley - isorepublic.com)',
//     height: 213,
//     original: 'https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg',
//     src: 'https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Ropeman - Thailand (Tom Eversley - isorepublic.com)',
//     height: 213,
//     original: 'https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg',
//     src: 'https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg',
//     width: 320,
//   },
//   {
//     caption: 'Time to Think (Tom Eversley - isorepublic.com)',
//     height: 213,
//     original: 'https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg',
//     src: 'https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg',
//     width: 320,
//   },
// ];

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
