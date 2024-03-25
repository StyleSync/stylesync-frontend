import clsx from 'clsx';
// components
import { AboutMe } from '@/modules/user/components/about-me';
import { GallerySection } from '@/modules/user/components/gallery-section';
import { UserServices } from '@/modules/user/components/user-services';
import { ProfileSectionLayout } from '@/modules/user/components/profile-section-layout';
import { ProLocation } from '@/modules/user/components/pro-location';
import { ProBookActions } from '@/modules/user/containers/pro-book-actions';
// containers
// containers
import { ProfessionalInfoBigCard } from '@/modules/user/containers/professional-info-big-card';

// types
import type { PageParams } from '@/modules/core/types/next.types';
import styles from './profile.module.scss';

export default async function Profile({ params }: PageParams<{ id: string }>) {
  return (
    <main className={styles.root}>
      <section className={clsx(styles.section, styles.headerSection)}>
        <ProfessionalInfoBigCard userId={params.id} />
      </section>
      <div className={styles.divider} />
      <div className={styles.sectionGroup}>
        <ProfileSectionLayout title='About me' id='about-me'>
          <AboutMe userId={params.id} />
        </ProfileSectionLayout>
        <ProfileSectionLayout title='Services' id='profile-services'>
          <UserServices userId={params.id} />
        </ProfileSectionLayout>
        <ProfileSectionLayout title='Location' id='profile-location'>
          <ProLocation userId={params.id} />
        </ProfileSectionLayout>
        <ProfileSectionLayout title='Gallery' id='profile-gallery'>
          <GallerySection />
        </ProfileSectionLayout>
      </div>
      <ProBookActions />
    </main>
  );
}

export const metadata = {
  title: 'StyleSync | Tennisha’s Beauty',
  description: 'Generated by create next app',
};
