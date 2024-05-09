'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServiceCard } from '@/modules/landing/components/service-card/service-card';
import 'swiper/css';

const services = [
  {
    title: 'John Dukes',
    services: [
      'Teeth Cleaning',
      'Fillings',
      'Root Canals',
      'Extractions',
      'Dental Implants',
      'Orthodontics',
    ],
  },
  {
    title: 'Jane Doe',
    services: [
      'Teeth Whitening',
      'Crowns',
      'Dentures',
      'Periodontics',
      'Oral Surgery',
      'Cosmetic Dentistry',
    ],
  },
  {
    title: 'John Dukes',
    services: [
      'Teeth Cleaning',
      'Fillings',
      'Root Canals',
      'Extractions',
      'Dental Implants',
      'Orthodontics',
    ],
  },
  {
    title: 'Jane Doe',
    services: [
      'Teeth Whitening',
      'Crowns',
      'Dentures',
      'Periodontics',
      'Oral Surgery',
      'Cosmetic Dentistry',
    ],
  },
  {
    title: 'John Dukes',
    services: [
      'Teeth Cleaning',
      'Fillings',
      'Root Canals',
      'Extractions',
      'Dental Implants',
      'Orthodontics',
    ],
  },
  {
    title: 'Jane Doe',
    services: [
      'Teeth Whitening',
      'Crowns',
      'Dentures',
      'Periodontics',
      'Oral Surgery',
      'Cosmetic Dentistry',
    ],
  },
];

export const ServiceCardSection = () => {
  return (
    <section className=' mt-24 flex flex-col items-center z-0'>
      <Typography
        variant='title'
        weight='semibold'
        className='!text-4xl md:!text-5xl text-dark text-center  px-2 '
      >
        Easily Appointment with patient
      </Typography>
      <Typography className='text-center !text-gray max-w-[820px] mt-5 px-2'>
        An efficient dental appointment is one that is well-organized, minimizes
        waiting times, and ensures effective communication between the dental
        team and the patient.
      </Typography>

      <div className=' w-full pl-[100px] mt-16 '>
        <Swiper
          className=' w-full h-full'
          loop
          spaceBetween={24}
          slidesPerView={4.2}
          grabCursor
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 24,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 24,
            },
            868: {
              slidesPerView: 3.2,
              spaceBetween: 16,
            },
            1124: {
              slidesPerView: 4.2,
              spaceBetween: 24,
            },
          }}
        >
          {services.map((card, index) => (
            <SwiperSlide className=' w-full h-full' key={index}>
              <ServiceCard title={card.title} services={card.services} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
