import React, { type FC, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// assets
import Photo from '@/assets/images/girl.png';

import type { AlbumCardProps } from './album-card.interface';
import styles from './album-card.module.scss';
import { Button } from '@/modules/core/components/button';
import { Gallery } from '@/modules/core/components/gallery';

const imagesData = [
  {
    caption: 'After Rain (Jeshu John - designerspics.com)',
    height: 174,
    original: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
    src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
    width: 320,
  },
  {
    caption: 'Boats (Jeshu John - designerspics.com)',
    height: 212,
    original: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    width: 320,
  },
  {
    caption: 'Color Pencils (Jeshu John - designerspics.com)',
    height: 212,
    original: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
    src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
    width: 320,
  },
  {
    caption: '37H (gratispgraphy.com)',
    height: 183,
    original: 'https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg',
    src: 'https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg',
    width: 320,
  },
  {
    caption: 'Red Apples with other Red Fruit (foodiesfeed.com)',
    height: 213,
    original: 'https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg',
    src: 'https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg',
    width: 320,
  },
  {
    caption: '8H (gratisography.com)',
    height: 320,
    original: 'https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg',
    src: 'https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg',
    width: 240,
  },
  {
    caption: '286H (gratisography.com)',
    height: 190,
    original: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg',
    src: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg',
    width: 320,
  },
  {
    caption: '315H (gratisography.com)',
    height: 148,
    original: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg',
    src: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg',
    width: 320,
  },
  {
    caption: '201H (gratisography.com)',
    height: 213,
    original: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg',
    src: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg',
    width: 320,
  },
  {
    caption: 'Big Ben (Tom Eversley - isorepublic.com)',
    height: 320,
    original: 'https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg',
    src: 'https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg',
    width: 248,
  },
  {
    caption: 'Red Zone - Paris (Tom Eversley - isorepublic.com)',
    height: 113,
    original: 'https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg',
    src: 'https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg',
    width: 320,
  },
  {
    caption: 'Wood Glass (Tom Eversley - isorepublic.com)',
    height: 320,
    original: 'https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg',
    src: 'https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg',
    width: 313,
  },
  {
    caption: 'Flower Interior Macro (Tom Eversley - isorepublic.com)',
    height: 213,
    original: 'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
    src: 'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
    width: 320,
  },
  {
    caption: 'Old Barn (Tom Eversley - isorepublic.com)',
    height: 194,
    original: 'https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg',
    src: 'https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg',
    width: 320,
  },
  {
    caption: 'Cosmos Flower Macro (Tom Eversley - isorepublic.com)',
    height: 213,
    original: 'https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg',
    src: 'https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg',
    width: 320,
  },
  {
    caption: 'Orange Macro (Tom Eversley - isorepublic.com)',
    height: 320,
    original: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
    src: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
    width: 271,
  },
  {
    caption: 'Surfer Sunset (Tom Eversley - isorepublic.com)',
    height: 213,
    original: 'https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg',
    src: 'https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg',
    width: 320,
  },
  {
    caption: 'Man on BMX (Tom Eversley - isorepublic.com)',
    height: 213,
    original: 'https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg',
    src: 'https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg',
    width: 320,
  },
  {
    caption: 'Ropeman - Thailand (Tom Eversley - isorepublic.com)',
    height: 213,
    original: 'https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg',
    src: 'https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg',
    width: 320,
  },
  {
    caption: 'Time to Think (Tom Eversley - isorepublic.com)',
    height: 213,
    original: 'https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg',
    src: 'https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg',
    width: 320,
  },
  {
    caption: 'Untitled (Jan Vasek - jeshoots.com)',
    height: 179,
    original: 'https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg',
    src: 'https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg',
    width: 320,
  },
  {
    caption: 'Untitled (moveast.me)',
    height: 215,
    original: 'https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg',
    src: 'https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg',
    width: 320,
  },
  {
    caption: 'A photo by 贝莉儿 NG. (unsplash.com)',
    height: 320,
    original: 'https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg',
    src: 'https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg',
    width: 257,
  },
  {
    caption: 'A photo by Matthew Wiebe. (unsplash.com)',
    height: 320,
    original: 'https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg',
    src: 'https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg',
    width: 226,
  },
];

const IMAGES_PREVIEW_LENGTH = 4;

export const AlbumCard: FC<AlbumCardProps> = ({
  isActive,
  hidden,
  name,
  onClick,
  onCloseClick,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    if (isActive) {
      return;
    }

    onClick();
  };

  return (
    <div
      className={clsx(styles.root, {
        [styles.root_hidden]: hidden,
        [styles.root_active]: isActive,
      })}
      ref={rootRef}
      onClick={handleCardClick}
    >
      <div className={styles.info}>
        <Typography variant='body1'>{name}</Typography>
        <Typography
          className={styles.photoCount}
          variant='body2'
          weight='medium'
        >
          {imagesData.length} photo
        </Typography>
      </div>
      {isActive && (
        <Button
          className={styles.closeButton}
          icon='close'
          variant='unstyled'
          onClick={onCloseClick}
          rippleColor='#fafbfc'
        />
      )}
      <div
        className={clsx(styles.images, { [styles.images_active]: isActive })}
      >
        {isActive ? (
          <Gallery images={imagesData} rowImagesCount={5} />
        ) : (
          imagesData.slice(0, IMAGES_PREVIEW_LENGTH).map((image, index) => (
            <div key={image.src} className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={image.src}
                alt='image'
                height={Photo.width}
                width={Photo.height}
              />
              {index === 3 && (
                <div className={styles.meta}>
                  <Typography variant='subtitle'>
                    +{imagesData.length - 3}
                  </Typography>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
