'use client';

import { Suspense, useMemo } from 'react';

import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';

import { BookingProvider } from '@/modules/booking/providers/booking-provider';
import { ErrorView } from '@/modules/core/components/error-view';
import { Spinner } from '@/modules/core/components/spinner';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ProfileSectionLayoutAbout } from '@/modules/user/components/profile-section-layout-about';
import { ProfileSectionLayoutAlbums } from '@/modules/user/components/profile-section-layout-albums';
import { ProfileSectionLayoutLocation } from '@/modules/user/components/profile-section-layout-location';
import { ProfileSectionLayoutServices } from '@/modules/user/components/profile-section-layout-services/profile-section-layout-services';
import { ProBookActions } from '@/modules/user/containers/pro-book-actions';
import { ProfessionalInfoBigCard } from '@/modules/user/containers/professional-info-big-card';

import { type ProfileViewProps } from './profile-view.interface';

import styles from './profile-view.module.scss';

export function ProfileView({ session }: ProfileViewProps) {
  const { id: queryId } = useParams<{ id: string }>();
  const router = useRouter();
  const intl = useIntl();

  const { data, isPending, isError } = trpc.user.checkNickname.useQuery(
    {
      nickname: queryId,
    },
    {
      enabled: !!queryId,
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  const userId = useMemo(
    () => (data?.userExist ? data.userId : queryId) || '',
    [data, queryId]
  );

  const { isPending: isProfessionalPending, isError: isProfessionalError } =
    trpc.professional.get.useQuery(
      {
        id: userId,
        expand: ['user'],
      },
      {
        enabled: userId !== '',
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
      }
    );

  if (isPending || isProfessionalPending) {
    return (
      <div className='z-50 flex h-[100dvh] items-center justify-center'>
        <Spinner size={'large'} />
      </div>
    );
  }

  if (isError || isProfessionalError) {
    return (
      <ErrorView
        errorCode='404'
        title={intl.formatMessage({ id: 'profile.notFound.title' })}
        description={intl.formatMessage({ id: 'profile.notFound.description' })}
        primaryAction={{
          text: intl.formatMessage({ id: 'profile.notFound.searchPros' }),
          onClick: () => router.push('/app/search-pro'),
        }}
        secondaryAction={{
          text: intl.formatMessage({ id: 'profile.notFound.goHome' }),
          onClick: () => router.push('/'),
        }}
      />
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
          <ProfileSectionLayoutAbout userId={userId} />

          <ProfileSectionLayoutServices userId={userId} />

          <ProfileSectionLayoutLocation userId={userId} />

          <ProfileSectionLayoutAlbums userId={userId} />

          {/* <ProfileSectionLayout
            edit={false}
            title='pro.layout.title.location'
            id='profile-location'
            onEdit={() => {}}
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
          </ProfileSectionLayout> */}
          {/* <ProfessionalGalleryForm /> */}
          {/* <GallerySection userId={userId} /> */}
        </div>
        <ProBookActions userId={userId} />
      </main>
    </BookingProvider>
  );
}
