import React, { type FC } from 'react';

import useElementSize from '@custom-react-hooks/use-element-size';
import clsx from 'clsx';
import Image from 'next/image';

import MacBrowserChromeToolbar from '@/assets/icons/mac-browser-chrome-toolbar.svg?icon';
import { Icon } from '@/modules/core/components/icon';

import type { BrowserViewProps } from './browser-view.interface';

import styles from './browser-view.module.scss';

const defaultWidthPx = 850;
const defaultFontSizePx = 10;
const defaultIconSizePx = 12;

export const BrowserView: FC<BrowserViewProps> = ({
  image,
  meta: { siteIcon, siteName },
  style,
  className,
}) => {
  const [ref, size] = useElementSize();

  const fontSize = (size.width * defaultFontSizePx) / defaultWidthPx;
  const iconSize = (size.width * defaultIconSizePx) / defaultWidthPx;

  return (
    <div className={clsx(styles.root, className)} style={style} ref={ref}>
      <MacBrowserChromeToolbar className='relative w-full' />
      <div className='absolute left-[6.8%] top-[1.7%] z-10 flex items-center gap-x-1'>
        <Icon name={siteIcon} width={iconSize} height={iconSize} />
        <span
          className='text-dark'
          style={{
            fontSize,
          }}
        >
          {siteName}
        </span>
      </div>
      <div className='absolute left-[11.1%] top-[6.5%] z-10 flex h-fit w-fit bg-[#F1F3F4] pr-5' />
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
