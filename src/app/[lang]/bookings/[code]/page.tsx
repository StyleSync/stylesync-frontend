import { BookingPreview } from '@/modules/booking/containers/booking-preview/booking-preview';
import { BottomTabNavigation } from '@/modules/core/containers/bottom-tab-navigation';
import { Footer } from '@/modules/landing/containers/footer/footer';
import { LandingHeader } from '@/modules/landing/containers/header/landing-header';

export default function BookingDetailsPage() {
  return (
    <div className='flex h-screen flex-col justify-between'>
      <LandingHeader />
      <BookingPreview />
      <Footer />
      <BottomTabNavigation />
    </div>
  );
}
