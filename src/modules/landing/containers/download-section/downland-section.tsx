import Image from 'next/image';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';

import net from '@/modules/landing/landing-image/big-net.png';
import iphone from '@/modules/landing/landing-image/iphone13.png';
import google from '@/modules/landing/landing-image/google-play-badge.png';

export const DownloandSection = () => {
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
        className='absolute bottom-0 left-0 w-full h-[170px] z-20'
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 70%)',
        }}
      />
      <div className='flex flex-col gap-5'>
        <Typography
          weight='semibold'
          className='!text-4xl md:!text-5xl text-dark text-center'
        >
          Responsive Detail Medical Record
        </Typography>
        <Typography
          variant='body1'
          className='text-center !text-gray max-w-[820px] px-2'
        >
          An efficient dental appointment is one that is well-organized,
          minimizes waiting times, and ensures effective communication between
          the dental team and the patient.
        </Typography>
        <div className='flex items-center justify-center gap-5 md:gap-8'>
          <Icon
            className='hover:cursor-pointer z-[25]'
            name='appleLogoLanding'
            width={150}
            height={60}
          />
          <Image
            className=' w-[170px] h-[75px] hover:cursor-pointer z-[25]'
            src={google.src}
            alt='image'
            width={google.width}
            height={google.height}
          />
        </div>
      </div>
      <div className=' relative mt-[104px]'>
        <div className=' absolute bg-[#F9F9F9] -top-20 left-[30px] w-[750px] h-[750px] rounded-full -z-10' />
        <Image
          className=' z-10'
          width={800}
          height={700}
          alt='img'
          src={iphone}
        />
      </div>
    </section>
  );
};
