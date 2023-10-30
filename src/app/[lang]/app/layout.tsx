import Image from 'next/image';
// containers
import { Header } from '@/modules/core/components/header';
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';
import { UserHeaderNavigation } from '@/modules/core/containers/user-header-navigation';
// assets
import Bg from '@/assets/images/bg-1.png';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';

import styles from './app-layout.module.scss';

export default function AppLayout({ children }: ChildrenProp) {
  return (
    <>
      <Header
        centralSlot={<UserHeaderNavigation />}
        rightSlot={<UserMenuBadge />}
      />
      <Image
        className={styles.bg}
        src={Bg.src}
        width={Bg.width}
        height={Bg.height}
        blurDataURL={Bg.blurDataURL}
        alt='background'
      />
      {children}
    </>
  );
}
