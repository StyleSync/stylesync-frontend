'use client';
import type { FC } from 'react';
import Image from 'next/image';
// components
import { Icon, Typography } from '@/modules/core/components';
// assets
import BgImage from '@/assets/images/9e06ccd1124934ea069c12a8a47bc8c4.png';

import type { SplashGreetingBoardProps } from './splash-greeting-board.interface';
import styles from './splash-greeting-board.module.scss';

export const SplashGreetingBoard: FC<SplashGreetingBoardProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Icon className={styles.logo} name='stylesync-logo' />
        <Typography style={{ textAlign: 'center' }} variant='subtitle'>
          <Typography
            className={styles.description}
            weight='light'
            variant='subtitle'
          >
            Your beauty business assistant.
            <br />
            Welcome :)
          </Typography>
        </Typography>
      </div>
      <Image className={styles.bgImage} {...BgImage} alt='background' />
    </div>
  );
};
