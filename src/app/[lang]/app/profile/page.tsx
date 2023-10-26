import clsx from 'clsx';
import Image from 'next/image';
// components
import { UserHeader } from '@/modules/user/components/user-header';
import { AboutMe } from '@/modules/user/components/about-me';
import { GallerySection } from '@/modules/user/components/gallery-section';
import { Services } from '@/modules/user/components/user-services';
import { ProfessionalProfileTabs } from '@/modules/user/components/professional-profile-tabs';
// utils
import { pageGuard } from '@/modules/core/utils/route.utils';
// assets
import Bg from '@/assets/images/bg-1.png';

import styles from './profile.module.scss';

export default async function Profile() {
  await pageGuard({
    require: {
      userType: true,
      onboarding: true,
    },
  });

  return (
    <main className={styles.root}>
      <Image
        className={styles.img}
        src={Bg.src}
        width={Bg.width}
        height={Bg.height}
        blurDataURL={Bg.blurDataURL}
        alt='background'
      />
      <section className={clsx(styles.section, styles.headerSection)}>
        <UserHeader />
      </section>
      <section className={clsx(styles.section, styles.tabsSection)}>
        <ProfessionalProfileTabs />
      </section>
      <div className={styles.divider} />
      <div className={styles.sectionGroup}>
        <section
          className={clsx(styles.section, styles.block)}
          id='profile-about'
        >
          <AboutMe />
        </section>
        <section
          className={clsx(styles.section, styles.block)}
          id='profile-services'
        >
          <Services />
        </section>
        <section
          className={clsx(styles.section, styles.block)}
          id='profile-gallery'
        >
          <GallerySection />
        </section>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'StyleSync | Tennisha’s Beauty',
  description: 'Generated by create next app',
};
