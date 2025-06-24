'use client';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Typography } from '@/modules/core/components/typogrpahy';
import { ReviewCard } from '@/modules/landing/components/reviews-card/review-cards';

import 'swiper/css';

const testimonialsData1 = [
  {
    // img: Image,
    text: 'Я не рахую, скільки клієнток просто не приходили — бо забули. Зараз з StyleSync усе автоматично: клієнтці прийшло нагадування, мені також, і я знаю, що все під контролем. Набагато більше клієнтів та відповідно грошей',
    author: {
      // avatar: img,
      name: 'Оксана Гнатенко',
      occupation: 'student',
    },
  },
  {
    // img: Image,
    text: 'Я вже не веду таблиці. У StyleSync кожна клієнтка має свою картку — я бачу, коли була востаннє, які нотатки лишала, які матеріали використали. Це не просто зручно — я нарешті почуваюся професійно',
    author: {
      // avatar: img,
      name: 'Наталія Воробйова',
      occupation: 'student',
    },
  },
  {
    // img: Image,
    text: 'У мене 3 месенджери, 2 акаунти в інсті — і раніше клієнтки писали куди завгодно. Зараз я просто кидаю їм лінк на запис, і все. А вільний час використовую не на переписки, а на відпочинок',
    author: {
      // avatar: img,
      name: 'Ірина Мельник',
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
