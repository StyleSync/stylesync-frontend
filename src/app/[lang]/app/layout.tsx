import Image from 'next/image';
import { getServerSession } from 'next-auth';

import Bg from '@/assets/images/bg-1.png';
import { authOptions } from '@/modules/auth/constants/auth-server.constants';
import { AppHeader } from '@/modules/core/containers/app-header';
import { BottomTabNavigation } from '@/modules/core/containers/bottom-tab-navigation';
import type { ChildrenProp } from '@/modules/core/types/react.types';

import styles from './app-layout.module.scss';

export default async function AppLayout({ children }: ChildrenProp) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <AppHeader session={session} />
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
