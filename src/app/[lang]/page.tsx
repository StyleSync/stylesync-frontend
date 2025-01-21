import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/modules/auth/constants/auth-server.constants';
import { pageGuard } from '@/modules/core/utils/route.utils';

// containers
import { IntroSection } from '@/modules/landing/containers/intro-section';
import { ServiceCardSection } from '@/modules/landing/containers/service-cards-section';
// import { ReviewsSection } from '@/modules/landing/containers/reviews-swiper-section';
import { MobileAppSection } from '@/modules/landing/containers/mobile-app-section';
import { Footer } from '@/modules/landing/containers/footer/footer';
import { ServiceDataSection } from '@/modules/landing/containers/service-data-section';
import { LandingHeader } from '@/modules/landing/containers/header/landing-header';
import { BottomTabNavigation } from '@/modules/core/containers/bottom-tab-navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  await pageGuard({
    require: {
      userType: true,
      onboarding: true,
    },
  });

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
      <main className='flex flex-col'>
        <IntroSection />
        <ServiceCardSection />
        {/* <ReviewsSection /> hidden until feedback list is empty */}
        <ServiceDataSection />
        <MobileAppSection />
      </main>
      <Footer />
      <BottomTabNavigation />
    </>
  );
}
