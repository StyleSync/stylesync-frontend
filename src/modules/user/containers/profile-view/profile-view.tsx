'use client';

import { Suspense, useMemo } from 'react';

import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { useIntl } from 'react-intl';

import { BookingProvider } from '@/modules/booking/providers/booking-provider';
import { ErrorView } from '@/modules/core/components/error-view';
import { Spinner } from '@/modules/core/components/spinner';
import { useGtmAuthEvents } from '@/modules/core/hooks/use-gtm-auth-events';
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
  const router = useRouter();
  const intl = useIntl();

  useGtmAuthEvents();

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
