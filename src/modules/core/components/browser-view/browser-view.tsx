import React, { type FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
// assets
import MacBrowserChromeToolbar from '@/assets/icons/mac-browser-chrome-toolbar.svg?icon';

import type { BrowserViewProps } from './browser-view.interface';
import styles from './browser-view.module.scss';
import { Icon } from '@/modules/core/components/icon';
import useElementSize from '@custom-react-hooks/use-element-size';

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
      <MacBrowserChromeToolbar className='w-full relative' />
      <div className='absolute flex items-center gap-x-1 z-10 top-[1.7%] left-[6.8%]'>
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
      <div className='absolute top-[6.5%] left-[11.1%] flex bg-[#F1F3F4] z-10 w-fit pr-5 h-fit'>
        {/* <span className='font-medium' style={{ fontSize }}> */}
        {/*   <span className='text-gray-accent'>https://</span> */}
        {/*   <span className='text-dark'>{siteUrl}</span> */}
        {/* </span> */}
      </div>
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
