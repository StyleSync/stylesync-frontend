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

const windowSizes = {
  md: 800,
  xl: 1400,
};

const slidesToDisplayAmount = {
  default: 1.3,
  md: 3,
  xl: 4,
};

const getSlidesToDisplay = (windowWidth: number): number => {
  if (windowWidth >= windowSizes.xl) {
    return slidesToDisplayAmount.xl;
  } else if (windowWidth >= windowSizes.md) {
    return slidesToDisplayAmount.md;
  }

  return slidesToDisplayAmount.default;
};

export const ServiceCardSection = () => {
  const intl = useIntl();
  const windowSize = useWindowSize();
  // memo
  const dynamicSwiperProps = useMemo<Partial<SwiperProps>>(() => {
    const offsetValues = {
      default: 24,
      md: 80,
    };
    const spaceValues = {
      default: 16,
      md: 24,
    };

    const offset =
      windowSize.width >= 1024 ? offsetValues.md : offsetValues.default;
    const spaceBetween =
      windowSize.width >= 1024 ? spaceValues.md : spaceValues.default;
    const slidesToDisplay = getSlidesToDisplay(windowSize.width);
    const slideWidth =
      (windowSize.width - offset * 2 - (slidesToDisplay - 1) * spaceBetween) /
      slidesToDisplay;
    const slideOffset = (offset * 2 - spaceBetween / 2) / slideWidth;
    const slidesPerView = slidesToDisplay + slideOffset;

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
              <ServiceCard
                image={card.image}
                title={intl.formatMessage({ id: card.title })}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
