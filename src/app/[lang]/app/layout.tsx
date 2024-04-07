import Image from 'next/image';
// containers
import { BottomTabNavigation } from '@/modules/core/containers/bottom-tab-navigation';
import { AppHeader } from '@/modules/core/containers/app-header';
// assets
import Bg from '@/assets/images/bg-1.png';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';

import styles from './app-layout.module.scss';

export default function AppLayout({ children }: ChildrenProp) {
  return (
    <>
      <AppHeader />
      <Image
        className={styles.bg}
        src={Bg.src}
        width={Bg.width}
        height={Bg.height}
        blurDataURL={Bg.blurDataURL}
        alt='background'
      />
      {children}
      <BottomTabNavigation />
    </>
  );
}
