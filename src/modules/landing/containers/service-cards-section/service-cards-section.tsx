'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServiceCard } from '@/modules/landing/components/service-card/service-card';
import 'swiper/css';
import { services } from './service-data';

export const ServiceCardSection = () => {
  return (
    <section className='mt-24 flex flex-col items-center z-0'>
      <Typography
        variant='title'
        weight='semibold'
        className='!text-4xl md:!text-5xl !text-black text-center px-2'
      >
        Easily Appointment with patient
      </Typography>
      <span className='text-center text-base !text-gray-accent max-w-[820px] mt-10 px-2'>
        An efficient dental appointment is one that is well-organized, minimizes
        waiting times, and ensures effective communication between the dental
        team and the patient.
      </span>

      <div className='w-full mt-16'>
        <Swiper
          className='w-full h-full'
          grabCursor
          slidesOffsetBefore={80}
          slidesOffsetAfter={80}
          breakpoints={{
            320: {
              slidesPerView: 1.3,
              spaceBetween: 24,
            },
            640: {
              slidesPerView: 2.3,
              spaceBetween: 16,
            },
            990: {
              slidesPerView: 3.3,
              spaceBetween: 16,
            },
            1100: {
              slidesPerView: 3.3,
              spaceBetween: 16,
            },
            1400: {
              slidesPerView: 4.3,
              spaceBetween: 24,
            },
          }}
        >
          {services.map((card, index) => (
            <SwiperSlide className='w-full h-full pb-14 pt-4' key={index}>
              <ServiceCard image={card.image} title={card.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
