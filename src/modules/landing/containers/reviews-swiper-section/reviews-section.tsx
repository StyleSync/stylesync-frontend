'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { ReviewCard } from '@/modules/landing/components/reviews-card/review-cards';
import 'swiper/css';
import img from '@/assets/images/girl.png';

const testimonialsData1 = [
  {
    img: Image,
    text: "Absolutely thrilled with the results! The specialist at the beauty salon was incredibly skilled and attentive. My experience was nothing short of amazing, and I can't wait to book my next appointment. Thank you for your exceptional service!",
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
  {
    img: Image,
    text: "Absolutely thrilled with the results! The specialist at the beauty salon was incredibly skilled and attentive. My experience was nothing short of amazing, and I can't wait to book my next appointment. Thank you for your exceptional service!",
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
  {
    img: Image,
    text: "Absolutely thrilled with the results! The specialist at the beauty salon was incredibly skilled and attentive. My experience was nothing short of amazing, and I can't wait to book my next appointment. Thank you for your exceptional service!",
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
  {
    img: Image,
    text: "Absolutely thrilled with the results! The specialist at the beauty salon was incredibly skilled and attentive. My experience was nothing short of amazing, and I can't wait to book my next appointment. Thank you for your exceptional service!",
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
  {
    img: Image,
    text: "Absolutely thrilled with the results! The specialist at the beauty salon was incredibly skilled and attentive. My experience was nothing short of amazing, and I can't wait to book my next appointment. Thank you for your exceptional service!",
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
];

const testimonialsData2 = [
  {
    img: Image,
    text: "Absolutely thrilled with the results! The specialist at the beauty salon was incredibly skilled and attentive. My experience was nothing short of amazing, and I can't wait to book my next appointment. Thank you for your exceptional service!",
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
  {
    img: Image,
    text: "Absolutely thrilled with the results! The specialist at the beauty salon was incredibly skilled and attentive. My experience was nothing short of amazing, and I can't wait to book my next appointment. Thank you for your exceptional service!",
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
  {
    img: Image,
    text: "Absolutely thrilled with the results! The specialist at the beauty salon was incredibly skilled and attentive. My experience was nothing short of amazing, and I can't wait to book my next appointment. Thank you for your exceptional service!",
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
  {
    img: Image,
    text: "Absolutely thrilled with the results! The specialist at the beauty salon was incredibly skilled and attentive. My experience was nothing short of amazing, and I can't wait to book my next appointment. Thank you for your exceptional service!",
    author: {
      avatar: img,
      name: 'Ivan Romli',
      occupation: 'student',
    },
  },
  {
    img: Image,
    text: "Absolutely thrilled with the results! The specialist at the beauty salon was incredibly skilled and attentive. My experience was nothing short of amazing, and I can't wait to book my next appointment. Thank you for your exceptional service!",
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
        className='text-center !text-4xl !text-black md:!text-5xl'
      >
        Check Out What They Said
      </Typography>
      <div className='mt-16 w-full'>
        <Swiper
          className='h-full w-full'
          wrapperClass=' !ease-linear'
          slidesPerView={2.4}
          speed={10000}
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

      <div className='mt-5 w-full'>
        <Swiper
          className='h-full w-full'
          wrapperClass=' !ease-linear'
          speed={10000}
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
      </div>
    </section>
  );
};
