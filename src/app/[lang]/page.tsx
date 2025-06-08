import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/modules/auth/constants/auth-server.constants';
import { BottomTabNavigation } from '@/modules/core/containers/bottom-tab-navigation';
import { Footer } from '@/modules/landing/containers/footer/footer';
import { LandingHeader } from '@/modules/landing/containers/header/landing-header';
import { IntroSection } from '@/modules/landing/containers/intro-section';
import { MobileAppSection } from '@/modules/landing/containers/mobile-app-section';
import { ReviewsSection } from '@/modules/landing/containers/reviews-swiper-section';
import { ServiceDataSection } from '@/modules/landing/containers/service-data-section';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (!session.user.userType) {
      redirect('/app/account-type');
    }

    if (!session.user.onboardingCompleted) {
      redirect('/app/onboard');
    }

    if (session.user.userType === 'PROFESSIONAL') {
      redirect('/app/profile');
    }

    if (session.user.userType === 'CUSTOMER') {
      redirect('/app/my-bookings');
    }
  }

  return (
    <>
      <LandingHeader />
      <main className='relative flex flex-col'>
        <IntroSection />
        <section className='z-0 mx-auto mt-10 flex w-full max-w-[1200px] flex-col'>
          <span className='mx-auto text-5xl font-semibold text-black'>
            Знайомо?
          </span>
          <div className='mt-16 grid grid-cols-2 gap-6'>
            <div className='flex items-center gap-x-4 rounded-xl p-6 shadow'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-destructive-light'>
                <span className='text-2xl font-semibold text-destructive'>
                  1
                </span>
              </div>
              <span className='text-lg'>
                Клієнт забув прийти - втрата доходу
              </span>
            </div>
            <div className='flex items-center gap-x-4 rounded-xl p-6 shadow'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-destructive-light'>
                <span className='text-2xl font-semibold text-destructive'>
                  2
                </span>
              </div>
              <span className='text-lg'>
                Не пам’ятаю, коли востаннє була ця клієнтка і що їй робили
              </span>
            </div>

            <div className='flex items-center gap-x-4 rounded-xl p-6 shadow'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-destructive-light'>
                <span className='text-2xl font-semibold text-destructive'>
                  3
                </span>
              </div>
              <span className='text-lg'>
                Відповідаєш на повідомлення замість відпочинку
              </span>
            </div>
            <div className='flex items-center gap-x-4 rounded-xl p-6 shadow'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive-light'>
                <span className='text-2xl font-semibold text-destructive'>
                  4
                </span>
              </div>
              <span className='text-lg'>
                Клієнти пишуть у Viber, Telegram, Instagram — важко
                організуватись
              </span>
            </div>
            <div className='flex items-center gap-x-4 rounded-xl p-6 shadow'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive-light'>
                <span className='text-2xl font-semibold text-destructive'>
                  5
                </span>
              </div>
              <span className='text-lg'>
                Твій розклад у нотатках або Instagram
              </span>
            </div>
          </div>
        </section>
        {/* <section className='z-0 mx-auto mt-24 flex w-full max-w-[1200px] flex-col'>
          <span className='mx-auto text-5xl font-semibold text-black'>
            StyleSync все це автоматизує
          </span>
        </section> */}
        <ServiceDataSection />
        <ReviewsSection />
        {/* <ServiceCardSection /> */}
        <MobileAppSection />
      </main>
      <Footer />
      <BottomTabNavigation />
    </>
  );
}
