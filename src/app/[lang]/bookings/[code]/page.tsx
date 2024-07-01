'use client';

// containers
import { BookingPreview } from '@/modules/booking/containers/booking-preview/booking-preview';
import { Footer } from '@/modules/landing/containers/footer/footer';
import { LandingHeader } from '@/modules/landing/containers/header/landing-header';

export default function BookingDetailsPage() {
  return (
    <main className='flex flex-col '>
      <LandingHeader />
      <BookingPreview />
      <Footer />
    </main>
  );
}
