'use client';
import { type FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIntl } from 'react-intl';
import { useBoolean, useEventListener } from 'usehooks-ts';

import { Icon } from '@/modules/core/components/icon';
import { headerRouteConfig } from '@/modules/core/constants/header.constants';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import type { ChildrenProp } from '@/modules/core/types/react.types';

import type { HeaderProps } from './header.interface';

import styles from './header.module.scss';

const PAGE_SCROLL_TRIGGER = 5;

const Header: FC<HeaderProps> & { BottomContent: FC<ChildrenProp> } = ({
  style,
  className,
  centralSlot,
  rightSlot,
  classes,
}) => {
  const isPageScrolled = useBoolean();
  const pathname = usePathname();
  const intl = useIntl();
  const deviceType = useDeviceType();
  const routeConfig = headerRouteConfig.find((config) =>
    config.match(pathname)
  );

  useEventListener('scroll', () => {
    if (window.scrollY >= PAGE_SCROLL_TRIGGER) {
      isPageScrolled.setTrue();

      return;
    }

    isPageScrolled.setFalse();
  });

  return (
    <header
      className={clsx(
        styles.root,
        { [styles.pageScrolled]: isPageScrolled.value },
        className
      )}
      style={style}
    >
      <div className={clsx(styles.content, classes?.content)}>
        <div className={clsx(styles.leftSlot, classes?.leftSlot)}>
          {routeConfig?.title && deviceType === 'mobile' ? (
            <span className='text-xl font-medium text-dark'>
              {intl.formatMessage({ id: routeConfig.title })}
            </span>
          ) : (
            <Link href='/' aria-label='Logo'>
              <Icon className={styles.logo} name='stylesync-logo' width={150} />
            </Link>
          )}
        </div>
        <div className={clsx(styles.centralSlot, classes?.centralSlot)}>
          {centralSlot}
        </div>
        <div className={clsx(styles.rightSlot, classes?.rightSlot)}>
          {rightSlot}
        </div>
      </div>
      <div id='header-bottom-node' />
    </header>
  );
};

const BottomContent: FC<ChildrenProp> = ({ children }) => {
  // state
  const [isMounted, setIsMounted] = useState(false);
  // refs
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector('#header-bottom-node');
    setIsMounted(true);
  }, []);

  return (
    <>{isMounted && ref.current ? createPortal(children, ref.current) : null}</>
  );
};

Header.BottomContent = BottomContent;

export { Header };
