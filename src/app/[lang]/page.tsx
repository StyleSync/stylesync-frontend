// containers
import { IntroSection } from '@/modules/landing/containers/intro-section';
import { ServiceCardSection } from '@/modules/landing/containers/service-cards-section';
import { ReviewsSection } from '@/modules/landing/containers/reviews-swiper-section';
import { DownloandSection } from '@/modules/landing/containers/download-section/downland-section';
import { Footer } from '@/modules/landing/containers/footer/footer';
import { ServiceDataSection } from '@/modules/landing/containers/service-data-section';
import { LandingHeader } from '@/modules/landing/containers/header/landing-header';

export default async function Home() {
  return (
    <>
      <LandingHeader />
      <main className=' mt-24 flex flex-col '>
        <IntroSection />
        <ReviewsSection />
        <ServiceCardSection />
        <ServiceDataSection />
        <DownloandSection />
      </main>
      <Footer />
    </>
  );
}
