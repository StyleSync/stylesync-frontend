import React, { type FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
// assets
import MacBrowserChromeToolbar from '@/assets/icons/mac-browser-chrome-toolbar.svg?icon';

import type { BrowserViewProps } from './browser-view.interface';
import styles from './browser-view.module.scss';

export const BrowserView: FC<BrowserViewProps> = ({
  image,
  style,
  className,
}) => {
  return (
    <div className={clsx(styles.root, className)} style={style}>
      <MacBrowserChromeToolbar />
      <div className={styles.content}>
        <div className={styles.ratio} />
        <Image
          className={styles.image}
          src={image.src}
          blurDataURL={image.blurDataURL}
          width={image.width}
          height={image.height}
          alt='browser page'
        />
      </div>
    </div>
  );
};
