'use client';
import Image from 'next/image';
import { useIntl } from 'react-intl';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';
import { IphoneLayout } from '@/modules/core/components/iphone-layout';
// assets
import net from '@/modules/landing/landing-image/big-net.png';
import google from '@/modules/landing/landing-image/google-play-badge.png';
import profileEn from '@/assets/images/profile2en.png';
import profileUk from '@/assets/images/profile2uk.png';
import searchUk from '@/assets/images/uk-pro-search.png';
import searchEn from '@/assets/images/en-pro-search.png';

export const MobileAppSection = () => {
  const intl = useIntl();

  const image1 = intl.locale === 'uk' ? searchUk.src : searchEn.src;
  const image2 = intl.locale === 'uk' ? profileUk.src : profileEn.src;

  return (
    <section className='relative flex w-full flex-col items-center justify-center p-3 sm:mt-12 lg:mt-20'>
      <Image
        className='absolute left-0 top-0 z-0 aspect-square h-full w-full max-w-full'
        src={net}
        alt='img'
        width={net.width}
        height={net.width}
      />
      <div
        className='absolute bottom-0 left-0 z-20 hidden h-[400px] w-full max-w-full sm:flex'
        style={{
          background: 'linear-gradient(180deg, transparent 0%, white 70%)',
        }}
      />
      <div className='flex flex-col gap-5'>
        <Typography
          weight='semibold'
          className='text-center !text-4xl !text-black md:!text-5xl'
        >
          {intl.formatMessage({ id: 'pages.landing.mobileApp.title' })}
        </Typography>
        <Typography
          variant='body1'
          className='max-w-[820px] px-2 text-center !text-gray-accent'
        >
          {intl.formatMessage({ id: 'pages.landing.mobileApp.description' })}
        </Typography>
        <div className='z-0 flex items-center justify-center gap-5 md:gap-8'>
          <Icon
            className='z-[25] hover:cursor-pointer'
            name='appleLogoLanding'
            width={150}
            height={60}
          />
          <Image
            className='z-[25] h-[75px] w-[170px] hover:cursor-pointer'
            src={google.src}
            alt='image'
            width={google.width}
            height={google.height}
          />
        </div>
      </div>
      <div className='relative mt-[104px] w-full'>
        <div className='absolute bottom-0 left-1/2 -z-10 aspect-square w-[750px] max-w-full -translate-x-1/2 rounded-full bg-[#F9F9F9]' />
        <div className='mx-auto flex aspect-[16/9] w-full max-w-[1180px] items-end justify-center'>
          <IphoneLayout
            imageUrl={image1}
            className='relative left-[13%] h-full'
          />
          <IphoneLayout
            imageUrl={image2}
            className='relative z-10 h-full scale-110'
          />
          <IphoneLayout
            imageUrl={image1}
            className='relative right-[13%] h-full'
          />
        </div>
        {/* <Image */}
        {/*   className='z-10' */}
        {/*   width={800} */}
        {/*   height={700} */}
        {/*   alt='img' */}
        {/*   src={iphone} */}
        {/* /> */}
      </div>
    </section>
  );
};
