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
        className='!text-4xl md:!text-5xl text-dark text-center px-2 '
      >
        Easily Appointment with patient
      </Typography>
      <Typography className='text-center !text-gray max-w-[820px] mt-5 px-2'>
        An efficient dental appointment is one that is well-organized, minimizes
        waiting times, and ensures effective communication between the dental
        team and the patient.
      </Typography>

      <div className='w-full mt-16 relative'>
        <Swiper
          className='w-full h-full absolute'
          grabCursor
          slidesOffsetBefore={80}
          slidesOffsetAfter={80}
          breakpoints={{
            320: {
              slidesPerView: 1.4,
              spaceBetween: 24,
            },
            640: {
              slidesPerView: 2.4,
              spaceBetween: 16,
            },
            990: {
              slidesPerView: 3.5,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 24,
            },
            1350: {
              slidesPerView: 4.4,
              spaceBetween: 24,
            },
          }}
        >
          {services.map((card, index) => (
            <SwiperSlide className='w-full h-full' key={index}>
              <ServiceCard
                image={card.image}
                title={card.title}
                services={card.services}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
