// containers
import { IntroSection } from '@/modules/landing/containers/intro-section';
import { ServiceCardSection } from '@/modules/landing/containers/service-cards-section';
// import { ReviewsSection } from '@/modules/landing/containers/reviews-swiper-section';
import { MobileAppSection } from '@/modules/landing/containers/mobile-app-section';
import { Footer } from '@/modules/landing/containers/footer/footer';
import { ServiceDataSection } from '@/modules/landing/containers/service-data-section';
import { LandingHeader } from '@/modules/landing/containers/header/landing-header';

export default async function Home() {
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
    </>
  );
}
