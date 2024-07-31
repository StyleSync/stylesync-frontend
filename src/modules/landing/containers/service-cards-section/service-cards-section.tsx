'use client';
import { Swiper, SwiperSlide, type SwiperProps } from 'swiper/react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServiceCard } from '@/modules/landing/components/service-card/service-card';
import 'swiper/css';
import { services } from './service-data';
import { useIntl } from 'react-intl';
import { useWindowSize } from 'usehooks-ts';
import { useMemo } from 'react';

const getSlidesToDisplay = (windowWidth: number): number => {
  if (windowWidth >= 1400) {
    return 4;
  } else if (windowWidth >= 800) {
    return 3;
  }

  return 1.3;
};

export const ServiceCardSection = () => {
  const intl = useIntl();
  const windowSize = useWindowSize();
  // memo
  const dynamicSwiperProps = useMemo<Partial<SwiperProps>>(() => {
    const offset = windowSize.width >= 1024 ? 80 : 24;
    const spaceBetween = windowSize.width >= 1024 ? 24 : 16;
    const slidesToDisplay = getSlidesToDisplay(windowSize.width);
    const slideWidth =
      (windowSize.width - offset * 2 - (slidesToDisplay - 1) * spaceBetween) /
      slidesToDisplay;
    const slideOffset = (offset * 2 - spaceBetween / 2) / slideWidth;
    const slidesPerView = slidesToDisplay + slideOffset;

    console.log({ slidesPerView });

    return {
      slidesOffsetAfter: offset,
      slidesOffsetBefore: offset,
      slidesPerView,
      spaceBetween,
    };
  }, [windowSize]);

  return (
    <section className='z-0 mt-24 flex flex-col items-center'>
      <Typography
        variant='title'
        weight='semibold'
        className='px-2 text-center !text-4xl !text-black md:!text-5xl'
      >
        {intl.formatMessage({ id: 'pages.landing.services.title' })}
      </Typography>
      <span className='mt-10 max-w-[820px] px-2 text-center text-base !text-gray-accent'>
        {intl.formatMessage({ id: 'pages.landing.services.description' })}
      </span>

      <div className='mt-16 w-full'>
        <Swiper className='h-full w-full' {...dynamicSwiperProps} grabCursor>
          {services.map((card, index) => (
            <SwiperSlide className='h-fit w-full pb-14 pt-4' key={index}>
              <ServiceCard image={card.image} title={card.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
