import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/modules/auth/constants/auth-server.constants';
import { Icon } from '@/modules/core/components/icon';
import { BottomTabNavigation } from '@/modules/core/containers/bottom-tab-navigation';
import { Footer } from '@/modules/landing/containers/footer/footer';
import { LandingHeader } from '@/modules/landing/containers/header/landing-header';
import { IntroSection } from '@/modules/landing/containers/intro-section';
import { MobileAppSection } from '@/modules/landing/containers/mobile-app-section';
import { ReviewsSection } from '@/modules/landing/containers/reviews-swiper-section';
import { ServiceDataSection } from '@/modules/landing/containers/service-data-section';

const disadvantages = [
  {
    title: 'Клієнт забув прийти - втрачаєш дохід',
  },
  {
    title: 'Не пам’ятаєш, коли востаннє була ця клієнтка і що їй робили',
  },
  {
    title: 'Відповідаєш на повідомлення замість відпочинку',
  },
  {
    title: 'Клієнти пишуть у Viber, Telegram, Instagram — важко організуватись',
  },
  {
    title: 'Графік у нотатках, сторісах і голові без синхронізації',
  },
];

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
        <section className='z-0 mx-auto mt-10 flex w-full max-w-[1200px] flex-col px-4'>
          <span className='mx-auto text-[40px] font-semibold text-black md:text-5xl'>
            Знайомо?
          </span>
          <div className='mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {disadvantages.map((disadvantage, index) => (
              <div
                key={index}
                className='flex items-center gap-x-4 rounded-xl border border-gray-light p-4 shadow md:justify-start md:text-start'
              >
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive-light'>
                  <Icon
                    name='chart-down'
                    className='h-6 w-6 text-destructive'
                  />
                </div>
                <span className='text-lg font-medium text-dark'>
                  {disadvantage.title}
                </span>
              </div>
            ))}
          </div>
        </section>
        <ServiceDataSection />
        <ReviewsSection />
        <MobileAppSection />
      </main>
      <Footer />
      <BottomTabNavigation />
    </>
  );
}
