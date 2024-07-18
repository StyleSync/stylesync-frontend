import Image from 'next/image';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';

import net from '@/modules/landing/landing-image/big-net.png';
import google from '@/modules/landing/landing-image/google-play-badge.png';
import { IphoneLayout } from '@/modules/core/components/iphone-layout';
import Screenshot from '@/assets/images/screenshot.png';
import Screenshot2 from '@/assets/images/screenshot2.png';

export const MobileAppSection = () => {
  return (
    <section className='relative w-full flex flex-col justify-center items-center mt-20 p-3'>
      <Image
        className='absolute w-full h-full top-0 left-0 z-0'
        src={net}
        alt='img'
        width={1000}
        height={1000}
      />
      <div
        className='absolute bottom-0 left-0 w-full h-[400px] z-20'
        style={{
          background: 'linear-gradient(180deg, transparent 0%, white 70%)',
        }}
      />
      <div className='flex flex-col gap-5'>
        <Typography
          weight='semibold'
          className='!text-4xl md:!text-5xl !text-black text-center'
        >
          StyleSync Mobile App
        </Typography>
        <Typography
          variant='body1'
          className='text-center !text-gray-accent max-w-[820px] px-2'
        >
          Manage bookings, automate processes, and promote your services
          on-the-go with our user-friendly mobile app
        </Typography>
        <div className='flex items-center justify-center gap-5 md:gap-8 z-0'>
          <Icon
            className='hover:cursor-pointer z-[25]'
            name='appleLogoLanding'
            width={150}
            height={60}
          />
          <Image
            className='w-[170px] h-[75px] hover:cursor-pointer z-[25]'
            src={google.src}
            alt='image'
            width={google.width}
            height={google.height}
          />
        </div>
      </div>
      <div className='relative mt-[104px]'>
        <div className='absolute bg-[#F9F9F9] left-1/2 bottom-0 -translate-x-1/2 w-[750px] h-[750px] rounded-full -z-10' />
        <div className='flex items-end justify-center'>
          <IphoneLayout
            imageUrl={Screenshot.src}
            height={700}
            className='relative left-[150px] top-[50px]'
          />
          <IphoneLayout
            imageUrl={Screenshot2.src}
            height={700}
            className='z-10'
          />
          <IphoneLayout
            imageUrl={Screenshot.src}
            height={700}
            className='relative right-[150px] top-[50px]'
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
