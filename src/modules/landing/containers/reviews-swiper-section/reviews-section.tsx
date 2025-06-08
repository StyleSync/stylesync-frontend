'use client';
import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import img from '@/assets/images/girl.png';
import { Typography } from '@/modules/core/components/typogrpahy';
import { ReviewCard } from '@/modules/landing/components/reviews-card/review-cards';

import 'swiper/css';

const testimonialsData1 = [
  {
    img: Image,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
  {
    img: Image,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
  {
    img: Image,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
];

export const ReviewsSection = () => {
  return (
    <section className='z-0 mt-24 flex w-full flex-col items-center'>
      <Typography
        variant='title'
        weight='semibold'
        className='max-w-[800px] text-center !text-4xl !leading-[1.2] !text-black md:!text-5xl'
      >
        Що кажуть майстри, які вже користуються
      </Typography>
      <div className='mt-16 w-full'>
        <Swiper
          className='h-full w-full'
          wrapperClass='!ease-linear'
          slidesPerView={2.4}
          speed={40000}
          loop
          spaceBetween={20}
          modules={[Autoplay]}
          autoplay={{
            delay: 0.5,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 24,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 40,
            },
            868: {
              slidesPerView: 2.5,
              spaceBetween: 40,
            },
            1124: {
              slidesPerView: 2.2,
              spaceBetween: 40,
            },
          }}
        >
          {testimonialsData1.map((card, index) => (
            <SwiperSlide className='h-full w-full' key={index}>
              <ReviewCard
                text={card.text}
                name={card.author.name}
                occupation={card.author.occupation}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* <div className='mt-5 w-full'>
        <Swiper
          className='h-full w-full'
          wrapperClass=' !ease-linear'
          speed={40000}
          loop
          modules={[Autoplay]}
          autoplay={{
            delay: 0.5,
            disableOnInteraction: false,
            reverseDirection: true,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={2.4}
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 24,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 40,
            },
            868: {
              slidesPerView: 2.5,
              spaceBetween: 40,
            },
            1124: {
              slidesPerView: 2.2,
              spaceBetween: 40,
            },
          }}
        >
          {testimonialsData2.map((card, index) => (
            <SwiperSlide className='h-full w-full' key={index}>
              <ReviewCard
                text={card.text}
                name={card.author.name}
                occupation={card.author.occupation}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </section>
  );
};
