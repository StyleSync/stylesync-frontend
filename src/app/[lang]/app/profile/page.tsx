import clsx from 'clsx';
import Image from 'next/image';
// components
import {
  UserHeader,
  Services,
  AboutMe,
  GallerySection,
} from '@/modules/user/components';
import { Tabs } from '@/modules/core/components';
// assets
import Bg from '@/assets/images/test.png';

import styles from './profile.module.scss';

export default function Profile() {
  return (
    <main className={styles.root}>
      <Image className={styles.img} {...Bg} alt='background' />
      <section className={clsx(styles.section, styles.headerSection)}>
        <UserHeader />
      </section>
      <section className={clsx(styles.section, styles.tabsSection)}>
        <Tabs
          value='about'
          tabs={[
            {
              key: 'about',
              name: 'About',
            },
            {
              key: 'services',
              name: 'Services',
            },
            {
              key: 'gallery',
              name: 'Gallery',
            },
          ]}
        />
      </section>
      <div className={styles.divider} />
      <div className={styles.sectionGroup}>
        <section className={clsx(styles.section, styles.block)}>
          <AboutMe />
        </section>
        <section className={clsx(styles.section, styles.block)}>
          <Services />
        </section>
        <section className={clsx(styles.section, styles.block)}>
          <GallerySection />
        </section>
      </div>
    </main>
  );
}
