import {
  UserHeader,
  Services,
  AboutMe,
  GallerySection,
} from '@/modules/user/components';

import styles from './profile.module.scss';

export default function Profile() {
  return (
    <main className={styles.root}>
      <section className={styles.sectionHeader}>
        <div className={styles.container}>
          <UserHeader />
        </div>
      </section>

      <section className={styles.sectionAboutMe}>
        <div className={styles.container}>
          <AboutMe />
        </div>
      </section>

      <section className={styles.sectionGallery}>
        <div className={styles.container}>
          <GallerySection />
        </div>
      </section>

      <section className={styles.sectionServices}>
        <div className={styles.container}>
          <Services />
        </div>
      </section>
    </main>
  );
}
