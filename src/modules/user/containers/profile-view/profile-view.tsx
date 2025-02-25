'use client';

import { Suspense, useMemo } from 'react';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';

import { BookingProvider } from '@/modules/booking/providers/booking-provider';
import { Spinner } from '@/modules/core/components/spinner';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ServiceTableSkeleton } from '@/modules/service/components/service-table-skeleton';
import { AboutMe } from '@/modules/user/components/about-me';
import { GallerySection } from '@/modules/user/components/gallery-section';
import { ProLocation } from '@/modules/user/components/pro-location';
import { ProfileSectionLayout } from '@/modules/user/components/profile-section-layout';
import { UserServices } from '@/modules/user/components/user-services';
import { ProBookActions } from '@/modules/user/containers/pro-book-actions';
import { ProfessionalInfoBigCard } from '@/modules/user/containers/professional-info-big-card';

import { type ProfileViewProps } from './profile-view.interface';

import styles from './profile-view.module.scss';

export function ProfileView({ session }: ProfileViewProps) {
  const { id: queryId } = useParams<{ id: string }>();

  const { data, isLoading } = trpc.user.checkNickname.useQuery(
    {
      nickname: queryId,
    },
    { enabled: !!queryId }
  );

  const userId = useMemo(
    () => (data?.userExist ? data.userId : queryId) || '',
    [data, queryId]
  );

  if (isLoading) {
    return (
      <div className='z-50 flex h-full items-center justify-center'>
        <Spinner size={'large'} />
      </div>
    );
  }

  return (
    <BookingProvider userId={userId}>
      <main className={styles.root}>
        <section className={clsx(styles.section, styles.headerSection)}>
          <Suspense
            fallback={
              <div className='h-[214px] w-full rounded-xl bg-black/10' />
            }
          >
            <ProfessionalInfoBigCard userId={userId} session={session} />
          </Suspense>
        </section>
        <div className={styles.divider} />
        <div className={styles.sectionGroup}>
          <ProfileSectionLayout title='pro.layout.title.about' id='about-me'>
            <Suspense
              fallback={
                <div className='flex flex-col gap-y-2'>
                  <div className='skeleton flex h-4 w-[70%] rounded' />
                  <div className='skeleton flex h-4 w-[80%] rounded' />
                  <div className='skeleton flex h-4 w-[50%] rounded' />
                </div>
              }
            >
              <AboutMe userId={userId} />
            </Suspense>
          </ProfileSectionLayout>
          <ProfileSectionLayout
            title='pro.layout.title.services'
            id='profile-services'
          >
            <Suspense fallback={<ServiceTableSkeleton rows={3} />}>
              <UserServices userId={userId} session={session} />
            </Suspense>
          </ProfileSectionLayout>
          <ErrorBoundary fallback={null}>
            <ProfileSectionLayout
              title='pro.layout.title.location'
              id='profile-location'
            >
              <Suspense
                fallback={
                  <div className='flex flex-col gap-y-4'>
                    <div className='skeleton h-4 w-[60%] rounded' />
                    <div className='skeleton h-[400px] w-full rounded-xl' />
                  </div>
                }
              >
                <ProLocation userId={userId} />
              </Suspense>
            </ProfileSectionLayout>
          </ErrorBoundary>
          <GallerySection userId={userId} />
        </div>
        <ProBookActions userId={userId} />
      </main>
    </BookingProvider>
  );
}
